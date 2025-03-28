import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/auth_page/Login';
import Register from './pages/auth_page/Register';
import Home from './pages/home_page/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          {/* 누구나 접근 가능 */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

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
      </AuthProvider>
    </>
  );
}

export default App;
