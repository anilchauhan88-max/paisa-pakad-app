import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Voice from '@react-native-voice/voice';
import { geminiService } from '../services/geminiService';

const BhaiyaChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Namaste! Main Bhaiya hoon. Paisa ke baare mein kuch bhi poocho! 💰',
      sender: 'bhaiya',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    if (e.value && e.value[0]) {
      setInputText(e.value[0]);
    }
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('hi-IN'); // Hindi voice recognition
    } catch (error) {
      console.error('Voice error:', error);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Voice stop error:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Send to Gemini with Hinglish context
      const response = await geminiService.chatWithBhaiya(inputText, messages);
      
      const bhaiyaMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bhaiya',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, bhaiyaMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry bhai, thoda problem ho gaya. Phir se try karo.',
        sender: 'bhaiya',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.bhaiyaBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.timestamp}>
              {msg.timestamp.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        ))}
        
        {isTyping && (
          <View style={[styles.messageBubble, styles.bhaiyaBubble]}>
            <Text style={styles.messageText}>Bhaiya typing... ⌨️</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type ya bol do..."
          placeholderTextColor="#95A5A6"
          multiline
        />
        
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={isListening ? stopListening : startListening}
        >
          <Text style={styles.voiceButtonText}>
            {isListening ? '⏹️' : '🎤'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498DB',
  },
  bhaiyaBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    color: '#95A5A6',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  voiceButton: {
    marginLeft: 8,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonText: {
    fontSize: 24,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#3498DB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BhaiyaChatScreen;