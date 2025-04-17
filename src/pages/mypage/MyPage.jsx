import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import ProfileImageUploader from './ProfileImageUploader';

export default function MyPage() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get('/user/getLogginedUser')
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
          currentImage={
            user.profile_image || '../../assets/default-profile.png'
          }
          onUpload={(url) =>
            setUser((prev) => ({ ...prev, profile_image: url }))
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
        <InfoItem label='📦 상세주소' value={user.detail_address} />
      </div>

      {/* 회원정보 수정 버튼 */}
      <div className='text-right'>
        <button
          onClick={() => nav('/mypage/verify-password')}
          className='bg-gray-900 hover:bg-black text-white px-6 py-2 mt-5 rounded-md text-sm font-medium'>
          회원정보 수정
        </button>
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
