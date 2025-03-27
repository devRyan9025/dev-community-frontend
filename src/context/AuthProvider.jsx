import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 앱이 시작될 때 세션 확인
  useEffect(() => {
    axios
      .get('/api/', { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.user);
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
