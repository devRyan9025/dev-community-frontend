import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import CustomEmailInput from '../../components/common/CustomEmailInput';
import AddressInput from '../../components/common/AddressInput';
import formatPhoneNumber from '../../util/formatPhoneNumber';

export default function Register() {
  // 이메일 관련 state
  const [email, setEmail] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('custom');
  const [customDomain, setCustomDomain] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 비밀번호 관련 state
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  // 회원 가입 양식
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const nav = useNavigate();

  // 쿼리 파라미터로 이메일 인증 결과 확인
  useEffect(() => {
    const checkVerifiedEmail = () => {
      const verifiedEmail = localStorage.getItem('verifiedEmail');
      if (verifiedEmail) {
        setEmail(verifiedEmail);
        setIsEmailVerified(true);

        // 이메일 분해해서 상태 재설정
        const [id, domain] = verifiedEmail.split('@');
        setEmailId(id);
        setCustomDomain('');
        setEmailDomain(domain);

        localStorage.removeItem('verifiedEmail'); // 한 번만 쓰고 삭제
      }
    };

    checkVerifiedEmail();

    // 🔥 storage 이벤트로 인증 상태 감지
    const handleStorage = (e) => {
      if (e.key === 'verifiedEmail') {
        checkVerifiedEmail();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    setPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  // 이메일 인증 요청
  const handleEmailVerification = async () => {
    // 이메일 전체 조합
    const getFullEmail = () => {
      const domain = emailDomain === 'custom' ? customDomain : emailDomain;
      return `${emailId}@${domain}`;
    };

    const fullEmail = getFullEmail();

    // 이메일 정규식 (간단한 수준)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailId || !fullEmail || !emailRegex.test(fullEmail)) {
      alert('이메일을 정확히 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('/auth/request-email-verification', {
        email: fullEmail,
      });

      alert(res.data.message || '이메일로 인증 링크를 보냈습니다.');
      setEmail(fullEmail); // 백엔드에 전송할 email 상태도 여기서 세팅
    } catch (err) {
      alert(err.response?.data?.message || '이메일 인증 요청 실패');
    }
  };

  // 회원가입 제출 폼
  const submitForm = async () => {
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    if (!passwordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('company', company);
    data.append('position', position);
    data.append('phone', phone);
    data.append('postcode', postcode);
    data.append('address', address);
    data.append('detailAddress', detailAddress);

    try {
      const res = await axios.post('/auth/register', data);

      if (res.data.result === 'success') {
        alert('회원가입 성공!');
        nav('/login');
      } else {
        alert(res.data.message || '회원가입 실패');
      }
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 실패');
    }
  };

  // 회원가입 요청
  const handleRegister = async (e) => {
    e.preventDefault(); // 새로고침 방지

    submitForm();
  };

  return (
    <div className='max-w-4xl mx-auto p-8 bg-white'>
      <h2 className='text-lg font-semibold text-gray-900'>회원가입</h2>
      <p className='mt-1 text-sm text-gray-600'>
        아래의 가입 양식을 작성해주세요.
      </p>

      <form className='mt-6 space-y-6'>
        <div className='grid grid-cols-1  gap-6'>
          {/* 이메일 입력란 */}
          <section className='email_section'>
            <CustomEmailInput
              isEmailVerified={isEmailVerified}
              emailId={emailId}
              setEmailId={setEmailId}
              emailDomain={emailDomain}
              setEmailDomain={setEmailDomain}
              customDomain={customDomain}
              setCustomDomain={setCustomDomain}
            />

            {/* 이메일 인증 버튼 */}
            <button
              type='button'
              disabled={isEmailVerified}
              onClick={handleEmailVerification}
              className={`mt-4 px-4 py-2 text-sm rounded-md ${
                isEmailVerified
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-900 text-white'
              }`}>
              {isEmailVerified ? '인증완료' : '인증하기'}
            </button>

            {/* 이메일 결과 미리보기 */}
            <div className='text-sm text-gray-500 mt-3'>
              입력한 이메일 :{' '}
              <strong>
                {emailId}@
                {emailDomain === 'custom' ? customDomain : emailDomain}
              </strong>
            </div>
          </section>
          <section className='grid grid-cols-2 gap-6 info_section'>
            {/* 비밀번호 */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                비밀번호
              </label>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>

            {/* 비밀번호 확인*/}
            <div>
              <label
                htmlFor='passwordConfirm'
                className='block text-sm font-medium text-gray-700'>
                비밀번호 확인
              </label>
              <input
                type='password'
                name='passwordConfirm'
                id='passwordConfirm'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
              />
              {!passwordMatch && (
                <p className='mt-1 text-sm text-red-500'>
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            {/* 이름 */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'>
                이름
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>

            {/* 회사명 */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                회사명
              </label>
              <input
                type='text'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>

            {/* 직급 */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                직급
              </label>
              <input
                type='text'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                전화번호
              </label>
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                placeholder='010-1234-5678'
                className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </section>
          <section className='address_section'>
            {/* 회사 주소 */}
            <AddressInput
              address={address}
              setAddress={setAddress}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
              postcode={postcode}
              setPostcode={setPostcode}
            />
          </section>
        </div>

        {/* 가입 버튼 */}
        <button
          type='submit'
          onClick={handleRegister}
          disabled={!isEmailVerified}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            isEmailVerified
              ? 'bg-black hover:bg-gray-900'
              : 'bg-gray-300 cursor-not-allowed'
          }`}>
          가입하기
        </button>
      </form>
    </div>
  );
}
