# 🎯 START HERE - Get Your APK

## Step 1: Install Node.js (if not installed)
Download from: **https://nodejs.org/**
- Click "Download LTS"
- Install it
- Restart your computer

## Step 2: Open Terminal/Command Prompt

**Windows:** Press `Win + R`, type `cmd`, press Enter

**Mac:** Press `Cmd + Space`, type `terminal`, press Enter

**Linux:** Press `Ctrl + Alt + T`

## Step 3: Copy-Paste These Commands

```bash
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app
npm install -g eas-cli
npm install
eas login
```

When prompted:
1. **Create Expo account** at https://expo.dev/signup (takes 30 seconds)
2. **Enter your email and password**

## Step 4: Build APK

```bash
eas build --platform android --profile preview
```

**Wait 5-10 minutes.** You'll get an email with download link!

## Step 5: Download & Install

1. **Click the link in email** or go to https://expo.dev
2. **Download the APK file**
3. **Transfer to your Android phone** (USB/Drive/Email)
4. **Tap APK → Install**
5. **Open Paisa Pakad!** 🎉

---

## 🆘 Problems?

### "git: command not found"
Install Git: https://git-scm.com/downloads

### "node: command not found"
Install Node.js: https://nodejs.org/

### "eas: command not found"
Run: `npm install -g eas-cli`

### "Build failed"
Run these commands:
```bash
cd paisa-pakad-app
npm install
eas build:configure
eas build --platform android --profile preview
```

---

## ⚡ Even Simpler: Use the Script

**Mac/Linux:**
```bash
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app
chmod +x BUILD_NOW.sh
./BUILD_NOW.sh
```

**Windows:**
```bash
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app
BUILD_NOW.bat
```

The script does everything automatically!

---

## 📱 What You'll Get

An Android app with:
- ✅ Home screen showing savings potential
- ✅ Bill scanning with camera
- ✅ Bhaiya chat interface
- ✅ Beautiful UI

---

## 🎯 Total Time: 15 Minutes

- 5 min: Install Node.js + setup
- 10 min: Build APK (automated)
- 2 min: Install on phone

**Let's go! 🚀**