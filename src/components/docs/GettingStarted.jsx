import { Link } from 'react-router-dom';

import uploadChannel from '../../assets/upload-channel.jpg';
import CopyButton from '../common/CopyButton';
import Step from './Step';

export default function GettingStarted() {
  return (
    <div>
      <div className='mb-8 flex text-2xl font-bold sm:text-4xl'>
        Getting <span className='text-brand-primary'>Started</span>
      </div>
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
              Plans are available monthly or annually in packs of 20 devices. (
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
              &nbsp; and locate the access key underneath the API Information
              section. Copy this for a future step.
            </div>
          }
          number={4}
          title='Collect your access key'
        />
        <Step
          content={
            <div>
              Follow instructions below depending on the type of devices
              <br />
              <ul className='ms-6 list-disc'>
                <li>
                  <Link
                    className='text-brand-primary underline'
                    to='/docs/connectingDevice'
                  >
                    Connecting an Obvius device
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-brand-primary underline'
                    to='/docs/connectingSMADevices'
                  >
                    Connecting SMA devices
                  </Link>
                </li>
              </ul>
            </div>
          }
          number={5}
          title='Setup devices'
        />
      </div>
    </div>
  );
}
