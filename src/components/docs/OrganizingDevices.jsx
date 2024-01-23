import { Link } from 'react-router-dom';

import addDevice from '../../assets/docs/organizing/addDevice.jpg';
import existingDevice from '../../assets/docs/organizing/existingDevice.jpg';
import newSiteDialog from '../../assets/docs/organizing/newSiteDialog.jpg';
import newSiteDropDown from '../../assets/docs/organizing/newSiteDropDown.jpg';
import Step from './Step';

export default function OrganizingDevices() {
  return (
    <div>
      <div className='mb-8 flex text-4xl font-bold'>
        Organizing devices into a 
        <span className='text-brand-primary'>site</span>
      </div>
      <div>
        <Step
          content={
            <div>
              By default, devices are placed into a{' '}
              <span
                className='font-bold
          text-brand-primary'
              >
                No Site
              </span>{' '}
              group. Devices can be organized into a site, which allows
              collected data for all devices to be combined into an aggregated
              view. Placing devices together provides a convenient way to see
              all data from a particular location within a single view. It also
              allows for more direct comparison of devices which should have
              similar output (e.g co-located). Sites also offer the ability to
              define a physical location where they exist so weather information
              can be collected and stored with device data.
            </div>
          }
          title='What is the purpose of a site?'
        />
        <Step
          content={
            <div>
              Navigate to manage 
              <Link
                className='text-brand-primary underline'
                to='https://app.solarmoonanalytics.com/manage'
              >
                page
              </Link>
            </div>
          }
          number={1}
          title='Setting up a site'
        />
        <Step
          content={
            <div>
              Click on the site drop down and select New Site.
              <img
                alt='brand'
                className='object-fill pe-5 ps-3 pt-4'
                src={newSiteDropDown}
              />
            </div>
          }
          number={2}
          title='Open new site dialog'
        />
        <Step
          content={
            <div>
              Fill in the information requested in the dialog. Location data
              will be used to fetch localized weather data which will be shown
              and stored with the site and associated devices.
              <img
                alt='brand'
                className='object-fill pe-5 ps-3 pt-4'
                src={newSiteDialog}
              />
            </div>
          }
          number={3}
          title='Fill required site information'
        />
        <Step
          content={
            <div>
              Once the site is created, devices can be added in two different
              ways:
              <ul className='ms-6 list-disc'>
                <li>
                  For new devices, clicking the{' '}
                  <span
                    className='font-bold
          text-brand-primary'
                  >
                    Add Device
                  </span>{' '}
                  button will show the device creation dialog.
                  <img
                    alt='brand'
                    className='object-fill pb-8 pe-8 ps-3 pt-4'
                    src={addDevice}
                  />
                </li>
                <li>
                  For existing devices, navigate back to the{' '}
                  <span
                    className='font-bold
          text-brand-primary'
                  >
                    No Site
                  </span>{' '}
                  group. Devices will have a Site selector which can be used to
                  move the device into the newly created site.
                  <img
                    alt='brand'
                    className='object-fill pe-8 ps-3 pt-4'
                    src={existingDevice}
                  />
                </li>
              </ul>
            </div>
          }
          number={4}
          title='Add devices to the site'
        />
      </div>
    </div>
  );
}
