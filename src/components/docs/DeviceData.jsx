import { Link } from 'react-router-dom';

import Step from './Step';

export default function DeviceData() {
  return (
    <div>
      <div className='mb-8 flex text-2xl font-bold sm:text-4xl'>
        Understanding data collected from devices
      </div>
      <div>
        <Step
          content={
            <div>
              <div className='align-self-start mb-4 text-black dark:text-neutral-100'>
                Solar Moon collects 5 specific fields from each device to
                display data and manage alerts. The 5 primary fields collected
                are:
              </div>
              <div className='mb-4 ms-4'>
                <ul className='list-disc'>
                  <li>
                    Current{' '}
                    <span className='text-xs  text-text-secondary'>A</span>
                  </li>
                  <li>
                    Voltage{' '}
                    <span className='text-xs text-text-secondary'>V</span>
                  </li>
                  <li>System Power Factor</li>
                  <li>
                    Energy Consumption{' '}
                    <span className='text-xs text-text-secondary'>kWH</span>
                  </li>
                  <li>
                    Real Power{' '}
                    <span className='text-xs text-text-secondary'>kW</span>
                  </li>
                </ul>
              </div>
            </div>
          }
          title='Fields collected'
        />
        <Step
          content={
            <div>
              <div className='align-self-start mb-4 text-black dark:text-neutral-100'>
                By default Solar Moon will look for data from the devices with
                the above names. However, there are a number of additional
                accepted names for these fields:
              </div>
              <div className='mb-4 ms-4'>
                <ul className='list-disc'>
                  <li>
                    Current
                    <ul className='list-inside list-disc pl-4'>
                      <li>Average Current</li>
                      <li>I a</li>
                    </ul>
                  </li>
                  <li>
                    Voltage
                    <ul className='list-inside list-disc pl-4'>
                      <li>Average Voltage (L-N)</li>
                      <li>Voltage, Line to Neutral</li>
                      <li>Vll ab</li>
                    </ul>
                  </li>
                  <li>
                    System Power Factor
                    <ul className='list-inside list-disc pl-4'>
                      <li>Total (System) Power Factor</li>
                      <li>Power Factor</li>
                      <li>PF sign tot</li>
                      <li>Total System Power Factor</li>
                    </ul>
                  </li>
                  <li>
                    Energy Consumption
                    <ul className='list-inside list-disc pl-4'>
                      <li>Total Energy Consumption</li>
                      <li>kWh del+rec</li>
                    </ul>
                  </li>
                  <li>
                    Real Power
                    <ul className='list-inside list-disc pl-4'>
                      <li>Total Real Power</li>
                    </ul>
                  </li>
                </ul>
              </div>
              If your devices are using different labels for these fields, see
              documentation for{' '}
              <Link
                className='text-brand-primary underline'
                to='https://solarmoonanalytics.com/docs/mapping'
              >
                mapping device data
              </Link>
                for custom mapping solutions.
            </div>
          }
          title='Additionally mapped field names'
        />
      </div>
    </div>
  );
}
