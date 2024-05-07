import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../common/Button';

export default function AccountActivationError() {
  return (
    <main className='tos flex flex-col items-center bg-brand-primary-light dark:bg-gray-950'>
      <div className='fade-in my-8 max-w-full bg-white p-6 shadow-panel sm:mx-5 sm:max-w-[55rem] sm:rounded-lg sm:p-8 dark:bg-gray-800'>
        <div className='mb-8 flex flex-col items-center p-8'>
          <div className='mb-8 text-lg font-bold sm:text-2xl dark:text-gray-100'>
            There was an error verifying your account.
          </div>
          <div className='mb-8 dark:text-gray-100'>
            Please try clicking on the verification link again. If this does not
            work and you are not able to log into Solar Moon Analytics, please
            contact{' '}
            <Link
              className='text-brand-primary underline'
              to='mailto:support@solarmoonanalytics.com'
            >
              support@solarmoonanalytics.com
            </Link>
            .
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
