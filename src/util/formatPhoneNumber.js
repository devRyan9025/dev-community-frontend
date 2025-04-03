// 자동 하이픈 포맷팅 함수
export default function formatPhoneNumber(value) {
  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length < 4) return onlyNums;
  if (onlyNums.length < 8)
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
    7,
    11
  )}`;
}
