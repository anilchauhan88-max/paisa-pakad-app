# 📱 Get Your APK RIGHT NOW - 3 Simple Options

## 🎯 Option 1: GitHub Actions (EASIEST - No Setup Required!)

### Step 1: Add Secrets
Go to: https://github.com/anilchauhan88-max/paisa-pakad-app/settings/secrets/actions

Click "New repository secret" and add these 5 secrets:

1. **SUPABASE_URL** = `https://demo.supabase.co` (use demo for now)
2. **SUPABASE_ANON_KEY** = `demo-key` (use demo for now)
3. **GEMINI_API_KEY** = `demo-key` (use demo for now)
4. **BACKEND_URL** = `https://demo-backend.com` (use demo for now)
5. **KEYSTORE_PASSWORD** = `paisapakad123` (any password you want)

### Step 2: Trigger Build
1. Go to: https://github.com/anilchauhan88-max/paisa-pakad-app/actions
2. Click "Build Android APK" workflow
3. Click "Run workflow" → "Run workflow"

### Step 3: Download APK (Wait 10 minutes)
1. Wait for build to complete (green checkmark)
2. Click on the completed workflow run
3. Scroll down to "Artifacts"
4. Download "paisa-pakad-app.zip"
5. Extract and get `app-release.apk`

**Transfer to your phone and install!**

---

## 🚀 Option 2: Use Expo EAS (FASTEST - 5 Minutes!)

### Prerequisites
```bash
npm install -g eas-cli
```

### Steps
```bash
# Clone repo
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app

# Install dependencies
npm install

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

**Download APK from Expo dashboard in 5-10 minutes!**

---

## 💻 Option 3: Build Locally (If you have Android Studio)

### Prerequisites
- Node.js 18+
- Android Studio
- Java JDK 11+

### Quick Commands
```bash
# Clone
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app

# Install
npm install

# Create .env
echo "SUPABASE_URL=https://demo.supabase.co" > .env
echo "SUPABASE_ANON_KEY=demo-key" >> .env
echo "GEMINI_API_KEY=demo-key" >> .env
echo "BACKEND_URL=https://demo-backend.com" >> .env

# Generate keystore
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore paisa-pakad-release.keystore -alias paisa-pakad -keyalg RSA -keysize 2048 -validity 10000 -storepass paisapakad123 -keypass paisapakad123 -dname "CN=PaisaPakad"

# Configure gradle
cd ..
echo "MYAPP_UPLOAD_STORE_FILE=paisa-pakad-release.keystore" >> gradle.properties
echo "MYAPP_UPLOAD_KEY_ALIAS=paisa-pakad" >> gradle.properties
echo "MYAPP_UPLOAD_STORE_PASSWORD=paisapakad123" >> gradle.properties
echo "MYAPP_UPLOAD_KEY_PASSWORD=paisapakad123" >> gradle.properties

# Build APK
chmod +x gradlew
./gradlew assembleRelease

# Get APK
# Location: android/app/build/outputs/apk/release/app-release.apk
```

---

## 📲 Installing APK on Your Phone

1. **Enable Unknown Sources**
   - Settings → Security → Install unknown apps → Enable for your file manager

2. **Transfer APK**
   - USB cable, Google Drive, or email

3. **Install**
   - Tap APK → Install → Open

---

## ⚡ Which Option Should You Choose?

| Option | Time | Difficulty | Requirements |
|--------|------|------------|--------------|
| **GitHub Actions** | 10 min | ⭐ Easy | GitHub account only |
| **Expo EAS** | 5 min | ⭐⭐ Medium | Expo account + npm |
| **Local Build** | 20 min | ⭐⭐⭐ Hard | Full dev setup |

**Recommendation: Use GitHub Actions (Option 1)** - No setup needed!

---

## 🎯 I Recommend: GitHub Actions

**Why?**
- ✅ No software installation needed
- ✅ Works on any computer (even Chromebook!)
- ✅ Automated and reliable
- ✅ You already have the repo

**Just add the 5 secrets and click "Run workflow"!**

Go here now: https://github.com/anilchauhan88-max/paisa-pakad-app/settings/secrets/actions

---

## 🆘 Need Help?

Tell me which option you want to try and I'll guide you step-by-step!