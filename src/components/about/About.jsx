import React from 'react';

export default function About() {
  return (
    <main className='about flex flex-col items-center bg-brand-primary-light dark:bg-gray-950'>
      <div className='fade-in mx-2 my-8 max-w-[55rem] bg-white p-6 shadow-panel sm:mx-5 sm:rounded-lg sm:p-8 dark:bg-gray-800 dark:text-gray-100'>
        <div className='mb-8 flex justify-center text-4xl font-bold'>
          About 
          <span className='text-brand-primary'> Solar Moon Analytics</span>
        </div>
        <p>
          As a Minneapolis-based software development firm with a strong
          commitment to clean energy, we specialize in utilizing data and AI
          technologies to create top-tier solutions for maximizing the ROI of
          solar energy devices. Our mission is to lead the way in leveraging
          technology to make clean energy more accessible and efficient for
          everyone.
          <br />
          <br />
          <span className='text-lg font-bold text-brand-primary'>
            Location
          </span>{' '}
          Based in Minneapolis, Minnesota, our location reflects our commitment
          to serving both local and global markets.
          <br />
          <br />
          <span className='text-lg font-bold text-brand-primary'>
            Mission and Passion
          </span>{' '}
          Our core mission revolves around clean energy. We are deeply
          passionate about addressing environmental concerns and reducing the
          carbon footprint. This passion drives our teams to innovate and
          contribute to the clean energy sector.
          <br />
          <br />
          <span className='text-lg font-bold text-brand-primary'>
            Data and AI Expertise
          </span>{' '}
          At our core, we harness the potential of cutting-edge technologies. We
          specialize in data analytics and artificial intelligence (AI). These
          tools are pivotal in solving complex challenges.
          <br />
          <br />
          <span className='text-lg font-bold text-brand-primary'>
            Best-in-Class Solutions
          </span>{' '}
          We don&apos;t settle for mediocrity. Our commitment to excellence
          drives us to create industry-leading solutions. Our aim is to deliver
          tools and services that set a new standard.
          <br />
          <br />
          <span className='text-lg font-bold text-brand-primary'>
            Solar Energy Focus
          </span>{' '}
          We are particularly focused on solar energy. Solar power is a
          sustainable and renewable energy source that holds immense potential.
          We aim to optimize the benefits of solar energy by providing
          innovative software solutions.
          <br />
          <br />
          <span className='text-lg font-bold text-brand-primary'>
            ROI Enhancement
          </span>{' '}
          Our primary objective is to enhance the return on investment (ROI) for
          individuals and organizations investing in solar energy devices. We
          achieve this through data-driven insights and AI-driven optimizations.
        </p>
        <br />
        <br />
      </div>
    </main>
  );
}
