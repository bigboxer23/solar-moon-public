import React, { useState } from 'react';

import PriceTile from './PriceTile';

export default function PricingPage() {
  const [monCount, setMonCount] = useState(1);
  const [yearCount, setYearCount] = useState(1);

  const checkoutClicked = () => {
    window.location.href = 'https://app.solarmoonanalytics.com';
  };

  return (
    <main className='pricing-page mx-2 flex flex-col items-center bg-brand-primary-light sm:mx-5'>
      <div className='my-8 flex text-4xl font-bold'>
        Choose a <span className='text-brand-primary'>Plan</span>
      </div>
      <div className='my-8 flex max-w-full flex-col items-center'>
        <div className='flex w-full flex-wrap justify-center'>
          <PriceTile
            checkoutClicked={checkoutClicked}
            count={monCount}
            label='Monthly'
            label2='mo'
            label3=''
            price={40}
            priceId={process.env.REACT_APP_PRICE_MO}
            setCount={setMonCount}
          />
          <PriceTile
            checkoutClicked={checkoutClicked}
            count={yearCount}
            label='Yearly'
            label2='yr'
            label3='Save 10%!'
            price={432}
            priceId={process.env.REACT_APP_PRICE_YR}
            setCount={setYearCount}
          />
        </div>
        <div className='fade-in my-8 w-[25rem] max-w-full rounded-lg bg-white p-6 shadow-panel sm:w-[55rem] sm:p-8'>
          <div>
            <div className='align-self-start mb-4 text-lg font-bold'>
              Plans include
            </div>
            <div className='ms-4 text-gray-500'>
              <ul className='list-disc'>
                <li>Up to 20 devices per seat</li>
                <li>Site level data via virtual devices</li>
                <li>Live data reporting</li>
                <li>Historic data export</li>
                <li>Device alerting via email</li>
                <li>Periodic account digest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
