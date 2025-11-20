import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5009/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/Auth/login`, { email, password });
      
      const { token } = response.data;
      
      setToken(token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return true; // Успіх
    } catch (error) {
      console.error("Помилка логіну:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};