import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwgpcetfqdeklarigydr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Z3BjZXRmcWRla2xhcmlneWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyODAyMDEsImV4cCI6MjA0OTg1NjIwMX0.MaA2XzaBL1w_nbKNYMTyVHJmsiVfZ9c3bPrRJtpuoFs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
export const getSession = async () => {
  const response = await supabase.auth.getSession();
  if (response.error) {
    console.error('Error getting session:', response.error.message);
    return null;
  }
  return response?.data?.session || null;
};
