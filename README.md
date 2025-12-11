# Paisa Pakad 💰

Smart budget tracking app for India with AI-powered bill scanning and Hinglish chat assistant.

## Features

- 📸 **Photo se Add** - Scan any bill/receipt with AI (works with Hindi text)
- 💬 **Bhaiya Chat** - Hinglish AI assistant for budget advice
- 📱 **Auto SMS/UPI Tracking** - Zero manual entry
- 💰 **Smart Savings** - Auto round-up micro-savings
- 🚨 **Crisis Mode** - Emergency financial guidance

## Tech Stack

- **Frontend**: React Native (iOS + Android)
- **AI**: Google Gemini Flash 2.0 for OCR + Chat
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Railway

## Setup Instructions

### Prerequisites
- Node.js 18+
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Clone the repo
git clone https://github.com/anilchauhan88-max/paisa-pakad-app.git
cd paisa-pakad-app

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Environment Variables

Create `.env` file:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_key
BACKEND_URL=your_backend_url
```

## Project Structure

```
paisa-pakad-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Main dashboard
│   │   ├── BillScanScreen.js   # Camera + AI scanning
│   │   └── BhaiyaChatScreen.js # AI chat interface
│   ├── components/
│   │   ├── SpendingCircle.js   # Category visualization
│   │   └── TransactionCard.js  # Transaction display
│   ├── services/
│   │   ├── geminiService.js    # AI integration
│   │   ├── smsService.js       # SMS parsing
│   │   └── supabaseService.js  # Database operations
│   └── utils/
│       ├── categoryDetector.js # Auto-categorization
│       └── hinglishParser.js   # Language processing
├── backend/
│   ├── server.js
│   └── routes/
└── android/ & ios/             # Native configs
```

## Development Roadmap

- [x] Project setup
- [ ] Home screen with spending visualization
- [ ] Bill scanning with Gemini OCR
- [ ] Bhaiya chat interface
- [ ] SMS/UPI auto-tracking
- [ ] Micro-savings feature
- [ ] Crisis mode alerts

## Contributing

Pull requests welcome! For major changes, please open an issue first.

## License

MIT