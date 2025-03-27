import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from '../api/axiosConfig';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('/user/me') // ✅ /api는 baseURL에 이미 포함되어 있음
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
