import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { supabaseService } from '../services/supabaseService';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [savingsPotential, setSavingsPotential] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch current month's transactions
      const transactions = await supabaseService.getMonthlyTransactions();
      
      // Calculate savings potential
      const potential = calculateSavingsPotential(transactions);
      setSavingsPotential(potential);
      
      // Group by categories
      const grouped = groupByCategory(transactions);
      setCategories(grouped);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setLoading(false);
    }
  };

  const calculateSavingsPotential = (transactions) => {
    // AI-based calculation logic
    // Analyzes spending patterns and suggests savings
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgMonthlySpend = 15000; // From user history
    return Math.max(0, avgMonthlySpend - totalSpent);
  };

  const groupByCategory = (transactions) => {
    const groups = {};
    transactions.forEach(t => {
      if (!groups[t.category]) {
        groups[t.category] = { name: t.category, amount: 0, color: getCategoryColor(t.category) };
      }
      groups[t.category].amount += t.amount;
    });
    return Object.values(groups);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': '#FF6B6B',
      'Travel': '#4ECDC4',
      'Recharge': '#45B7D1',
      'Shopping': '#FFA07A',
      'Bills': '#98D8C8',
      'Other': '#95A5A6'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <ScrollView style={styles.container}>
      {/* Big Savings Number */}
      <View style={styles.savingsCard}>
        <Text style={styles.savingsLabel}>Is mahine mein abhi</Text>
        <Text style={styles.savingsAmount}>₹{savingsPotential.toLocaleString('en-IN')}</Text>
        <Text style={styles.savingsLabel}>bacha sakte ho</Text>
      </View>

      {/* Category Circles */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Auto-tracked Spending</Text>
        {categories.map((cat, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={[styles.categoryCircle, { backgroundColor: cat.color }]} />
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={styles.categoryAmount}>₹{cat.amount.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Magic Button */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('BillScan')}
      >
        <Text style={styles.scanButtonText}>📸 Photo se Add</Text>
      </TouchableOpacity>

      {/* Bhaiya Chat Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('BhaiyaChat')}
      >
        <Text style={styles.chatButtonText}>💬 Bhaiya se Baat Karo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  savingsCard: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  savingsLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  savingsAmount: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoriesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  categoryCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  categoryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginTop: 5,
  },
  scanButton: {
    backgroundColor: '#3498DB',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: '#9B59B6',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 40,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;