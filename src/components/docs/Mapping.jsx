import { Link } from 'react-router-dom';

import Step from './Step';

export default function Mapping() {
  return (
    <div>
      <div className='mb-8 flex text-2xl font-bold sm:text-4xl'>
        Mapping data from your 
        <span className='text-brand-primary'>devices</span>
      </div>
      <div>
        <Step
          content={
            <div>
              Mappings provide a way to translate names of data points from your
              devices to the fields Solar Moon needs to generate graphs,
              analytics and alerts. There are a number of mappings provided by
              default, but if you are unable to change your device settings to
              match them, the platform can map to existing config instead.
            </div>
          }
          title='What are mappings used for?'
        />
        <Step
          content={<div>There are a number of</div>}
          title='Default device field mappings'
        />
        <Step
          content={
            <div>
              Navigate to 
              <Link
                className='text-brand-primary underline'
                to='https://app.solarmoonanalytics.com/mapping'
              >
                mapping page
              </Link>
              . Mapping is also available from the manage page.
            </div>
          }
          number={1}
          title='Adding custom mappings'
        />
      </div>
    </div>
  );
}
