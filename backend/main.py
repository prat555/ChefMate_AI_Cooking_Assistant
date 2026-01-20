from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from agent import ChefMateAgent

load_dotenv()

app = FastAPI(title="ChefMate API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agent
chef_agent = ChefMateAgent()


class ChatMessage(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []


class RecipeSearchRequest(BaseModel):
    ingredients: List[str]
    dietary_restrictions: Optional[List[str]] = []


class SubstitutionRequest(BaseModel):
    ingredient: str
    context: Optional[str] = None


@app.get("/")
async def root():
    return {
        "message": "Welcome to ChefMate API",
        "version": "1.0.0",
        "endpoints": ["/chat", "/recipe-search", "/substitution", "/health"]
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "agent_ready": True}


@app.post("/chat")
async def chat(request: ChatMessage):
    """Chat with the AI cooking assistant"""
    try:
        response = await chef_agent.chat(request.message, request.conversation_history)
        return {"response": response, "success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/recipe-search")
async def recipe_search(request: RecipeSearchRequest):
    """Search for recipes based on ingredients"""
    try:
        recipes = await chef_agent.find_recipes(
            request.ingredients,
            request.dietary_restrictions
        )
        return {"recipes": recipes, "success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/substitution")
async def ingredient_substitution(request: SubstitutionRequest):
    """Get ingredient substitution suggestions"""
    try:
        substitutions = await chef_agent.suggest_substitutions(
            request.ingredient,
            request.context
        )
        return {"substitutions": substitutions, "success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
