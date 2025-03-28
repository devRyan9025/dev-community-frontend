import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // 새로고침 방지

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);

    try {
      const res = await axios.post('/api/auth/register', data, {
        withCredentials: true,
      });

      if (res.data.result === 'success') {
        alert('회원가입 성공!');
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동
      } else {
        alert(res.data.message || '회원가입 실패');
      }
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>회원가입</h2>
      <input
        type='text'
        placeholder='이름'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button type='submit'>회원가입</button>
    </form>
  );
}

export default Register;
