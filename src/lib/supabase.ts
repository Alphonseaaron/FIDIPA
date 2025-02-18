import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { nanoid } from 'nanoid';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Initialize Supabase connection
const initializeSupabase = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('Supabase initialized successfully');
    return data.session;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    throw error;
  }
};

// Initialize on import
initializeSupabase().catch(console.error);

// Storage functions
export async function uploadFile(file: File, folder: string = 'uploads'): Promise<{ url: string; path: string }> {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${nanoid()}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl: url } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    
    return {
      url,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from('media')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Authentication functions
export async function signIn() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@fidipa.org',
      password: 'fidipa2025!'
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Auto-login on initialization if not authenticated
export async function autoLogin() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      await signIn();
    }
  } catch (error) {
    console.error('Auto-login failed:', error);
  }
}

// Initialize auto-login
autoLogin();