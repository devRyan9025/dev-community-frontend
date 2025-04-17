import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

export default function EditUserInfo() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
    address: '',
    detailAddress: '',
    profile_image: '',
  });
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        company: user.company || '',
        position: user.position || '',
        phone: user.phone || '',
        address: user.address || '',
        detailAddress: user.detail_address || '',
        profile_image: user.profile_image || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch('/user/updateUserInfo', form);

      if (res.data.result === 'success') {
        alert('회원정보가 수정되었습니다!');
        setUser(res.data.user); // context에 반영
        nav('/mypage');
      } else {
        alert(res.data.message || '수정 실패');
      }
    } catch (err) {
      alert(err.response?.data?.message || '오류 발생');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-8 mt-10 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-6'>회원정보 수정</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {[
          { label: '이름', name: 'name' },
          { label: '회사명', name: 'company' },
          { label: '직급', name: 'position' },
          { label: '전화번호', name: 'phone' },
          { label: '주소', name: 'address' },
          { label: '상세주소', name: 'detailAddress' },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className='block text-sm font-medium text-gray-700'>
              {label}
            </label>
            <input
              type='text'
              name={name}
              value={form[name]}
              onChange={handleChange}
              className='mt-1 block w-full border px-3 py-2 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
        ))}

        <div className='text-right'>
          <button
            type='submit'
            className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800'>
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
}
