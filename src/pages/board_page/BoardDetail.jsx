import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

/*************  게시글 상세 페이지 *************/
export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`/board/${id}`);
        // 백엔드가 writerName 필드를 같이 내려준다고 가정
        setBoard(res.data.data);
      } catch (err) {
        console.error('게시글 상세조회 실패', err);
        setError('게시글을 불러오지 못했습니다.😢');
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [id]);

  if (loading) return <p className='text-center py-8'>불러오는 중…</p>;
  if (error) return <p className='text-center py-8 text-red-500'>{error}</p>;
  if (!board)
    return <p className='text-center py-8'>존재하지 않는 게시글입니다.</p>;

  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <button
        onClick={() => navigate(-1)}
        className='flex mb-4 text-lg text-gray-800 cursor-pointer hover:underline'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='size-6 mt-0.5'>
          <path
            fillRule='evenodd'
            d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
            clipRule='evenodd'
          />
        </svg>
        <span className='ml-2'>뒤로가기</span>
      </button>

      <h1 className='text-3xl font-bold mb-2'>{board.title}</h1>
      <p className='text-sm text-gray-500 mb-6'>
        작성자: {board.writer_name} |{' '}
        {new Date(board.created_at).toLocaleString()}
      </p>

      <div className='prose prose-lg mb-8'>
        {board.content.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      <div className='flex space-x-2'>
        <Link
          to={`/board/${id}/edit`}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
          수정하기
        </Link>
        <Link
          to='/board'
          className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>
          목록으로
        </Link>
      </div>
    </div>
  );
}
