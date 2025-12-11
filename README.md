# Paisa Pakad 💰

**Smart budget tracking app for India with AI-powered bill scanning and Hinglish chat assistant.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 🚀 Get APK in 3 Commands

```bash
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app
./BUILD_NOW.sh    # Mac/Linux
# OR
BUILD_NOW.bat     # Windows
```

**That's it!** Wait 10 minutes, download APK from Expo, install on phone! 📱

---

## ✨ Features

- 📸 **Photo se Add** - Scan any bill/receipt with AI (works with Hindi text)
- 💬 **Bhaiya Chat** - Hinglish AI assistant for budget advice
- 📱 **Auto SMS/UPI Tracking** - Zero manual entry
- 💰 **Smart Savings** - Auto round-up micro-savings
- 🚨 **Crisis Mode** - Emergency financial guidance

---

## 📱 Screenshots

### Home Screen
Big savings number + auto-tracked spending circles

### Bill Scan
Camera + AI OCR (Hindi + English + handwritten)

### Bhaiya Chat
Hinglish conversational AI for budget help

---

## 🛠️ Tech Stack

- **Frontend**: React Native + Expo
- **AI**: Google Gemini Flash 2.0
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Expo EAS Build

---

## 📖 Documentation

- **[FINAL_INSTRUCTIONS.md](FINAL_INSTRUCTIONS.md)** - Complete step-by-step guide
- **[EXPO_BUILD_GUIDE.md](EXPO_BUILD_GUIDE.md)** - Detailed Expo build instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Backend deployment guide
- **[BUILD_APK_NOW.md](BUILD_APK_NOW.md)** - Multiple build options

---

## 🎯 Quick Start Options

### Option 1: One Command (Recommended)
```bash
./BUILD_NOW.sh    # Handles everything automatically
```

### Option 2: Manual Build
```bash
npm install -g eas-cli
npm install
eas login
eas build --platform android --profile preview
```

### Option 3: GitHub Actions
Add secrets → Run workflow → Download APK

---

## 💰 Cost Breakdown

| Service | Monthly Cost | Usage |
|---------|-------------|-------|
| Expo EAS | **FREE** | Unlimited builds |
| Supabase | **FREE** | 500MB database |
| Railway | $5 | Backend hosting |
| Gemini API | ~₹50-200 | Per 1000 users |
| **Total** | **~₹500-700** | **For 1000 users** |

---

## 🔧 Development

### Prerequisites
- Node.js 18+
- Expo account (free)

### Local Development
```bash
npm install
npm start
# Scan QR code with Expo Go app
```

### Build APK
```bash
eas build --platform android --profile preview
```

### Build for Production
```bash
eas build --platform android --profile production
```

---

## 📂 Project Structure

```
paisa-pakad-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Main dashboard
│   │   ├── BillScanScreen.js   # Camera + AI scanning
│   │   └── BhaiyaChatScreen.js # AI chat interface
│   └── services/
│       ├── geminiService.js    # AI integration
│       └── supabaseService.js  # Database operations
├── backend/
│   └── server.js               # Express API
├── database/
│   └── schema.sql              # Supabase schema
├── App.js                      # Main app component
├── app.json                    # Expo configuration
└── eas.json                    # Build configuration
```

---

## 🎨 Features in Detail

### 1. Home Screen
- **Big Savings Number**: "Is mahine mein abhi ₹4,280 bacha sakte ho"
- **Auto-tracked Spending**: Category-wise circles (Food, Travel, etc.)
- **Magic Button**: "Photo se Add" for bill scanning
- **Bhaiya Chat**: Quick access to AI assistant

### 2. Bill Scanning
- **AI OCR**: Gemini Flash 2.0 for text extraction
- **Multi-language**: Hindi, English, handwritten
- **Auto-categorization**: Smart category detection
- **4-second processing**: Fast and accurate

### 3. Bhaiya Chat
- **Hinglish AI**: Natural conversation in mixed language
- **Budget Advice**: Practical, actionable suggestions
- **Voice Input**: Speak in Hindi/English
- **Context-aware**: Understands your spending patterns

---

## 🚀 Deployment

### Backend (Railway)
```bash
cd backend
railway init
railway up
```

### Database (Supabase)
1. Create project at supabase.com
2. Run `database/schema.sql`
3. Copy API keys

### Mobile App (Expo)
```bash
eas build --platform android
```

---

## 🔐 Environment Variables

Create `.env` file:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_key
BACKEND_URL=your_backend_url
```

---

## 🐛 Troubleshooting

### Build fails?
```bash
npm install
eas build:configure
eas build --platform android --profile preview
```

### Can't install APK?
- Enable "Install from Unknown Sources" in Settings
- Download `.apk` file (not `.aab`)

### Need help?
Check [FINAL_INSTRUCTIONS.md](FINAL_INSTRUCTIONS.md) for detailed troubleshooting

---

## 📈 Roadmap

- [x] Basic app structure
- [x] Bill scanning with AI
- [x] Bhaiya chat interface
- [x] Expo build configuration
- [ ] SMS auto-tracking
- [ ] Micro-savings feature
- [ ] Crisis mode alerts
- [ ] iOS version
- [ ] Play Store release

---

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first.

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Author

**Anil Chauhan**
- GitHub: [@anilchauhan88-max](https://github.com/anilchauhan88-max)
- Email: anil.chauhan88@gmail.com

---

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Expo for easy mobile development
- Supabase for backend infrastructure
- React Native community

---

## 📞 Support

**Need help building the APK?**

1. Check [FINAL_INSTRUCTIONS.md](FINAL_INSTRUCTIONS.md)
2. Open an issue on GitHub
3. Email: anil.chauhan88@gmail.com

---

## 🎉 Ready to Build?

```bash
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app
./BUILD_NOW.sh
```

**Get your APK in 10 minutes! 🚀**