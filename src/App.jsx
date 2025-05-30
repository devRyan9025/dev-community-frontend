import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

import Login from './pages/auth_page/Login';
import Register from './pages/auth_page/Register';
import VerifyEmail from './pages/auth_page/VerifyEmail';

import Home from './pages/home_page/Home';

import MyPage from './pages/mypage/MyPage';
import VerifyPassword from './pages/mypage/VerifyPassword';
import EditUserInfo from './pages/mypage/EditUserInfo';

import BoardList from './pages/board_page/BoardList';
import BoardRegister from './pages/board_page/BoardRegister';
import BoardDetail from './pages/board_page/BoardDetail';
import BoardEdit from './pages/board_page/BoardEdit';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import './App.css';

function App() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  // 로그인 상태 확인 중이면 "로딩 중..." 표시
  if (loading) return <p className='text-center mt-10'>로딩 중...</p>;
  return (
    <>
      <Header />

      <Routes>
        {/* 누구나 접근 가능 */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/board' element={<BoardList />} />
        <Route path='/board/:id' element={<BoardDetail />} />

        {/*  ---------- 로그인 해야 접근 가능 ------------ */}

        {/* 마이 페이지 */}
        <Route
          path='/mypage'
          element={
            <ProtectedRoute isLoggedIn={true}>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route path='/mypage/verify-password' element={<VerifyPassword />} />
        <Route path='/mypage/edit' element={<EditUserInfo />} />

        {/* 게시글 페이지 */}
        <Route
          path='/board/register'
          element={
            <ProtectedRoute isLoggedIn={true}>
              <BoardRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path='/board/:id/edit'
          element={
            <ProtectedRoute isLoggedIn={true}>
              <BoardEdit />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
