
import React from 'react';

function HeroSection() {
  return (
    <div className="text-center mb-4 relative overflow-hidden px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight">
        <span
          className="inline-block box-decoration-clone"
          style={{
            WebkitBoxDecorationBreak: 'clone',
            boxDecorationBreak: 'clone',
            backgroundColor: '#FFF041',
            color: '#000',
            lineHeight: '1.1',
            padding: '0.03em 0.20em', // shorter vertical pad
          }}
        >
          The Hidden OS Top Traders Run On
        </span>{' '}
        Without Even Realising - And Exactly How You Can Install It To Trade With Discipline And Clarity{' '}
        <span
          className="inline-block box-decoration-clone"
          style={{
            WebkitBoxDecorationBreak: 'clone',
            boxDecorationBreak: 'clone',
            backgroundColor: '#FFF041',
            color: '#000',
            lineHeight: '1.1',
            padding: '0.03em 0.20em',
          }}
        >
          In Just 12 Weeks
        </span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto -mt-2 mb-4 font-light">
        <span className="block">
          Drawn from the subconscious patterns the best traders rely on — reverse-engineered into the OS Programme 1.0...
        </span>
      </p>
      {/* Arrow Images pointing down */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute left-2 sm:left-4 md:left-8">
          <img
            src="/Group 56 copy.png"
            alt="Left arrow pointing down"
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
          />
        </div>
        <div className="absolute right-4 sm:right-8 md:right-16">
          <img
            src="/Group 58 copy.png"
            alt="Right arrow pointing down"
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
