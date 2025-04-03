import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from '../api/axiosConfig';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) return;

    axios
      .get('/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.user);
      })
      .catch(() => {
        // 만료되거나 잘못된 토큰인 경우
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
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
