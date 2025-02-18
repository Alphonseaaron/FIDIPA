import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
    user: null
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthState({
          isAuthenticated: session.user.email === 'admin@fidipa.org',
          isLoading: false,
          error: null,
          user: session.user
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null,
          user: null
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setAuthState({
          isAuthenticated: session.user.email === 'admin@fidipa.org',
          isLoading: false,
          error: null,
          user: session.user
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null,
          user: null
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return data.user.email === 'admin@fidipa.org';
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Invalid credentials'
      }));
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    ...authState,
    login,
    logout
  };
}