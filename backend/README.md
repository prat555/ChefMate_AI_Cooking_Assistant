# ChefMate Backend

FastAPI backend with Pydantic AI agent for intelligent cooking assistance.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY
```

4. Run the server:
```bash
python main.py
```

Server runs on http://localhost:8000

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /chat` - Chat with AI assistant
- `POST /recipe-search` - Find recipes by ingredients
- `POST /substitution` - Get ingredient substitutions

## OpenRouter Setup

1. Sign up at https://openrouter.ai/
2. Get free API key
3. Add to .env file

Free models available:
- meta-llama/llama-3.2-3b-instruct:free
- google/gemini-flash-1.5:free
- microsoft/phi-3-mini-128k-instruct:free
