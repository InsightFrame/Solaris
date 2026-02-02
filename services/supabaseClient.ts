import { createClient } from '@supabase/supabase-js';

const PROJECT_ID = 'jckzzfuymebcfcbhetqp';
const PUBLIC_KEY = 'sb_publishable_q43AaEhO0w3Lkt9NTHO2Sw_GIR9Zqwg';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, PUBLIC_KEY, {
  auth: {
    persistSession: true, // Keep the user logged in
    autoRefreshToken: true,
  }
});

// Helper to check if connection works (optional usage)
export const checkConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    return !error;
  } catch (e) {
    return false;
  }
};