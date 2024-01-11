import React from 'react';

import Button from '../common/Button';

function PriceTile({
  label,
  label2,
  label3,
  count,
  setCount,
  priceId,
  price,
  checkoutClicked,
}) {
  return (
    <div className='price fade-in grow-1 m-3 mx-2 my-8 flex min-h-[17rem] w-full max-w-[17rem] flex-col rounded-lg bg-white p-8 shadow-panel sm:mx-5'>
      <div className='flex grow flex-col'>
        <div className='mb-3 flex items-center'>
          <div className='text-xl font-bold'>{label}</div>
          <div className='ps-2 text-gray-500'>{label3}</div>
        </div>
        <div className='mb-1 flex items-center'>
          <div className='text-lg'>${price} </div>
          <div className='ps-1 text-sm text-gray-500'>
            per seat per {label2}
          </div>
        </div>
        <div className='mb-1 flex items-center'>
          <div className='text-lg'>20</div>
          <div className='ps-1 text-sm text-gray-500'> devices per seat</div>
        </div>

        <div className='grow' />
        <Button
          className='mt-3 justify-center'
          onClick={() => checkoutClicked(priceId, count)}
          type='button'
          variant='primary'
        >
          Choose plan
        </Button>
      </div>
    </div>
  );
}
export default PriceTile;
