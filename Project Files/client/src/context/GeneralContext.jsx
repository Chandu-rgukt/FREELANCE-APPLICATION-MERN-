// filepath: c:\Users\chand\FREELANCE-APPLICATION-MERN-\client\src\context\GeneralContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth 
      ? JSON.parse(storedAuth) 
      : { username: '', email: '', usertype: '' };
  });

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:6001', {
      withCredentials: true,
      autoConnect: false,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (auth.email) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth]);

  const login = async (credentials) => {
    try {
      // FIXED: Use the correct backend endpoint
      const response = await axios.post('http://localhost:6001/api/auth/login', credentials);
      const user = response.data.user ?? response.data;
      setAuth({
        username: user.username || '',
        email: user.email || '',
        usertype: user.usertype || '',
      });
      if (socket) socket.connect();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.msg || error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:6001/api/auth/register', userData);
      const user = response.data.user;
      setAuth({
        username: user.username || '',
        email: user.email || '',
        usertype: user.usertype || '',
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    socket?.disconnect();
    setAuth({ username: '', email: '', usertype: '' });
    localStorage.removeItem('auth');
  };

  return (
    <GeneralContext.Provider value={{ auth, setAuth, login, register, logout, socket }}>
      {children}
    </GeneralContext.Provider>
  );
}