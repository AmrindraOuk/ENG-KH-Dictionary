import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Mock data storage
const mockStorage = {
  users: [],
  words: [],
};

// Initialize test account
const TEST_ACCOUNT = {
  id: "test-user",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  password: "password123",
  status: "active",
  profilePicture: null,
  createdAt: new Date().toISOString(),
};

// Add test account to mock storage
mockStorage.users.push(TEST_ACCOUNT);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [words, setWords] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    email: "admin@example.com",
    password: "admin123",
  };

  const login = (userData, asAdmin = false) => {
    const userToLogin = mockStorage.users.find((u) => u.id === userData.id);
    if (userToLogin && userToLogin.status === "suspended") {
      throw new Error(
        "Your account has been suspended due to a violation of our rules. Please contact the administrator."
      );
    }
    if (asAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setIsAdmin(false);
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      profilePicture: null,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    mockStorage.users.push(newUser);
    return newUser;
  };

  const authenticateUser = (email, password) => {
    // Check admin credentials first
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      return {
        isAdmin: true,
        user: { firstName: "Admin", email, id: "admin" },
      };
    }

    // Check regular user credentials
    const user = mockStorage.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      if (user.status === "suspended") {
        throw new Error(
          "Your account has been suspended due to a violation of our rules. Please contact the administrator."
        );
      }
      return { isAdmin: false, user };
    }

    return null;
  };

  const addToFavorites = (word) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === word.id)) {
        return [...prev, word];
      }
      return prev;
    });
  };

  const removeFromFavorites = (word) => {
    setFavorites((prev) => prev.filter((w) => w.id !== word.id));
  };

  const addWord = (newWord) => {
    const wordWithId = {
      ...newWord,
      id: Date.now().toString(),
      createdBy: user?.id || "anonymous",
      createdAt: new Date().toISOString(),
    };
    setWords((prev) => [...prev, wordWithId]);
    return wordWithId;
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  // Admin functions
  const getAllUsers = () => mockStorage.users;

  const deleteUser = (userId) => {
    mockStorage.users = mockStorage.users.filter((u) => u.id !== userId);
  };

  const suspendUser = (userId) => {
    mockStorage.users = mockStorage.users.map((u) =>
      u.id === userId ? { ...u, status: "suspended" } : u
    );
  };

  const deleteWord = (wordId) => {
    setWords((prev) => prev.filter((w) => w.id !== wordId));
  };

  const updateWord = (wordId, updatedWord) => {
    setWords((prev) =>
      prev.map((w) => (w.id === wordId ? { ...w, ...updatedWord } : w))
    );
  };

  const startEditingWord = (word) => {
    setEditingWord(word);
  };

  const stopEditingWord = () => {
    setEditingWord(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        logout,
        register,
        authenticateUser,
        favorites,
        addToFavorites,
        removeFromFavorites,
        words,
        addWord,
        updateProfile,
        // Admin functions
        getAllUsers,
        deleteUser,
        suspendUser,
        deleteWord,
        updateWord,
        editingWord,
        startEditingWord,
        stopEditingWord,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
