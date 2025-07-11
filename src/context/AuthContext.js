import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aquí guardamos username, rol, etc.
  const [token, setToken] = useState(null);

  const login = async (loginData) => {
    try {
      const res = await fetch('http://TU_BACKEND_URL/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();

      if (data.jwt) {
        setToken(data.jwt);
        setUser({ username: data.username }); // puedes extender esto si extraes el rol
        await AsyncStorage.setItem('token', data.jwt);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  const loadUser = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = parseJwt(storedToken);
      setUser({ username: decoded.sub }); // puedes extraer roles desde "authorities"
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
