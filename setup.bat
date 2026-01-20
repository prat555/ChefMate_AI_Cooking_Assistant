@echo off
echo 🍳 ChefMate Setup Script
echo ========================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.9 or higher.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo ✅ Python and Node.js found
echo.

REM Setup Backend
echo 📦 Setting up backend...
cd backend

REM Create virtual environment
python -m venv venv
echo ✅ Virtual environment created

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
pip install -r requirements.txt
echo ✅ Backend dependencies installed

REM Check for .env file
if not exist .env (
    copy .env.example .env
    echo ⚠️  Created .env file. Please add your OPENROUTER_API_KEY
    echo    Get your free API key from: https://openrouter.ai/
) else (
    echo ✅ .env file exists
)

cd ..

REM Setup Frontend
echo.
echo 📦 Setting up frontend...
cd frontend

REM Install dependencies
call npm install
echo ✅ Frontend dependencies installed

REM Check for .env.local file
if not exist .env.local (
    copy .env.local.example .env.local
    echo ✅ Created .env.local file
) else (
    echo ✅ .env.local file exists
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Add your OPENROUTER_API_KEY to backend\.env
echo    Get it from: https://openrouter.ai/
echo.
echo 2. Start the backend:
echo    cd backend
echo    venv\Scripts\activate
echo    python main.py
echo.
echo 3. In a new terminal, start the frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo Happy cooking! 🍳
pause
