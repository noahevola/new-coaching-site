import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FormSubmission = {
  id?: string;
  first_name: string;
  last_name: string;
  trading_experience: string;
  has_strategy: string;
  strategy_learning: string;
  psychology_fix: string;
  fair_price: string;
  email: string;
  country_code: string;
  phone: string;
  optin: boolean;        // ⬅️ NEW
  created_at?: string;
};
