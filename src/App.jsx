import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* 로그인, 회원가입 관련 */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* 보호된 페이지 */}
          <Route
            path='/home'
            element={
              <ProtectedRoute isLoggedIn={true}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
