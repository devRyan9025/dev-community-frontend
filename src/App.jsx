import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/auth_page/Login';
import Register from './pages/auth_page/Register';
import Home from './pages/home_page/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import './App.css';
import VerifyEmail from './pages/auth_page/VerifyEmail';

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* 누구나 접근 가능 */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* 보호된 페이지
          <Route
            path='/home'
            element={
              <ProtectedRoute isLoggedIn={true}>
                <Home />
              </ProtectedRoute>
            }
          />*/}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
