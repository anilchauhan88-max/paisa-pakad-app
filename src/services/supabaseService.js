import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

class SupabaseService {
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  /**
   * Add a new transaction
   */
  async addTransaction(transaction) {
    const { data, error } = await this.supabase
      .from('transactions')
      .insert([{
        user_id: await this.getUserId(),
        amount: transaction.amount,
        category: transaction.category,
        items: transaction.items,
        date: transaction.date,
        source: transaction.source,
        raw_text: transaction.raw_text,
        merchant: transaction.merchant
      }])
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Get current month's transactions
   */
  async getMonthlyTransactions() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('user_id', await this.getUserId())
      .gte('date', startOfMonth.toISOString())
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get transactions by category
   */
  async getTransactionsByCategory(category, limit = 50) {
    const { data, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('user_id', await this.getUserId())
      .eq('category', category)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get user's savings data
   */
  async getSavings() {
    const { data, error } = await this.supabase
      .from('savings')
      .select('*')
      .eq('user_id', await this.getUserId())
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || { total: 0, monthly_goal: 5000 };
  }

  /**
   * Update savings
   */
  async updateSavings(amount) {
    const userId = await this.getUserId();
    const currentSavings = await this.getSavings();

    const { data, error } = await this.supabase
      .from('savings')
      .upsert({
        user_id: userId,
        total: currentSavings.total + amount,
        last_updated: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Get user ID (from auth session)
   */
  async getUserId() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user?.id || 'demo-user'; // Fallback for testing
  }

  /**
   * Sign up new user
   */
  async signUp(email, password) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign in user
   */
  async signIn(email, password) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign out user
   */
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}

export const supabaseService = new SupabaseService();