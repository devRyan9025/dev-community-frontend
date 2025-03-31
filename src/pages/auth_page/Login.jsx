import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const data = { email, password };

    try {
      // 1. 로그인 요청
      const res = await axios.post('/auth/login', data);
      const token = res.data.token;

      // 2. 토큰 저장
      localStorage.setItem('token', token);
      setIsLoggedIn(true);

      // 3. 사용자 정보 요청
      const userRes = await axios.get('/user/me');
      setUser(userRes.data.data);

      alert(res.data.message || '✅ 로그인 성공!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <form onSubmit={handleLogin}>
          <div className={styles.input_bundle}>
            <input
              className={styles.input}
              type='email'
              placeholder='이메일'
              aria-label='이메일'
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
            <button type='submit' disabled={loading}>
              {loading ? '로딩 중...' : '로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
