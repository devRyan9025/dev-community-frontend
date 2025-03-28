import { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';

import Logout from '../../components/Logout';

function Home() {
  // const [user, setUser] = useState(null);
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('/user/me') // ✅ JWT 방식에 맞게 보호된 라우트 호출
  //     .then((res) => {
  //       setMessage('환영합니다!');
  //       setUser(res.data.data); // { id, name, email }
  //     })
  //     .catch((err) => {
  //       setMessage(err.response?.data?.message || '오류 발생');
  //       setUser(null);
  //     });
  // }, []);

  return (
    <div>
      <h1>Welcome to Dev Community 👋</h1>

      {/* <p>{message}</p>
      {user && (
        <div>
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </div>
      )} */}
      <Logout />
    </div>
  );
}

export default Home;
