import { useRef, useState, useContext } from 'react';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';
import ConfirmModal from '../../components/common/confirmModal';

export default function ProfileImageUploader({
  userId,
  currentImage,
  onUpload,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(currentImage);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const { setUser, setImageVersion } = useContext(AuthContext);
  const API_BASE = import.meta.env.VITE_API_BASE;

  // 업로드 로직
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 한글 파일 인코딩
    const encodedName = encodeURIComponent(file.name);

    try {
      const res = await axios.get(
        `/user/check-duplicate-filename?filename=${encodedName}`
      );

      if (res.data.result === 'exist') {
        setPendingFile(file); // 중복된 파일 → 모달 띄우기
        setModalOpen(true);
      } else {
        uploadFile(file); // 중복 아님 → 바로 업로드
      }
    } catch (err) {
      alert('중복 체크 실패');
      console.error(err);
    } finally {
      // 같은 파일 연속 선택 방지 → 초기화
      fileInputRef.current.value = '';
    }
  };

  // 실제 파일 업로드 실행
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await axios.post(`/user/${userId}/upload-profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const filename = res.data.profileImage;

      setPreview(filename);
      setTimestamp(Date.now());

      setUser((prev) => ({ ...prev, profileImage: filename }));
      setImageVersion(Date.now());
      onUpload(filename); // 부모 컴포넌트 업데이트
    } catch (err) {
      alert('업로드 실패');
    }
  };

  // 모달에서 '덮어쓰기' 클릭 시
  const confirmUpload = () => {
    if (pendingFile) {
      uploadFile(pendingFile);
    }
    setModalOpen(false);
    setPendingFile(null);

    // 선택값 초기화
    fileInputRef.current.value = '';
  };

  // 모달에서 '취소' 클릭 시
  const cancelUpload = () => {
    setModalOpen(false);
    setPendingFile(null);

    // 선택값 초기화
    fileInputRef.current.value = '';
  };

  return (
    <>
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

      {/* ✅ 중복 파일 덮어쓰기 모달 */}
      <ConfirmModal
        isOpen={modalOpen}
        onConfirm={confirmUpload}
        onCancel={cancelUpload}
      />
    </>
  );
}
