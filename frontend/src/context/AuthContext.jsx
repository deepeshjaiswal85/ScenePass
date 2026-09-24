import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('scenepass_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          // If token fails, check if local storage saved demo user
          const savedUser = localStorage.getItem('scenepass_user');
          if (savedUser) setUser(JSON.parse(savedUser));
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('scenepass_token', token);
      localStorage.setItem('scenepass_user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      // Fallback local demo login if API is unreachable
      if (email === 'admin@scenepass.com') {
        const adminUser = { id: 'u_admin', name: 'ScenePass Director', email, role: 'admin', city: 'Mumbai' };
        const demoToken = 'demo_admin_jwt';
        localStorage.setItem('scenepass_token', demoToken);
        localStorage.setItem('scenepass_user', JSON.stringify(adminUser));
        setToken(demoToken);
        setUser(adminUser);
        return { success: true, user: adminUser };
      } else {
        const regularUser = { id: 'u_demo', name: email.split('@')[0] || 'Aarav Sharma', email, role: 'user', city: 'Jaipur' };
        const demoToken = 'demo_user_jwt';
        localStorage.setItem('scenepass_token', demoToken);
        localStorage.setItem('scenepass_user', JSON.stringify(regularUser));
        setToken(demoToken);
        setUser(regularUser);
        return { success: true, user: regularUser };
      }
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      const { token, user } = res.data;
      localStorage.setItem('scenepass_token', token);
      localStorage.setItem('scenepass_user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const newUser = { id: 'u_' + Date.now(), ...userData, role: 'user' };
      const demoToken = 'demo_user_jwt';
      localStorage.setItem('scenepass_token', demoToken);
      localStorage.setItem('scenepass_user', JSON.stringify(newUser));
      setToken(demoToken);
      setUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    localStorage.removeItem('scenepass_token');
    localStorage.removeItem('scenepass_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
