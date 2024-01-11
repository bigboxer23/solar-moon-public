import React from 'react';
import Typewriter from 'typewriter-effect';

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          'Real-time Analytics',
          'Historic Data',
          'Configurable Alerting',
          'Advanced Reporting',
          'Intelligence',
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
