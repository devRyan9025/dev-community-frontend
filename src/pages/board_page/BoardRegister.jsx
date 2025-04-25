import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

/*************  게시글 등록 페이지 *************/
export default function BoardRegister() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/board', { title, content });
      const newId = res.data.board.id; // 백엔드 리턴 구조에 맞춰 조정
      navigate(`/board/${newId}`);
    } catch (err) {
      console.error('게시글 작성 실패', err);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl font-bold mb-6'>✍️ 새 게시글 작성</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1 font-medium'>제목</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring'
            placeholder='제목을 입력하세요'
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full h-48 border rounded px-3 py-2 focus:outline-none focus:ring'
            placeholder='내용을 입력하세요'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800'
          }`}>
          {loading ? '작성 중…' : '게시글 등록'}
        </button>
      </form>
    </div>
  );
}
