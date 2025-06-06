
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { validateUserSession } from '@/utils/security';

export const useSecureAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const validateAndSetSession = async (currentSession: Session | null) => {
      if (!isMounted) return;
      
      if (currentSession) {
        const isValid = await validateUserSession();
        if (isMounted) {
          setIsValidSession(isValid);
          if (!isValid) {
            // Invalid session, sign out
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
          } else {
            setSession(currentSession);
            setUser(currentSession.user);
          }
        }
      } else {
        setIsValidSession(false);
        setSession(null);
        setUser(null);
      }
      
      if (isMounted) {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!isMounted) return;
        
        console.log('Auth event:', event);
        
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          await validateAndSetSession(currentSession);
        } else {
          await validateAndSetSession(currentSession);
        }
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      validateAndSetSession(initialSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const secureSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsValidSession(false);
      
      // Clear any sensitive data from localStorage
      localStorage.removeItem('supabase.auth.token');
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Secure sign out error:', error);
    }
  };

  return {
    user,
    session,
    loading,
    isValidSession,
    secureSignOut
  };
};
