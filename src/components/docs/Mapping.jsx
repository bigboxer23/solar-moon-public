import { Link } from 'react-router-dom';

import customFieldName from '../../assets/docs/mapping/customFieldName.jpg';
import mappingLink from '../../assets/docs/mapping/mappingLink.jpg';
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
              default (
              <Link
                className='text-brand-primary underline'
                to='https://solarmoonanalytics.com/docs/deviceData'
              >
                see documentation here
              </Link>
              ), but if you are unable to change your device settings to match
              them, the platform can map to existing device config instead.
            </div>
          }
          title='What are mappings used for?'
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
              . There is also a link to mapping available on the top of the
              manage page.
              <img
                alt='brand'
                className='object-fill pe-8 ps-3 pt-4'
                src={mappingLink}
              />
            </div>
          }
          number={1}
          title='Adding custom mappings'
        />
        <Step
          content={
            <div>
              Under the{' '}
              <span
                className='font-bold
          text-brand-primary'
              >
                Mapping Name
              </span>{' '}
              field, enter the name your device is using for the data point.
              <br />
              <br />
              Note: mapping names need to be unique and cannot be duplicated.
              <img
                alt='brand'
                className='object-fill pe-8 ps-3 pt-4'
                src={customFieldName}
              />
            </div>
          }
          number={2}
          title='Choose custom field name'
        />
        <Step
          content={
            <div>
              From the attribute drop down, select which Solar Moon attribute
              field you would like to map the data into. Press the add button
              after choosing this to create the mapping. If there are any issues
              with the chosen values, error text will display underneath the
              field.
            </div>
          }
          number={3}
          title='Choose an attribute to map to'
        />
      </div>
    </div>
  );
}
