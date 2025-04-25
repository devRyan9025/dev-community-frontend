import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

export default function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`/board/${id}`);
        const { title, content } = res.data.data;
        setTitle(title);
        setContent(content);
      } catch (err) {
        console.error('게시글 불러오기 실패', err);
        setError('게시글을 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setSaving(true);
      await axios.put(`/board/${id}`, { title, content });
      navigate(`/board/${id}`);
    } catch (err) {
      console.error('게시글 수정 실패', err);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className='text-center py-8'>불러오는 중…</p>;
  if (error) return <p className='text-center py-8 text-red-500'>{error}</p>;

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      <h1 className='text-2xl font-bold mb-6'>게시글 수정</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1 font-medium'>제목</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring'
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full h-48 border rounded px-3 py-2 focus:outline-none focus:ring'
          />
        </div>
        <button
          type='submit'
          disabled={saving}
          className={`w-full py-2 rounded text-white ${
            saving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}>
          {saving ? '저장 중…' : '수정 완료'}
        </button>
      </form>
    </div>
  );
}
