import React from 'react';

export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-md shadow-lg w-96 text-center'>
        <p className='text-lg font-medium mb-4'>
          이미 존재하는 파일입니다. 덮어쓰시겠습니까?
        </p>
        <div className='flex justify-around'>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
            덮어쓰기
          </button>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
