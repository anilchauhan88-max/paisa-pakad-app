import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { geminiService } from '../services/geminiService';
import { supabaseService } from '../services/supabaseService';

const BillScanScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    setHasPermission(permission === 'authorized');
  };

  const takePicture = async () => {
    if (!camera.current) return;
    
    setIsScanning(true);
    try {
      // Capture photo
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'balanced',
      });

      // Send to Gemini for OCR
      const extractedData = await geminiService.scanBill(photo.path);
      
      // Auto-categorize
      const category = detectCategory(extractedData.items);
      
      // Save to database
      await supabaseService.addTransaction({
        amount: extractedData.total,
        category: category,
        items: extractedData.items,
        date: new Date().toISOString(),
        source: 'bill_scan',
        raw_text: extractedData.raw_text
      });

      Alert.alert(
        'Bill Added! ✅',
        `₹${extractedData.total} added to ${category}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Scan error:', error);
      Alert.alert('Error', 'Could not scan bill. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const detectCategory = (items) => {
    // Simple keyword-based categorization
    const itemsText = items.join(' ').toLowerCase();
    
    if (itemsText.includes('food') || itemsText.includes('restaurant') || 
        itemsText.includes('cafe') || itemsText.includes('dal') || 
        itemsText.includes('rice') || itemsText.includes('sabzi')) {
      return 'Food';
    }
    if (itemsText.includes('petrol') || itemsText.includes('diesel') || 
        itemsText.includes('uber') || itemsText.includes('ola')) {
      return 'Travel';
    }
    if (itemsText.includes('recharge') || itemsText.includes('mobile') || 
        itemsText.includes('data')) {
      return 'Recharge';
    }
    if (itemsText.includes('electricity') || itemsText.includes('water') || 
        itemsText.includes('gas')) {
      return 'Bills';
    }
    return 'Shopping';
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission required</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498DB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      
      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>
            📸 Bill ko frame mein rakho
          </Text>
          <Text style={styles.subText}>
            Works with Hindi, English, handwritten bills
          </Text>
        </View>

        <View style={styles.bottomBar}>
          {isScanning ? (
            <View style={styles.scanningContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.scanningText}>Scanning... 🔍</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionBox: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomBar: {
    padding: 30,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498DB',
  },
  scanningContainer: {
    alignItems: 'center',
  },
  scanningText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BillScanScreen;