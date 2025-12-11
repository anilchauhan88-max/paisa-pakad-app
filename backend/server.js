const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

/**
 * Bill Scanning Endpoint
 * Uses Gemini Vision to extract text from bill images
 */
app.post('/api/scan-bill', async (req, res) => {
  try {
    const { imagePath } = req.body;
    
    // Read image file
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Use Gemini Flash 2.0 for OCR
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `
      You are an expert at reading Indian bills and receipts.
      Extract the following information from this bill image:
      1. Total amount (in ₹)
      2. List of items purchased
      3. Merchant/shop name
      4. Date of purchase
      
      The bill may be in Hindi, English, or mixed. It may be handwritten or printed.
      Return the data in JSON format:
      {
        "total": number,
        "items": ["item1", "item2"],
        "merchant": "shop name",
        "date": "YYYY-MM-DD",
        "raw_text": "full extracted text"
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      }
    ]);

    const response = result.response.text();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const extractedData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!extractedData) {
      throw new Error('Could not extract data from bill');
    }

    res.json(extractedData);
  } catch (error) {
    console.error('Bill scan error:', error);
    res.status(500).json({ error: 'Failed to scan bill' });
  }
});

/**
 * Bhaiya Chat Endpoint
 * Hinglish conversational AI for budget advice
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Build conversation context
    const conversationContext = history
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Bhaiya'}: ${msg.text}`)
      .join('\n');

    const systemPrompt = `
      You are "Bhaiya" - a friendly, street-smart financial advisor for middle-class Indians.
      
      Personality:
      - Speak in natural Hinglish (mix of Hindi and English)
      - Use casual, friendly tone like talking to a younger brother
      - Give practical, actionable advice
      - Use Indian context (EMI, UPI, kirana, etc.)
      - Keep responses short (2-3 lines max)
      - Use emojis occasionally
      
      Examples:
      User: "Bhaiya bike ka EMI miss ho gaya"
      Bhaiya: "Arre tension mat le! Pehle bank ko call kar aur situation explain kar. Usually 3-5 din ka grace period milta hai. Aur next month ke liye ₹500 extra rakh side mein. 💪"
      
      User: "Diwali shopping mein kitna safe hai?"
      Bhaiya: "Dekh bhai, is mahine ₹4,280 bacha sakte ho. Diwali ke liye ₹3,000 safe hai. Baaki ₹1,280 emergency ke liye rakh. Gifts pe zyada mat udaa! 🪔"
      
      Context from previous messages:
      ${conversationContext}
      
      User's new message: ${message}
      
      Respond as Bhaiya:
    `;

    const result = await model.generateContent(systemPrompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

/**
 * SMS Parsing Endpoint
 * Extract transaction details from bank SMS
 */
app.post('/api/parse-sms', async (req, res) => {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
      Extract transaction details from this Indian bank SMS:
      "${text}"
      
      Return JSON:
      {
        "amount": number,
        "type": "debit" or "credit",
        "merchant": "merchant name",
        "category": "Food/Travel/Recharge/Bills/Shopping/Other",
        "date": "YYYY-MM-DD"
      }
      
      If not a transaction SMS, return null.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const parsedData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    res.json(parsedData);
  } catch (error) {
    console.error('SMS parse error:', error);
    res.json(null);
  }
});

/**
 * Spending Analysis Endpoint
 * AI-powered insights and recommendations
 */
app.post('/api/analyze', async (req, res) => {
  try {
    const { transactions } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const transactionSummary = transactions
      .map(t => `${t.category}: ₹${t.amount}`)
      .join('\n');

    const prompt = `
      Analyze these monthly transactions for an Indian user:
      ${transactionSummary}
      
      Provide:
      1. Savings potential (realistic amount they can save)
      2. Top 3 insights (where they're overspending)
      3. Actionable recommendations in Hinglish
      
      Return JSON:
      {
        "savings_potential": number,
        "insights": ["insight1", "insight2", "insight3"],
        "recommendations": ["rec1", "rec2", "rec3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Paisa Pakad backend running on port ${PORT}`);
});