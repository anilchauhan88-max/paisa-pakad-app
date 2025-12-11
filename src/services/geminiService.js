import axios from 'axios';
import { GEMINI_API_KEY, BACKEND_URL } from '@env';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.backendUrl = BACKEND_URL;
  }

  /**
   * Scan bill using Gemini Vision API
   * Supports Hindi, English, and handwritten text
   */
  async scanBill(imagePath) {
    try {
      const response = await axios.post(`${this.backendUrl}/api/scan-bill`, {
        imagePath: imagePath
      });

      return {
        total: response.data.total,
        items: response.data.items,
        raw_text: response.data.raw_text,
        merchant: response.data.merchant,
        date: response.data.date
      };
    } catch (error) {
      console.error('Bill scan error:', error);
      throw new Error('Failed to scan bill');
    }
  }

  /**
   * Chat with Bhaiya - Hinglish AI assistant
   * Provides budget advice in conversational Hinglish
   */
  async chatWithBhaiya(userMessage, conversationHistory) {
    try {
      const response = await axios.post(`${this.backendUrl}/api/chat`, {
        message: userMessage,
        history: conversationHistory.slice(-10) // Last 10 messages for context
      });

      return response.data.reply;
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error('Failed to get response from Bhaiya');
    }
  }

  /**
   * Analyze spending patterns and suggest savings
   */
  async analyzeSpendings(transactions) {
    try {
      const response = await axios.post(`${this.backendUrl}/api/analyze`, {
        transactions: transactions
      });

      return {
        savingsPotential: response.data.savings_potential,
        insights: response.data.insights,
        recommendations: response.data.recommendations
      };
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze spendings');
    }
  }

  /**
   * Parse SMS for transaction details
   */
  async parseSMS(smsText) {
    try {
      const response = await axios.post(`${this.backendUrl}/api/parse-sms`, {
        text: smsText
      });

      return {
        amount: response.data.amount,
        type: response.data.type, // debit/credit
        merchant: response.data.merchant,
        category: response.data.category,
        date: response.data.date
      };
    } catch (error) {
      console.error('SMS parse error:', error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();