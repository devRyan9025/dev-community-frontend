import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const nav = useNavigate();

  // 로그인 기능
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    try {
      // 1. 로그인 요청
      const res = await axios.post('/auth/login', data);
      const token = res.data.token;

      // 2. rememberMe에 따라 토큰 저장 위치 다르게
      if (rememberMe) {
        localStorage.setItem('token', token); // 브라우저 꺼도 유지
      } else {
        sessionStorage.setItem('token', token); // 브라우저 닫으면 삭제
      }

      // 3. 사용자 정보 요청
      const userRes = await axios.get('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      setUser(userRes.data.user);
      setIsLoggedIn(true);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 폼으로 이동
  const handleLinkToRegister = () => {
    nav('/register');
  };

  return (
    <div className={styles.Login}>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-3 text-3xl font-extrabold text-gray-900'>로그인</h2>
        </div>

        {/* 로그인 폼 */}
        <form
          className='mt-8 space-y-6 bg-white p-8 rounded-xl shadow-md'
          action='#'
          method='POST'>
          <div className='space-y-4'>
            {/* 이메일 입력란 */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                이메일
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            {/* 비밀번호 입력란 */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                비밀번호
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>

            {/* 로그인 상태 유지 체크박스 */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center text-sm'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <span className='ml-2 text-gray-600'>로그인 유지</span>
              </label>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-black hover:text-gray-900'>
                  비밀번호 찾기
                </a>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type='submit'
              onClick={handleLogin}
              className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900'>
              로그인
            </button>
          </div>

          {/* 소셜 로그인 */}
          <div className='mt-6 relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                소셜 계정 로그인
              </span>
            </div>
          </div>

          <div className='mt-6 flex space-x-4'>
            <button
              type='button'
              className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'>
              <img
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                alt='Google'
                className='w-5 h-5 mr-2'
              />
              Google
            </button>
            <button
              type='button'
              className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'>
              <img
                src='https://www.svgrepo.com/show/361182/github-inverted.svg'
                alt='GitHub'
                className='w-5 h-5 mr-2'
              />
              GitHub
            </button>
          </div>
        </form>

        {/* 회원 가입 링크 */}
        <p className='mt-4 text-center text-sm text-gray-600'>
          아직 회원이 아니신가요?{' '}
          <a
            onClick={handleLinkToRegister}
            className='font-medium cursor-pointer text-black hover:text-gray-950 border-b border-gray-950'>
            링크를 눌러 가입을 진행해주세요!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
