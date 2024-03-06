import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import ConnectingDevice from './ConnectingDevice';
import DeviceData from './DeviceData';
import Mapping from './Mapping';
import OrganizingDevices from './OrganizingDevices';

export default function Docs() {
  const match = useMatch('/docs/:docName');
  const docName = match?.params?.docName;

  return (
    <main className='docs flex w-full flex-col items-center bg-brand-primary-light sm:p-8 dark:bg-gray-950'>
      <div className='fade-in mx-2 my-8 flex w-[75rem] max-w-full bg-white p-6 shadow-panel sm:mx-5 sm:rounded-lg sm:p-8 dark:bg-gray-800 dark:text-gray-100'>
        <div className='toc hidden min-w-40 flex-col space-y-1 sm:flex'>
          <div className='mb-4 flex text-lg font-bold'>Topics</div>
          <NavLink
            className={
              (docName === undefined ? 'active ' : '') +
              'group flex items-center rounded-md text-sm transition-all duration-150 hover:bg-neutral-100 dark:hover:bg-gray-700 sm:p-2'
            }
            to='/docs/connectingDevice'
          >
            Connecting a device
          </NavLink>
          <NavLink
            className='group flex items-center rounded-md text-sm transition-all duration-150 hover:bg-neutral-100 sm:p-2 dark:hover:bg-gray-700'
            to='/docs/sortingDevices'
          >
            Organizing devices
          </NavLink>
          <NavLink
            className='group flex items-center rounded-md text-sm transition-all duration-150 hover:bg-neutral-100 sm:p-2 dark:hover:bg-gray-700'
            to='/docs/deviceData'
          >
            Understanding device data
          </NavLink>
          <NavLink
            className='group flex items-center rounded-md text-sm transition-all duration-150 hover:bg-neutral-100 sm:p-2 dark:hover:bg-gray-700'
            to='/docs/mapping'
          >
            Mapping device data
          </NavLink>
        </div>
        <div className='body grow ps-4'>
          {(docName === undefined || docName === 'connectingDevice') && (
            <ConnectingDevice />
          )}
          {docName === 'sortingDevices' && <OrganizingDevices />}
          {docName === 'deviceData' && <DeviceData />}
          {docName === 'mapping' && <Mapping />}
        </div>
      </div>
    </main>
  );
}
