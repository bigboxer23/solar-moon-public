import Tilt from 'react-parallax-tilt';

import homeLogo from '../../assets/home-main.svg';
import Features from './Features';
import Type from './Type';

export default function Home() {
  return (
    <main className='home flex w-full flex-col items-center bg-brand-primary-light p-2 sm:p-12'>
      <div className='flex max-w-[75rem]'>
        <div className='flex w-full min-w-80 flex-col p-4 sm:w-9/12 sm:p-12'>
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
        <div className='hidden w-80 sm:flex'>
          <Tilt>
            <img alt='home pic' className='object-fill' src={homeLogo} />
          </Tilt>
        </div>
      </div>
      <Features />
    </main>
  );
}
