import Tilt from 'react-parallax-tilt';

import homeLogo from '../../assets/home-main.svg';
import Features from './Features';
import Type from './Type';

export default function Home() {
  return (
    <main className='home flex flex-col items-center bg-brand-primary-light p-12'>
      <div className='flex '>
        <div className='flex w-9/12 flex-col p-12'>
          <div className='mb-4 text-4xl font-bold'>
            Welcome to Solar Moon Analytics!
          </div>
          <div className='text-2xl font-bold'>
            Our platform empowers businesses to seamlessly oversee their solar
            energy infrastructure, offering an array of indispensable features,
            including:
          </div>
          <Type />
        </div>
        <div>
          <Tilt>
            <img
              alt='home pic'
              className='object-fill'
              src={homeLogo}
              style={{ maxHeight: '500px', height: '500px' }}
            />
          </Tilt>
        </div>
      </div>
      <div>
        {' '}
        <Features />
      </div>
    </main>
  );
}
