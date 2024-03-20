import { Link } from 'react-router-dom';

import uploadChannel from '../../assets/upload-channel.jpg';
import CopyButton from '../common/CopyButton';
import Step from './Step';

export default function ConnectingDevice() {
  return (
    <div>
      <div className='mb-8 flex text-2xl font-bold sm:text-4xl'>
        Connecting an Obvius <span className='text-brand-primary'>device</span>
      </div>
      <div>
        <Step
          content={
            <div>
              Follow the&nbsp;
              <Link
                className='text-brand-primary underline'
                to='/docs/gettingStarted'
              >
                Getting Started
              </Link>
              &nbsp;instructions to retrieve your access key
            </div>
          }
          number={1}
          title='Collect access key'
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
          number={2}
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
                        dataSrc={() => 'http://solarmoonanalytics.com/upload'}
                        title='Copy Upload URL'
                      />
                    </div>
                  </span>
                </li>
                <li>
                  Password should be updated with your Access Key retrieved in
                  step 3
                </li>
                <li>
                  Optionally set filters to determine which devices are sent to
                  the platform
                </li>
                <li>
                  <div>
                    Press the{' '}
                    <span className='font-bold text-brand-primary'>Apply</span>{' '}
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
          number={3}
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
          number={4}
          title='Trigger sending data from the server to the platform'
        />
        <Step
          content={
            <div>
              Navigate to the&nbsp;
              <Link
                className='text-brand-primary underline'
                to='https://app.solarmoonanalytics.com/manage'
              >
                site management page
              </Link>{' '}
              &nbsp;and validate you see your device. Devices will show up under{' '}
              <span className='font-bold text-brand-primary'>No Site</span>{' '}
              until they are added to a site. If no device shows up, validate
              within the Obvius device&apos;s logs whether data has successfully
              been sent. If a further error occurs, please contact&nbsp;
              <Link
                className='text-brand-primary underline'
                to='mailto:support@solarmoonanalytics.com'
              >
                support@solarmoonanalytics.com
              </Link>
            </div>
          }
          number={5}
          title='Validate device was created'
        />
      </div>
    </div>
  );
}
