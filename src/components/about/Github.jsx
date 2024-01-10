import React from 'react';
import GitHubCalendar from 'react-github-calendar';

const minimalTheme = {
  dark: ['#ebebeb', '#354068', '#405081', '#4a6098', '#556fb1'],
  light: ['#ebebeb', '#354068', '#405081', '#4a6098', '#556fb1'],
  // for `dark` the default theme will be used
};
export default function Github({ className }) {
  return (
    <div className={className + ' github hidden sm:flex flex-col items-center'}>
      <div className='mb-8 flex flex-col items-center'>
        <div className='text-2xl font-bold text-brand-primary'>
          Platform Contributions
        </div>
      </div>
      <GitHubCalendar
        blockMargin={4}
        blockSize={8}
        color='#5178c2'
        fontSize={12}
        hideTotalCount={true}
        theme={minimalTheme}
        username='bigboxer23'
      />
    </div>
  );
}
