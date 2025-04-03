// src/pages/mypage/MyPage.jsx
import { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
//import ProfileImageUploader from './ProfileImageUploader'; // ✅ 이후 구현

function MyPage() {
  const [user, setUser] = useState(null);

  // 현재 로그인된 사용자 정보 불러오기
  useEffect(() => {
    axios
      .get('/user/me')
      .then((res) => setUser(res.data.user)) // ⚠️ 백엔드 응답 구조에 따라 key 확인
      .catch((err) => console.error('유저 정보 조회 실패:', err));
  }, []);

  if (!user) return <p className='text-center mt-8'>로딩 중...</p>;

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded'>
      <h2 className='text-xl font-bold mb-6'>마이페이지</h2>

      <div className='flex items-center mb-6'>
        {/* 프로필 이미지 
        <ProfileImageUploader
          userId={user.id}
          currentImage={user.profileImage}
        />*/}
        <div className='ml-6'>
          <p className='text-lg font-semibold'>{user.name} 님</p>
          <p className='text-gray-600'>{user.email}</p>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
        <InfoItem label='회사명' value={user.company} />
        <InfoItem label='직급' value={user.position} />
        <InfoItem label='전화번호' value={user.phone} />
        <InfoItem label='주소' value={user.address} />
        <InfoItem label='상세주소' value={user.detailAddress} />
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className='font-medium text-gray-700'>{label}:</span>{' '}
      <span className='text-gray-900'>{value || '-'}</span>
    </div>
  );
}

export default MyPage;
