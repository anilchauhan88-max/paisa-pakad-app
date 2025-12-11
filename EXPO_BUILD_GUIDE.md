# 🚀 Build APK with Expo - Super Easy!

## Method 1: Using Expo EAS (Cloud Build - EASIEST!)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Clone and Setup
```bash
# Clone the repo
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app

# Install dependencies
npm install
```

### Step 3: Login to Expo
```bash
eas login
```

If you don't have an Expo account:
- Go to https://expo.dev/signup
- Create free account (takes 30 seconds)
- Then run `eas login` again

### Step 4: Configure Project
```bash
eas build:configure
```

Select:
- Platform: **Android**
- Generate new keystore: **Yes**

### Step 5: Build APK
```bash
eas build --platform android --profile preview
```

This will:
1. Upload your code to Expo servers
2. Build the APK in the cloud (5-10 minutes)
3. Give you a download link

### Step 6: Download APK
Once build completes, you'll get a link like:
```
✔ Build finished
https://expo.dev/artifacts/eas/[your-build-id].apk
```

Click the link or go to: https://expo.dev/accounts/[your-username]/projects/paisa-pakad/builds

**Download the APK and install on your phone!**

---

## Method 2: GitHub Actions with Expo (Automated)

I can set up GitHub Actions to build with Expo automatically.

### Step 1: Get Expo Token
```bash
eas login
eas whoami
# Copy your username

# Generate token
eas build:configure
```

### Step 2: Add to GitHub Secrets
Go to: https://github.com/anilchauhan88-max/paisa-pakad-app/settings/secrets/actions

Add secret:
- **Name:** `EXPO_TOKEN`
- **Value:** [your expo token]

### Step 3: Trigger Build
Go to Actions → "Build with Expo" → Run workflow

---

## 📱 Installing APK on Your Phone

### Option A: Direct Download (Easiest)
1. Open the Expo build link on your phone
2. Download APK directly
3. Install (enable "Install from Unknown Sources" if needed)

### Option B: Transfer from Computer
1. Download APK on computer
2. Transfer via USB/Google Drive/Email
3. Install on phone

---

## 🎯 What You Get

The APK will include:
- ✅ Full app UI (Home, Bill Scan, Bhaiya Chat)
- ✅ Camera functionality
- ✅ All screens and navigation
- ⚠️ Backend features need API keys (add later)

---

## 🔧 Troubleshooting

### "eas: command not found"
```bash
npm install -g eas-cli
# Or
npx eas-cli login
```

### "Not logged in"
```bash
eas login
# Enter your Expo credentials
```

### "Build failed"
Check build logs at: https://expo.dev/accounts/[username]/projects/paisa-pakad/builds

---

## ⚡ Quick Commands Summary

```bash
# Install EAS
npm install -g eas-cli

# Clone repo
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app

# Install dependencies
npm install

# Login
eas login

# Configure
eas build:configure

# Build APK
eas build --platform android --profile preview

# Wait 5-10 minutes, then download from link!
```

---

## 💰 Cost

**FREE!** Expo gives you:
- Unlimited builds for personal projects
- Cloud build servers
- APK hosting

---

## 🆘 Need Help?

**Stuck on any step?** Tell me where you're stuck and I'll help!

**Don't want to install anything?** I can also:
1. Use GitHub Codespaces (build in browser)
2. Guide you through web-based Expo build
3. Create a simpler web version first

Which would you prefer?