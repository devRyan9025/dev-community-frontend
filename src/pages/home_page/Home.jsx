import { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';

import styles from './Home.module.css';

function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) return;
    axios
      .get('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user); // { id, name, email }
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || '오류 발생');
        setUser(null);
      });
  }, []);

  return (
    <div className={styles.Home}>
      <img
        src='/images/webros.jpg'
        alt='메인 이미지'
        className={styles.mainImage}
      />
      <h1>개발자 커뮤니티에 오신걸 환영합니다 🙌</h1>

      {user && (
        <div className={styles.userInfo}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
