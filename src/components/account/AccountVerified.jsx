import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../common/Button';

export default function AccountVerified() {
  return (
    <main className='tos flex flex-col items-center bg-brand-primary-light dark:bg-gray-950'>
      <div className='fade-in my-8 max-w-full bg-white p-6 shadow-panel sm:mx-5 sm:max-w-[55rem] sm:rounded-lg sm:p-8 dark:bg-gray-800'>
        <div className='mb-8 flex flex-col items-center p-8'>
          <div className='mb-8 text-lg font-bold sm:text-2xl dark:text-gray-100'>
            Account verification successful!
          </div>
          <Button
            className='mt-3 justify-center'
            onClick={() => {
              window.location.href = 'https://app.solarmoonanalytics.com';
            }}
            type='button'
            variant='primary'
          >
            Login to your account
          </Button>
          <div></div>
        </div>
      </div>
    </main>
  );
}
