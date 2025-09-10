import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authenticateUser } from '@/data/seedAccounts';

interface AuthContextType {
  user: User | null;
  login: (credentials: {
    email?: string;
    aadhaar?: string;
    mobile?: string;
    password: string;
    role: 'admin' | 'flw';
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('bharat-livestock-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('bharat-livestock-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: {
    email?: string;
    aadhaar?: string;
    mobile?: string;
    password: string;
    role: 'admin' | 'flw';
  }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const authenticatedUser = authenticateUser(credentials);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        localStorage.setItem('bharat-livestock-user', JSON.stringify(authenticatedUser));
        
        const roleText = authenticatedUser.role === 'admin' ? 'Administrator' : 'Field Level Worker';
        return {
          success: true,
          message: `Welcome back, ${roleText}!`
        };
      } else {
        return {
          success: false,
          message: 'Invalid credentials. Please check your email/Aadhaar/Mobile and password.'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bharat-livestock-user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
