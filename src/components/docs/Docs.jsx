import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import ConnectingDevice from './ConnectingDevice';
import SortingDevices from './SortingDevices';

export default function Docs() {
  const match = useMatch('/docs/:docName');
  const docName = match?.params?.docName;

  return (
    <main className='docs flex w-full flex-col items-center bg-brand-primary-light p-4'>
      <div className='fade-in mx-2 my-8 flex w-[75rem] max-w-full bg-white p-6 shadow-panel sm:mx-5 sm:rounded-lg sm:p-8'>
        <div className='toc flex min-w-40 flex-col'>
          <div className='mb-4 flex text-lg font-bold'>Topics</div>
          <NavLink
            className='group flex items-center rounded-lg p-0 text-sm transition-all duration-150 hover:bg-neutral-100 sm:p-4'
            to='/docs/connectingDevice'
          >
            Connecting a device
          </NavLink>
          <NavLink
            className='group flex items-center rounded-lg p-0 text-sm transition-all duration-150 hover:bg-neutral-100 sm:p-4'
            to='/docs/sortingDevices'
          >
            Sorting devices
          </NavLink>
        </div>
        <div className='body grow ps-4'>
          {(docName === undefined || docName === 'connectingDevice') && (
            <ConnectingDevice />
          )}
          {docName === 'sortingDevices' && <SortingDevices />}
        </div>
      </div>
    </main>
  );
}
