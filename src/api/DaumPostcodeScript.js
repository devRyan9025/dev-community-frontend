export function loadDaumPostcodeScript(callback) {
  const script = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  script.onload = callback;
  document.body.appendChild(script);
}
