import { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

/*************  전체 게시글 조회 페이지 *************/
export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 7; // 한 페이지에 보여줄 개수

  useEffect(() => {
    axios
      .get('/board', { params: { page, limit } })
      .then((res) => {
        setBoards(res.data.data.boards);
        setTotalCount(res.data.data.totalCount);
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패', err);
      });
  }, [page]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>📋 게시판</h1>
        <Link
          to='/board/register'
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
          글쓰기
        </Link>
      </div>

      {/* 게시글 리스트 */}
      <div className='space-y-4'>
        {boards.length === 0 ? (
          <p className='text-gray-500'>게시글이 없습니다.</p>
        ) : (
          boards.map((b) => (
            <Link
              to={`/board/${b.id}`}
              key={b.id}
              className='block border p-4 rounded hover:bg-gray-50'>
              <h2 className='text-lg font-semibold'>{b.title}</h2>
              <p className='text-sm text-gray-500'>
                작성자: {b.writer_name} |{' '}
                {new Date(b.created_at).toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <div className='flex justify-center items-center space-x-2 mt-8'>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className='px-3 py-1 border rounded disabled:opacity-50'>
          이전
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 border rounded ${
              num === page ? 'bg-blue-600 text-white' : ''
            }`}>
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className='px-3 py-1 border rounded disabled:opacity-50'>
          다음
        </button>
      </div>
    </div>
  );
}
