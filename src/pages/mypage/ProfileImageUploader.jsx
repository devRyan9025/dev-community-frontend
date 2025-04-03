import { useRef, useState, useContext } from 'react';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

export default function ProfileImageUploader({
  userId,
  currentImage,
  onUpload,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(currentImage);
  const [timestamp, setTimestamp] = useState(Date.now());
  const { setUser, setImageVersion } = useContext(AuthContext);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await axios.post(`/user/${userId}/upload-profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const filename = res.data.profileImage;

      // ✅ 프론트에서 즉시 반영
      setPreview(filename);
      setTimestamp(Date.now()); // 캐시 방지용 쿼리 파라미터 업데이트

      setUser((prev) => ({ ...prev, profileImage: filename }));
      setImageVersion(Date.now()); // 헤더 이미지 캐시 무효화

      onUpload(filename); // 마이페이지에도 반영
    } catch (err) {
      alert('이미지 업로드 실패');
      console.error(err);
    }
  };

  const API_BASE = import.meta.env.VITE_API_BASE;

  return (
    <div
      className='relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 shadow-md cursor-pointer'
      onClick={() => fileInputRef.current?.click()}
      title='프로필 이미지 변경'>
      <img
        src={`${API_BASE}/uploads/${preview}?t=${timestamp}`}
        alt='프로필'
        className='w-full h-full object-cover'
      />
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleImageChange}
        className='hidden'
      />
      <div className='absolute bottom-0 w-full text-xs text-center bg-black/40 text-white py-1'>
        변경
      </div>
    </div>
  );
}
