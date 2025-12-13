import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Better Auth client API works by making direct fetch calls to the auth server
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface BetterAuthClient {
  headers: HeadersInit;
}

const getBetterAuthUrl = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { siteConfig } = useDocusaurusContext();
  return siteConfig.customFields?.betterAuthUrl as string;
};

const betterAuthHeaders = {
  'Content-Type': 'application/json',
};

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to get current session
  const getCurrentSession = async () => {
    try {
      const baseURL = getBetterAuthUrl();
      const response = await fetch(`${baseURL}/api/auth/session`, {
        method: 'GET',
        credentials: 'include', // Include cookies for session
        headers: betterAuthHeaders,
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.session && data?.user) {
          return { session: data.session, user: data.user };
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  };

  useEffect(() => {
    // Initialize auth state on component mount
    const initAuth = async () => {
      try {
        const sessionData = await getCurrentSession();
        if (sessionData) {
          setUser(sessionData.user);
          setToken(sessionData.session.token);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      initAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const baseURL = getBetterAuthUrl();
      const response = await fetch(`${baseURL}/api/auth/sign-in/credentials`, {
        method: 'POST',
        credentials: 'include', // Include cookies for session
        headers: betterAuthHeaders,
        body: JSON.stringify({
          username, // Better Auth expects email or username
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Login failed');
      }

      // Update user data after successful login
      const sessionData = await getCurrentSession();
      if (sessionData) {
        setUser(sessionData.user);
        setToken(sessionData.session.token);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const baseURL = getBetterAuthUrl();
      const response = await fetch(`${baseURL}/api/auth/sign-up/email`, {
        method: 'POST',
        credentials: 'include', // Include cookies for session
        headers: betterAuthHeaders,
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Registration failed');
      }

      // Update user data after successful registration
      const sessionData = await getCurrentSession();
      if (sessionData) {
        setUser(sessionData.user);
        setToken(sessionData.session.token);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const baseURL = getBetterAuthUrl();
      const response = await fetch(`${baseURL}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
        headers: betterAuthHeaders,
      });

      if (response.ok) {
        setToken(null);
        setUser(null);
      } else {
        console.error('Logout failed');
        // Even if logout fails, clear local state
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    token,
    user,
    login,
    logout,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // During server-side rendering, return a default context
    if (typeof window === 'undefined') {
      return {
        token: null,
        user: null,
        login: async () => { throw new Error('Login not available during SSR'); },
        logout: async () => { /* Do nothing during SSR */ },
        register: async () => { throw new Error('Register not available during SSR'); },
        loading: true,
      };
    } else {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  }
  return context;
};