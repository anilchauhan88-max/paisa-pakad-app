#!/bin/bash

echo "🚀 Paisa Pakad - One Command APK Builder"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install EAS CLI globally
echo "📦 Installing Expo EAS CLI..."
npm install -g eas-cli

echo ""
echo "✅ EAS CLI installed!"
echo ""

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""

# Login to Expo
echo "🔐 Please login to Expo..."
echo "   (If you don't have an account, create one at https://expo.dev/signup)"
echo ""
eas login

echo ""
echo "✅ Logged in to Expo!"
echo ""

# Configure EAS Build
echo "⚙️  Configuring EAS Build..."
eas build:configure

echo ""
echo "✅ Configuration complete!"
echo ""

# Build APK
echo "🏗️  Building APK..."
echo "   This will take 5-10 minutes..."
echo "   You can close this terminal and check status at: https://expo.dev"
echo ""
eas build --platform android --profile preview

echo ""
echo "🎉 Build started!"
echo "📱 Download your APK from: https://expo.dev"
echo ""
echo "Next steps:"
echo "1. Wait for build to complete (you'll get an email)"
echo "2. Download APK from the link"
echo "3. Transfer to your Android phone"
echo "4. Install and enjoy! 🚀"