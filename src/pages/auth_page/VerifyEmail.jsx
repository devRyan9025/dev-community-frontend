import { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

export default function VerifyEmail() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    console.log(tokenParam);
    setToken(tokenParam);
  }, []);

  const handleVerify = async () => {
    try {
      const res = await axios.post('/auth/verify-email', { token });
      const verifiedEmail = res.data.email;

      // ✅ 인증 성공시 로컬스토리지 저장
      localStorage.setItem('verifiedEmail', verifiedEmail);
      setMessage(
        '인증이 완료되었습니다! 기존 페이지로 가서 남은 단계를 진행해주세요!'
      );
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ 인증에 실패했습니다.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-8'>
      <h1 className='text-2xl font-bold mb-4'>이메일 인증</h1>
      <button
        onClick={handleVerify}
        className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'>
        인증 완료
      </button>
      {message && <p className='mt-4 text-gray-700'>{message}</p>}
    </div>
  );
}
