#!/bin/bash

echo "🍳 ChefMate Setup Script"
echo "========================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Python and Node.js found"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend || exit

# Create virtual environment
python3 -m venv venv
echo "✅ Virtual environment created"

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
echo "✅ Backend dependencies installed"

# Check for .env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Created .env file. Please add your OPENROUTER_API_KEY"
    echo "   Get your free API key from: https://openrouter.ai/"
else
    echo "✅ .env file exists"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up frontend..."
cd frontend || exit

# Install dependencies
npm install
echo "✅ Frontend dependencies installed"

# Check for .env.local file
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local file exists"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add your OPENROUTER_API_KEY to backend/.env"
echo "   Get it from: https://openrouter.ai/"
echo ""
echo "2. Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate  # Windows: venv\\Scripts\\activate"
echo "   python main.py"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Happy cooking! 🍳"
