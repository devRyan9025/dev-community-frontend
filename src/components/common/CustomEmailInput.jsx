import Select from 'react-select';

export default function CustomEmailInput({
  isEmailVerified,
  emailId,
  setEmailId,
  emailDomain,
  setEmailDomain,
  customDomain,
  setCustomDomain,
}) {
  const domainOptions = [
    { value: 'naver.com', label: 'naver.com' },
    { value: 'gmail.com', label: 'gmail.com' },
    { value: 'hanmail.net', label: 'hanmail.net' },
    { value: 'custom', label: '직접 입력' },
  ];

  const selectedDomain = domainOptions.find((opt) => opt.value === emailDomain);

  const handleSelectChange = (option) => {
    setEmailDomain(option.value);
    if (option.value !== 'custom') setCustomDomain('');
  };

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>이메일</label>

      {/* 이메일 아이디 */}
      <div className='flex items-center space-x-2'>
        <input
          type='text'
          placeholder='이메일 아이디'
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          disabled={isEmailVerified}
          className='block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
        />
        <span>@</span>

        {/* react-select 셀렉트 박스 */}
        <div className='w-2xs'>
          <Select
            options={domainOptions}
            value={selectedDomain}
            onChange={handleSelectChange}
            isDisabled={isEmailVerified}
            isSearchable={false}
            className='react-select-container'
            classNamePrefix='react-select'
            placeholder='도메인 선택'
          />
        </div>
      </div>

      {/* 직접 입력 input 노출 */}
      {selectedDomain.value === 'custom' && (
        <input
          type='text'
          placeholder='도메인을 직접 입력하세요'
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          disabled={isEmailVerified}
          className='mt-1 block w-2xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
        />
      )}
    </div>
  );
}
