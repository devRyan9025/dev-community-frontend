import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from '../api/axiosConfig';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [imageVersion, setImageVersion] = useState(Date.now());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      // 토큰 없으면 인증 시도 안 함
      setLoading(false);
      return;
    }

    // 토큰이 있으면 로그인 상태 복구 시도
    axios
      .get('/user/me')
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setIsLoggedIn,
        setUser,
        loading,
        imageVersion,
        setImageVersion,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
