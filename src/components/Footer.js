import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className='Footer flex justify-center bg-brand-primary-light px-4 pb-4'>
      <div className='flex w-[55rem] flex-col sm:flex-row'>
        <div className='flex flex-col justify-end pb-4'>
          <div className='flex items-center'>
            <MdOutlineEmail className='button-icon' />
            info@solarmoonanalytics.com
          </div>
          <div>© {year} Solar Moon Analytics, LLC</div>
        </div>
        <div className='grow' />
        <div className='me-5 pb-4'>
          <div>Company</div>
          <div className='text-sm text-neutral-500'>Roadmap</div>
          <div className='text-sm text-neutral-500'>Changelog</div>
        </div>
        <div className='me-4 flex flex-col'>
          <div>Legal</div>
          <NavLink className='text-sm text-neutral-500 underline' to='/tos'>
            Terms of Service
          </NavLink>{' '}
          <NavLink className='text-sm text-neutral-500 underline' to='/privacy'>
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </div>
  );
}
