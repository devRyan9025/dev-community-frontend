import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    alert('로그인이 필요합니다.');
    return <Navigate to='/login' replace />;
  }

  return children;
}

export default ProtectedRoute;
