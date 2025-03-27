import { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../components/Logout';

function HomePage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('/api/', { withCredentials: true }) // ✅ 프록시 경로로 요청
      .then((res) => {
        setMessage(res.data.message);
        setUser(res.data.user);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || '오류 발생');
        setUser(null);
      });
  }, []);

  return (
    <div>
      <h1>홈</h1>
      <p>{message}</p>
      {user && (
        <div>
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </div>
      )}

      <Logout />
    </div>
  );
}

export default HomePage;
