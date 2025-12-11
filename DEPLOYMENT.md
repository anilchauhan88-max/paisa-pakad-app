# Paisa Pakad - Deployment Guide

## 🚀 Complete Setup in 30 Minutes

### Step 1: Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name: `paisa-pakad`
   - Choose region closest to India (Singapore recommended)

2. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents from `database/schema.sql`
   - Click "Run"

3. **Get API Keys**
   - Go to Settings → API
   - Copy `Project URL` and `anon public` key
   - Save for later

### Step 2: Backend Deployment (Railway)

1. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   
   # Add environment variables
   railway variables set GEMINI_API_KEY=your_key_here
   
   # Deploy
   railway up
   ```

2. **Get Backend URL**
   - Railway will provide a URL like: `https://paisa-pakad-backend.railway.app`
   - Save this URL

### Step 3: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 4: Mobile App Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
   cd paisa-pakad-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   
   # iOS only
   cd ios && pod install && cd ..
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   GEMINI_API_KEY=your-gemini-api-key
   BACKEND_URL=https://your-backend.railway.app
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

5. **Run on iOS**
   ```bash
   npm run ios
   ```

### Step 5: SMS Auto-Tracking Setup (Android)

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />

<receiver android:name=".SMSReceiver" android:exported="true">
  <intent-filter android:priority="999">
    <action android:name="android.provider.Telephony.SMS_RECEIVED" />
  </intent-filter>
</receiver>
```

### Step 6: Camera Permissions

**iOS** - Add to `ios/PaisaPakad/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to scan bills</string>
```

**Android** - Already configured in manifest

## 📱 Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### iOS App Store

```bash
# Open Xcode
open ios/PaisaPakad.xcworkspace

# Select "Any iOS Device"
# Product → Archive
# Follow App Store submission process
```

## 💰 Cost Breakdown

| Service | Monthly Cost | Usage |
|---------|-------------|-------|
| Supabase | Free | Up to 500MB database |
| Railway | $5 | Backend hosting |
| Gemini API | ~₹50-200 | Per 1000 users |
| **Total** | **~₹500-700** | **For 1000 users** |

## 🔧 Troubleshooting

### Camera not working
```bash
# iOS
cd ios && pod install

# Android
./gradlew clean
```

### Backend connection failed
- Check Railway logs: `railway logs`
- Verify BACKEND_URL in `.env`

### Supabase errors
- Check RLS policies are enabled
- Verify API keys are correct

## 📊 Monitoring

### Railway Dashboard
- View logs: `railway logs`
- Check metrics: Railway dashboard

### Supabase Dashboard
- Monitor database usage
- View API requests
- Check authentication

## 🚀 Next Steps

1. **Test all features**
   - Bill scanning
   - Bhaiya chat
   - SMS tracking

2. **Add test users**
   - Create accounts via app
   - Test transactions

3. **Deploy updates**
   ```bash
   git push origin main
   railway up  # Backend
   ```

## 📞 Support

Issues? Open a GitHub issue or contact the team.

---

**Ready to launch! 🎉**