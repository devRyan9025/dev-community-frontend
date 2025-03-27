import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

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
      const res = await axios.post('/api/auth/login', data, {
        withCredentials: true,
      });

      alert(res.data.message || '✅ 로그인 성공!');
      setIsLoggedIn(true);
      setUser(res.data.user || null);
      navigate('/home'); // 로그인 후 홈으로 이동
    } catch (err) {
      alert(err.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>로그인</h2>
      <input
        type='email'
        placeholder='이메일'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>로그인</button>
    </form>
  );
}

export default Login;
