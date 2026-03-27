import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'cooperatify_user';

function loadUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage full or unavailable
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  // Mock Google Sign-In (replace with real OAuth when Client ID is available)
  const signIn = useCallback(async () => {
    setLoading(true);
    // Simulate a brief delay
    await new Promise((r) => setTimeout(r, 800));

    const mockUser = {
      name: 'Professional User',
      email: 'user@example.com',
      picture: null,
      id: 'mock-uid-' + Date.now(),
    };

    setUser(mockUser);
    saveUser(mockUser);
    setLoading(false);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    saveUser(null);
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
