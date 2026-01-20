from pydantic_ai import Agent
from typing import List, Optional
import os


class ChefMateAgent:
    def __init__(self):
        api_key = os.getenv("OPENROUTER_API_KEY")
        model_name = os.getenv("OPENROUTER_MODEL", "xiaomi/mimo-v2-flash:free")
        
        # Use OpenRouter model string directly
        model_str = f"openai:{model_name}"
        
        # Set environment variables for OpenAI configuration
        os.environ["OPENAI_API_KEY"] = api_key
        os.environ["OPENAI_BASE_URL"] = "https://openrouter.ai/api/v1"
        
        self.agent = Agent(
            model_str,
            system_prompt="""You are ChefMate, an expert AI cooking assistant. You help users with:
            
            1. Recipe suggestions based on available ingredients
            2. Ingredient substitutions for dietary restrictions or availability
            3. Cooking techniques and tips
            4. Meal planning and preparation advice
            5. Food pairing and flavor combinations
            6. Nutritional information and healthy alternatives
            
            Always be helpful, friendly, and provide practical cooking advice.
            When suggesting recipes, include:
            - Ingredients with quantities
            - Step-by-step instructions
            - Cooking time and difficulty level
            - Tips for best results
            
            For substitutions, explain why the substitute works and any adjustments needed.
            Be creative but practical in your suggestions."""
        )
    
    async def chat(self, message: str, conversation_history: List[dict] = None) -> str:
        """Handle general chat with the cooking assistant"""
        try:
            result = await self.agent.run(message)
            # Access the result content based on the response structure
            if hasattr(result, 'data'):
                return result.data
            elif hasattr(result, 'output'):
                return result.output
            else:
                return str(result)
        except Exception as e:
            return f"I encountered an error: {str(e)}. Please try again."
    
    async def find_recipes(self, ingredients: List[str], dietary_restrictions: List[str] = None) -> str:
        """Find recipes based on available ingredients"""
        restrictions_text = ""
        if dietary_restrictions:
            restrictions_text = f" with {', '.join(dietary_restrictions)} restrictions"
        
        prompt = f"""I have these ingredients: {', '.join(ingredients)}.
        
        Please suggest 3 delicious recipes I can make{restrictions_text}.
        For each recipe, provide:
        1. Recipe name
        2. Full ingredient list with quantities
        3. Step-by-step instructions
        4. Estimated cooking time
        5. Difficulty level (Easy/Medium/Hard)
        
        Format the response clearly with recipe names as headers."""
        
        try:
            result = await self.agent.run(prompt)
            # Access the result content based on the response structure
            if hasattr(result, 'data'):
                return result.data
            elif hasattr(result, 'output'):
                return result.output
            else:
                return str(result)
        except Exception as e:
            return f"Error finding recipes: {str(e)}"
    
    async def suggest_substitutions(self, ingredient: str, context: Optional[str] = None) -> str:
        """Suggest ingredient substitutions"""
        context_text = f" in {context}" if context else ""
        
        prompt = f"""What are good substitutes for {ingredient}{context_text}?
        
        Please provide:
        1. At least 3 suitable substitutes
        2. The substitution ratio (e.g., 1:1, 1:2)
        3. How each substitute affects the flavor/texture
        4. Any recipe adjustments needed
        5. Which substitute is best for different scenarios
        
        Consider dietary restrictions and common availability."""
        
        try:
            result = await self.agent.run(prompt)
            # Access the result content based on the response structure
            if hasattr(result, 'data'):
                return result.data
            elif hasattr(result, 'output'):
                return result.output
            else:
                return str(result)
        except Exception as e:
            return f"Error getting substitutions: {str(e)}"
