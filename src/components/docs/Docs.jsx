import React from 'react';
import { Link } from 'react-router-dom';

import uploadChannel from '../../assets/upload-channel.jpg';
import CopyButton from '../common/CopyButton';
import Step from './Step';

export default function Docs() {
  return (
    <main className='docs flex flex-col items-center bg-brand-primary-light'>
      <div className='fade-in mx-2 my-8 max-w-[55rem] bg-white p-6 shadow-panel sm:mx-5 sm:rounded-lg sm:p-8'>
        <div className='mb-8 flex text-4xl font-bold'>
          Connecting a  <span className='text-brand-primary'>device</span>
        </div>
        <div>
          <div>
            <Step
              content={
                <Link
                  className='text-brand-primary underline'
                  to='https://app.solarmoonanalytics.com'
                >
                  Create Account
                </Link>
              }
              number={1}
              title='Create an account'
            />
            <Step
              content='Check your email box for a verification code and paste this into the window from the previous step.'
              number={2}
              title='Verify your email address'
            />
            <Step
              content={
                <div>
                  Plans are available monthly or annually in packs of 20
                  devices. (
                  <Link
                    className='text-brand-primary underline'
                    to='https://solarmoonanalytics.com/pricing'
                  >
                    see here
                  </Link>
                  )
                </div>
              }
              number={3}
              title='Sign up for a plan'
            />
            <Step
              content={
                <div>
                  Navigate to the{' '}
                  <Link
                    className='text-brand-primary underline'
                    to='https://app.solarmoonanalytics.com/profile'
                  >
                    user profile section
                  </Link>
                  &nbsp; and locate the access key underneath the API
                  Information section. Copy this for a future step.
                </div>
              }
              number={4}
              title='Collect your access key'
            />
            <Step
              content={
                <div>
                  Login to your device and navigate to the{' '}
                  <span className='font-bold text-brand-primary'>
                    Log File Data -&gt; Setup/Upload
                  </span>{' '}
                  page.
                </div>
              }
              number={5}
              title='Login to your Obvius data acquisition server'
            />
            <Step
              content={
                <div>
                  There are a few things to change in this step:
                  <ul className='ms-6 list-disc'>
                    <li>
                      <div>
                        Update the protocol to{' '}
                        <span className='font-bold text-brand-primary'>
                          {' '}
                          Obvius AcquiSuite XML
                        </span>
                      </div>
                    </li>
                    <li>
                      Upload URL should be updated to point to &nbsp;
                      <span>
                        <div className='flex flex-wrap items-center font-bold text-brand-primary'>
                          <span className='me-2'>
                            http://solarmoonanalytics.com/upload
                          </span>
                          <CopyButton
                            dataSrc={() =>
                              'http://solarmoonanalytics.com/upload'
                            }
                            title='Copy Upload URL'
                          />
                        </div>
                      </span>
                    </li>
                    <li>
                      Password should be updated with your Access Key retrieved
                      in step 3
                    </li>
                    <li>
                      Optionally set filters to determine which devices are sent
                      to the platform
                    </li>
                    <li>
                      <div>
                        Press the{' '}
                        <span className='font-bold text-brand-primary'>
                          Apply
                        </span>{' '}
                        button
                      </div>
                    </li>
                  </ul>
                  <img
                    alt='brand'
                    className='object-fill pe-5 ps-3 pt-4'
                    src={uploadChannel}
                  />
                </div>
              }
              number={6}
              title='Setup an upload channel'
            />
            <Step
              content={
                <div>
                  Press the{' '}
                  <span className='font-bold text-brand-primary'>
                    Upload Data Now
                  </span>{' '}
                  button.
                </div>
              }
              number={7}
              title='Trigger sending data from the server to the platform'
            />
            <Step
              content={
                <div>
                  Navigate to the&nbsp;
                  <Link
                    className='text-brand-primary underline'
                    to='https://app.solarmoonanalytics.com/siteManagement'
                  >
                    site management page
                  </Link>{' '}
                  &nbsp;and validate you see your device. Devices will show up
                  under{' '}
                  <span className='font-bold text-brand-primary'>No Site</span>{' '}
                  until they are added to a site. If no device shows up,
                  validate within the Obvius device&apos;s logs whether data has
                  successfully been sent. If a further error occurs, please
                  contact&nbsp;
                  <Link
                    className='text-brand-primary underline'
                    to='mailto:support@solarmoonanalytics.com'
                  >
                    support@solarmoonanalytics.com
                  </Link>
                </div>
              }
              number={8}
              title='Validate device was created'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
