@echo off
echo 🚀 Paisa Pakad - One Command APK Builder
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo 📥 Install from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

echo ✅ npm found
npm --version
echo.

REM Install EAS CLI globally
echo 📦 Installing Expo EAS CLI...
call npm install -g eas-cli

echo.
echo ✅ EAS CLI installed!
echo.

REM Install project dependencies
echo 📦 Installing project dependencies...
call npm install

echo.
echo ✅ Dependencies installed!
echo.

REM Login to Expo
echo 🔐 Please login to Expo...
echo    (If you don't have an account, create one at https://expo.dev/signup)
echo.
call eas login

echo.
echo ✅ Logged in to Expo!
echo.

REM Configure EAS Build
echo ⚙️  Configuring EAS Build...
call eas build:configure

echo.
echo ✅ Configuration complete!
echo.

REM Build APK
echo 🏗️  Building APK...
echo    This will take 5-10 minutes...
echo    You can close this window and check status at: https://expo.dev
echo.
call eas build --platform android --profile preview

echo.
echo 🎉 Build started!
echo 📱 Download your APK from: https://expo.dev
echo.
echo Next steps:
echo 1. Wait for build to complete (you'll get an email)
echo 2. Download APK from the link
echo 3. Transfer to your Android phone
echo 4. Install and enjoy! 🚀
echo.
pause