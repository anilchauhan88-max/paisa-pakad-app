# 🚀 Quick Start - Get Your APK in 15 Minutes

## Option 1: Build APK Locally (Recommended)

### Prerequisites
- Node.js 18+ installed
- Android Studio installed
- Java JDK 11+ installed

### Steps:

1. **Clone the Repository**
```bash
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-key
GEMINI_API_KEY=your-gemini-key
BACKEND_URL=https://your-backend-url.com
```

**Don't have these yet? Use demo mode:**
```
SUPABASE_URL=https://demo.supabase.co
SUPABASE_ANON_KEY=demo-key
GEMINI_API_KEY=demo-key
BACKEND_URL=https://demo-backend.com
```

4. **Generate Signing Key**
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore paisa-pakad-release.keystore -alias paisa-pakad -keyalg RSA -keysize 2048 -validity 10000
```

Enter password when prompted (remember it!)

5. **Configure Gradle**

Create `android/gradle.properties` and add:
```
MYAPP_UPLOAD_STORE_FILE=paisa-pakad-release.keystore
MYAPP_UPLOAD_KEY_ALIAS=paisa-pakad
MYAPP_UPLOAD_STORE_PASSWORD=your_password
MYAPP_UPLOAD_KEY_PASSWORD=your_password
```

6. **Build APK**
```bash
cd android
./gradlew assembleRelease
```

7. **Get Your APK**
```bash
# APK location:
android/app/build/outputs/apk/release/app-release.apk
```

**Transfer to your phone and install!**

---

## Option 2: Use GitHub Actions (Automated)

I can set up GitHub Actions to automatically build the APK for you.

### Steps:

1. **Add Secrets to GitHub**
   - Go to: https://github.com/anilchauhan88-max/paisa-pakad-app/settings/secrets/actions
   - Add these secrets:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - `GEMINI_API_KEY`
     - `BACKEND_URL`
     - `KEYSTORE_PASSWORD`

2. **Trigger Build**
   - Go to Actions tab
   - Click "Build Android APK"
   - Click "Run workflow"

3. **Download APK**
   - Wait 5-10 minutes
   - Download from Artifacts

---

## Option 3: Use Expo/EAS Build (Easiest)

Convert to Expo for easiest building:

```bash
npx expo install
npx eas build --platform android
```

Download APK from Expo dashboard.

---

## 🔧 Troubleshooting

### "SDK not found"
```bash
# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### "Permission denied"
```bash
chmod +x android/gradlew
```

---

## 📱 Installing APK on Phone

1. **Enable Unknown Sources**
   - Settings → Security → Unknown Sources → Enable

2. **Transfer APK**
   - USB cable, or
   - Google Drive, or
   - Email to yourself

3. **Install**
   - Tap APK file
   - Click "Install"
   - Open app!

---

## 🎯 What Works Without Backend?

Even without setting up backend/database, you can test:
- ✅ UI and navigation
- ✅ Camera access
- ✅ Basic functionality
- ❌ AI bill scanning (needs Gemini API)
- ❌ Data persistence (needs Supabase)
- ❌ Bhaiya chat (needs backend)

---

## 🚀 Need Help?

**Option A:** I can guide you through each step
**Option B:** Share your screen and I'll help debug
**Option C:** Use a cloud build service (Expo EAS)

Which option works best for you?