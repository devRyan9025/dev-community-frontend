import { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import ProfileImageUploader from './ProfileImageUploader';

export default function MyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/user/me')
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error('유저 정보 조회 실패:', err));
  }, []);

  if (!user)
    return <p className='text-center mt-12 text-gray-400'>로딩 중...</p>;

  return (
    <div className='max-w-3xl mx-auto px-6 py-10 bg-[#fdfdfd] rounded-2xl shadow-md border mt-10'>
      {/* 상단 인사 + 프로필 */}
      <div className='flex items-center space-x-6 mb-8'>
        {/* 프로필 이미지 자리 */}
        <ProfileImageUploader
          userId={user.id}
          currentImage={user.profileImage}
          onUpload={(url) =>
            setUser((prev) => ({ ...prev, profileImage: url }))
          }
          userName={user.name}
        />

        <div>
          <h2 className='text-xl font-semibold text-gray-800'>
            👋 {user.name}님, 반가워요!
          </h2>
          <p className='text-gray-500'>{user.email}</p>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className='bg-white rounded-xl p-6 shadow-sm space-y-5'>
        <InfoItem label='🏢 회사명' value={user.company} />
        <InfoItem label='💼 직급' value={user.position} />
        <InfoItem label='📞 전화번호' value={user.phone} />
        <InfoItem label='🏠 주소' value={user.address} />
        <InfoItem label='📦 상세주소' value={user.detailAddress} />
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center'>
      <span className='w-32 font-medium text-gray-600 mb-1 sm:mb-0'>
        {label}
      </span>
      <span className='text-gray-800 bg-gray-50 rounded px-4 py-2 shadow-inner w-full sm:w-auto'>
        {value || '정보 없음'}
      </span>
    </div>
  );
}
