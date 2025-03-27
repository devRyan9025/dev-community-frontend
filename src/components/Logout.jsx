import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/auth/logout', null, {
        withCredentials: true,
      });

      alert(res.data.message || '로그아웃 성공!');
      navigate('/login'); // ✅ 로그인 페이지로 리다이렉트
    } catch (err) {
      alert('로그아웃 실패');
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default Logout;
