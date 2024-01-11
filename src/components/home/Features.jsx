import React from 'react';

import aggregation from '../../assets/aggregation.svg';
import alerting from '../../assets/alerting.svg';
import configurable from '../../assets/configurable.svg';
import dataView from '../../assets/data-view.svg';
import exportData from '../../assets/export.svg';
import logo from '../../assets/logo.svg';
import reporting from '../../assets/reporting.svg';
import FeatureCard from './FeatureCard';

export default function Features() {
  return (
    <div className='max-w-[75rem] p-4 sm:p-12'>
      <div className='flex flex-wrap items-center text-xl font-bold sm:flex-nowrap sm:text-4xl'>
        <div className='me-4 w-8 sm:w-24'>
          <img alt='brand' className='object-fill' src={logo} />
        </div>
        <span className='whitespace-nowrap text-brand-primary'>
          {' '}
          Solar Moon Analytics 
        </span>{' '}
        Features
      </div>
      <div className='my-8 flex flex-wrap sm:my-12'>
        <FeatureCard
          description='Solar Moon Analytics provides the capability to manage a multitude of devices seamlessly.
              Devices can be grouped together into virtual sites, allowing them to be organized logically and efficiently.
              All these devices and virtual sites are accessible through a single, unified dashboard. This central hub simplifies managing your devices.'
          imgPath={aggregation}
          isBlog={false}
          title='Aggregation'
        />

        <FeatureCard
          description='Dashboards can be tailored to meet your specific needs, whether you want to monitor individual devices, or aggregated sites. Virtual devices provide collected views of specific clusters or sites, so larger trends can be surfaced.'
          imgPath={configurable}
          isBlog={false}
          title='Flexibility'
        />

        <FeatureCard
          description='Explore live data from all your devices in a tabular format. This real-time view allows you to monitor the current status and performance of your devices. Filter down by time period, site or individual devices.'
          imgPath={dataView}
          isBlog={false}
          title='Live Data Browsing'
        />

        <FeatureCard
          description='All collected data is available for export. Anything shown in the live data view can be exported into csv format. Reports can be useful for external analysis, compliance reporting, and decision-making.'
          imgPath={exportData}
          isBlog={false}
          title='Historic Data Export'
        />

        <FeatureCard
          description="Receive timely alerts via email when our system detects anomalies or irregularities in device behavior. Customize alert thresholds to match your specific requirements. This ensures that you're only notified when deviations from normal operation warrant attention."
          imgPath={alerting}
          isBlog={false}
          title='Alerting'
        />

        <FeatureCard
          description='Automatically generate and receive emailed digests of device information at regular intervals. Reports include key data points and insights, enabling assessment of the efficiency and profitability of your devices, as well as helping track the return on investment (ROI) of devices.'
          imgPath={reporting}
          isBlog={false}
          title='Reporting'
        />
      </div>
    </div>
  );
}
