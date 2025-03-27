import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 성공!');
    navigate('/login');
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default Logout;
