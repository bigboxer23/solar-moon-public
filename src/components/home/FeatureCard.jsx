import React from 'react';

export default function FeatureCard(props) {
  return (
    <div className='m-4 flex w-80 flex-col items-center border-2 p-8'>
      <img className='mb-4 w-48' src={props.imgPath} />
      <div>
        <div className='mb-4 text-2xl font-bold text-brand-primary'>
          {props.title}
        </div>
        <div>{props.description}</div>
      </div>
    </div>
  );
}
