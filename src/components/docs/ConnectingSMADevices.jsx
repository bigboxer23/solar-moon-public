import { Link } from 'react-router-dom';

import editingFTP from '../../assets/docs/connecting_sma/editingFTP.jpg';
import FTPPage from '../../assets/docs/connecting_sma/FTPPage.jpg';
import location from '../../assets/docs/connecting_sma/location.jpg';
import CopyButton from '../common/CopyButton';
import AccessKeyStep from './AccessKeyStep';
import Step from './Step';

export default function ConnectingSMADevices() {
  return (
    <div>
      <div className='mb-8 flex text-2xl font-bold sm:text-4xl'>
        Connecting SMA <span className='text-brand-primary'>devices</span>
      </div>
      <div>
        <Step
          content={<AccessKeyStep />}
          number={1}
          title='Collect access key'
        />
        <Step
          content={
            <div>
              Login to your cluster controller and navigate to the{' '}
              <span className='font-bold text-brand-primary'>
                Settings tab.
              </span>
              &nbsp;From there, chose the&nbsp;
              <span className='font-bold text-brand-primary'>
                Further Applications
              </span>
              &nbsp;section. Click the edit button.
              <img
                alt='ftp page'
                className='object-fill py-6 pe-6 ps-3'
                src={FTPPage}
              />
            </div>
          }
          number={2}
          title='Locate the settings page on your SMA cluster controller'
        />
        <Step
          content={
            <div>
              There are a few fields to update:
              <ul className='ms-6 list-disc'>
                <li>
                  <div>
                    Data export in CSV format should be set to&nbsp;
                    <span className='font-bold text-brand-primary'>No</span>
                  </div>
                </li>
                <li>
                  <div>
                    Data export in XML format should be set to&nbsp;
                    <span className='font-bold text-brand-primary'>Yes</span>
                  </div>
                </li>
                <li>
                  <div className='flex items-center'>
                    Login & password fields should be updated with your access
                    key retrieved in step 1
                  </div>
                </li>
                <li>
                  <div className='flex items-center'>
                    Server should be updated to&nbsp;
                    <span className='me-2 font-bold text-brand-primary'>
                      ftp.solarmoonanalytics.com
                    </span>
                    <span>
                      <CopyButton
                        dataSrc={() => 'ftp.solarmoonanalytics.com'}
                        title='Copy URL'
                      />
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    Press the{' '}
                    <span className='font-bold text-brand-primary'>Save</span>{' '}
                    button
                  </div>
                </li>
              </ul>
              <img
                alt='editing ftp'
                className='object-fill py-6 pe-6 ps-3'
                src={editingFTP}
              />
            </div>
          }
          number={3}
          title='Setting up FTP push data transfer'
        />
        <Step
          content={
            <div>
              Once your SMA cluster controller has gone through a push data
              cycle (generally within 30m), navigate to the&nbsp;
              <Link
                className='text-brand-primary underline'
                to='https://app.solarmoonanalytics.com/manage'
              >
                site management page.
              </Link>
              &nbsp; Devices will show up under a site named by the cluster
              controller&apos;s name. If no devices shows up, validate within
              the SMA controller&apos;s event logs whether data has successfully
              been sent. There should be an entry similar to &quot;FTP upload
              completed&quot;. If a further error occurs, please contact&nbsp;
              <Link
                className='text-brand-primary underline'
                to='mailto:support@solarmoonanalytics.com'
              >
                support@solarmoonanalytics.com
              </Link>
            </div>
          }
          number={4}
          title='Validate device was created'
        />
        <Step
          content={
            <div>
              It is important to properly set the site&apos;s location to
              guarantee all collected data is properly stamped with the time
              zone specific time. If no location is set, the platform will fall
              back to the default timezone set on the user profile.
              <img
                alt='editing ftp'
                className='object-fill py-6 pe-6 ps-3'
                src={location}
              />
            </div>
          }
          number={5}
          title="Update the site's location"
        />
      </div>
    </div>
  );
}
