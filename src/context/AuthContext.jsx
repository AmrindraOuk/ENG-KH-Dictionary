import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [words, setWords] = useState([]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  const addToFavorites = (word) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.id === word.id)) {
        return [...prev, word];
      }
      return prev;
    });
  };

  const removeFromFavorites = (word) => {
    setFavorites(prev => prev.filter(w => w.id !== word.id));
  };

  const addWord = (newWord) => {
    const wordWithId = {
      ...newWord,
      id: Date.now(), // Generate a unique ID
    };
    setWords(prev => [...prev, wordWithId]);
    return wordWithId;
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      favorites,
      addToFavorites,
      removeFromFavorites,
      words,
      addWord,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}