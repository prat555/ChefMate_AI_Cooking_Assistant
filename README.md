# 🍳 ChefMate - AI Cooking Assistant

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688)](https://fastapi.tiangolo.com/)
[![Pydantic AI](https://img.shields.io/badge/Pydantic_AI-0.0.14-e92063)](https://ai.pydantic.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Your personal AI-powered cooking assistant built with Pydantic AI. Get intelligent recipe suggestions, ingredient substitutions, and cooking guidance - all powered by free AI models from OpenRouter.

## ✨ Features

- 🤖 **AI Chat Assistant**: Ask cooking questions and get instant expert advice
- 🔍 **Smart Recipe Search**: Find recipes based on ingredients you have
- 🔄 **Ingredient Substitutions**: Get smart alternatives for missing ingredients
- 🎨 **Beautiful UI**: Modern, responsive design with smooth interactions
- ⚡ **Fast & Reliable**: Built with FastAPI and Next.js for optimal performance
- 🆓 **Free to Use**: Powered by free AI models from OpenRouter

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic AI** - AI agent orchestration
- **OpenRouter** - Free AI model access
- **Python 3.9+** - Backend runtime

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai/))

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/chefmate.git
cd chefmate
```

### 2. Setup Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY

# Run the server
python main.py
```

Backend will run on `http://localhost:8000`

### 3. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL=http://localhost:8000

# Run development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📖 Usage

### AI Chat
1. Click on "AI Chat" tab
2. Ask questions like:
   - "How do I make pasta carbonara?"
   - "What's the best way to cook chicken breast?"
   - "How can I make my cookies softer?"

### Recipe Search
1. Go to "Recipe Search" tab
2. Add ingredients you have available
3. Optionally add dietary restrictions
4. Click "Find Recipes" to get personalized suggestions

### Ingredient Substitutions
1. Select "Substitutions" tab
2. Enter the ingredient you need to replace
3. Optionally provide recipe context
4. Get smart alternatives with usage tips

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel (Recommended)
- Railway
- Render
- Other platforms

### Quick Deploy to Vercel
1. Push your code to GitHub
2. Import repository to Vercel
3. Configure environment variables
4. Deploy!

## 🔑 Environment Variables

### Backend (.env)
```env
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.2-3b-instruct:free
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check |
| `/chat` | POST | Chat with AI assistant |
| `/recipe-search` | POST | Search recipes by ingredients |
| `/substitution` | POST | Get ingredient substitutions |

## 🧪 Testing

### Test Backend
```bash
cd backend
# Backend should be running
curl http://localhost:8000/health
```

### Test Frontend
Navigate to `http://localhost:3000` and test all three features.

## 📱 Screenshots

### AI Chat Interface
Clean chat interface for natural conversations with your AI cooking assistant.

### Recipe Search
Find perfect recipes based on what you have in your kitchen.

### Ingredient Substitutions
Smart alternatives when you're missing ingredients.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Project Structure

```
chefmate/
├── backend/              # FastAPI backend
│   ├── main.py          # API server
│   ├── agent.py         # Pydantic AI agent
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Environment template
├── frontend/            # Next.js frontend
│   ├── src/
│   │   ├── app/        # App router pages
│   │   └── components/ # React components
│   ├── package.json    # Node dependencies
│   └── .env.local.example
├── .github/            # GitHub configurations
├── DEPLOYMENT.md       # Deployment guide
└── README.md          # This file
```

## 🐛 Known Issues

- None currently! Report issues on GitHub.

## 🔮 Future Features

- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Recipe favorites and collections
- [ ] Voice commands for cooking timers
- [ ] Nutritional information
- [ ] Step-by-step cooking mode
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Pydantic AI](https://ai.pydantic.dev/)
- AI models from [OpenRouter](https://openrouter.ai/)
- UI components inspired by modern design principles
- Icons from [Lucide](https://lucide.dev/)

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built for SRM Assignment** | January 2026 | Made with ❤️ and 🍳
