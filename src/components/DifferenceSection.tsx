import React from 'react';

function DifferenceSection() {
  return (
    <div className="mb-8 md:mb-16 px-4">
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 text-left leading-tight">
        <span className="bg-[#FFF041] text-black px-2 py-1">
          The Difference Isn't Strategy
        </span>
      </h3>
      
      <p className="text-base sm:text-lg md:text-xl text-white font-bold  mb-8 md:mb-12 leading-relaxed">
        Right now, your trading success is like trying to hold a beach ball underwater. You can force it for a while - but the moment your focus slips, it shoots right back up. That's because your current psychology is your "water level." Until we reset and upgrade the OS, consistency will always feel like a fight.
      </p>
      
      <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
        This is why:
      </h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="border border-gray-700 rounded-lg p-4 md:p-6 bg-gray-900/50 flex items-center min-h-[100px] md:min-h-[120px]">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-[#FF3B30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              Working harder doesn't work
            </p>
          </div>
        </div>
        
        <div className="border border-gray-700 rounded-lg p-4 md:p-6 bg-gray-900/50 flex items-center min-h-[100px] md:min-h-[120px]">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-[#FF9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              New strategies don't work
            </p>
          </div>
        </div>
        
        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center min-h-[120px]">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-[#0022FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              You aren't disciplined
            </p>
          </div>
        </div>
        
        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center min-h-[120px]">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-[#D400DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              You keep looping back to old mistakes
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-base sm:text-lg md:text-xl text-white font-bold  mb-8 md:mb-12 leading-relaxed">
        You're trying to fix external results without upgrading the internal OS that controls them.  It's not your fault.  Every trader builds their psychology on half-truths, broken paradigms, and faulty code they picked up online.
      </p>
      
      <p className="text-base sm:text-lg md:text-xl text-white font-bold  mb-8 md:mb-12 leading-relaxed">
        You didn't choose this OS - it was installed in you.
      </p>
      
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        But now you have the chance to <span className="bg-[#FFF041] text-black px-2">upgrade it.</span>
      </p>
    </div>
  );
}

export default DifferenceSection;