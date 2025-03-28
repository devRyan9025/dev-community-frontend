import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 새로고침 방지

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    try {
      const res = await axios.post('/auth/login', data);
      alert(res.data.message || '✅ 로그인 성공!');

      localStorage.setItem('token', res.data.token); // ✅ 토큰 저장

      // 사용자 정보 가져오기 (또는 JWT 디코딩해서 setUser 처리 가능)
      setIsLoggedIn(true);
      setUser(null); // 사용자 정보가 필요하다면 /api/user/me 요청 구현 필요

      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <>
      <div className={styles.Login}>
        <form onSubmit={handleLogin}>
          <div className={styles.input_container}>
            <input
              className={styles.input}
              type='email'
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.button}>
            <button type='submit'>로그인</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
