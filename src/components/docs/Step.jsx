import React from 'react';

export default function Step({ number, title, content }) {
  return (
    <div className='mb-8 flex items-baseline'>
      <div>
        {number && (
          <div className='me-2 rounded-full bg-brand-primary px-2.5 py-0.5 text-xs font-medium text-white'>
            {number}
          </div>
        )}
        {!number && <div className='me-2  px-2.5 py-0.5' />}
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 text-xl font-bold'>{title}</div>
        <div className=''>{content}</div>
      </div>
    </div>
  );
}
