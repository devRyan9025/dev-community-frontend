import { useEffect } from 'react';
import { loadDaumPostcodeScript } from '../../api/DaumPostcodeScript';

export default function AddressInput({
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  postcode,
  setPostcode,
}) {
  useEffect(() => {
    loadDaumPostcodeScript(() => {
      // 스크립트 로딩 완료
    });
  }, []);

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;

        if (data.addressType === 'R') {
          if (data.bname) fullAddress += ` ${data.bname}`;
          if (data.buildingName) fullAddress += `, ${data.buildingName}`;
        }

        setAddress(fullAddress);
        setPostcode(data.zonecode); // ✅ 우편번호 저장
      },
    }).open();
  };

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>주소</label>

      {/* 우편번호 */}
      <input
        type='text'
        value={postcode}
        readOnly
        placeholder='우편번호'
        className='border px-3 py-2 rounded w-1xs'
      />

      {/* 주소 */}
      <div className='flex space-x-2'>
        <input
          type='text'
          readOnly
          value={address}
          placeholder='주소 검색을 해주세요'
          className='border px-3 py-2 rounded w-2xs'
        />
        <button
          type='button'
          onClick={handleSearchAddress}
          className='bg-indigo-500 text-white px-4 py-2 rounded text-sm'>
          주소 찾기
        </button>
      </div>

      {/* 상세 주소 */}
      <input
        type='text'
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        placeholder='상세 주소 입력 (예: 101동 202호)'
        className='border px-3 py-2 rounded w-2xl'
      />
    </div>
  );
}
