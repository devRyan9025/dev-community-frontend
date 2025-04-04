import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

export default function VerifyPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('/auth/verify-password', { password });
      if (res.data.result === 'success') {
        navigate('/mypage/edit'); // 인증 성공 시 수정 페이지로 이동
      } else {
        setError(res.data.message || '비밀번호 확인 실패');
      }
    } catch (err) {
      setError(err.response?.data?.message || '인증 실패');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-6 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-6'>비밀번호 확인</h2>
      <form onSubmit={handleVerify} className='space-y-4'>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력하세요'
          className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring'
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button
          type='submit'
          className='w-full bg-black text-white py-2 rounded hover:bg-gray-800'>
          확인
        </button>
      </form>
    </div>
  );
}
