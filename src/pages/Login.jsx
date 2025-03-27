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
      const res = await axios.post('/api/auth/login', data);
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
