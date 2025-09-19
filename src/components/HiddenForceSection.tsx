import React from 'react';

function HiddenForceSection() {
  return (
    <div className="mb-8 md:mb-16 px-4">
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 text-left leading-tight">
        <span className="bg-[#FFF041] text-black px-2 py-1">
          The Hidden Force Controlling You
        </span>
      </h3>
      
      <p className="text-base sm:text-lg md:text-xl text-white font-bold mb-8 md:mb-12 leading-relaxed">
        The world's best traders don't even realise it, but they're running on a completely different operating system than everyone else.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
        {/* Tablet 1 - What They Do */}
        <div className="border border-gray-700 rounded-lg p-4 md:p-6 bg-gray-900/50">
          <h5 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF3B30] mb-4">
            That OS is why they:
          </h5>
          <div className="space-y-3">
            <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
              Follow their plan under pressure.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              Stay disciplined without relying on willpower.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              Execute with clarity while everyone else breaks down.
            </p>
          </div>
        </div>
        
        {/* Tablet 2 - What It's Not */}
        <div className="border border-gray-700 rounded-lg p-4 md:p-6 bg-gray-900/50">
          <h5 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF9500] mb-4">
            It's not what you think:
          </h5>
          <div className="space-y-3">
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              It's not luck.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              It's not intelligence.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
              It's not even strategy.
            </p>
          </div>
        </div>
        
        {/* Tablet 3 - The Truth */}
        <div className="border border-gray-700 rounded-lg p-4 md:p-6 bg-gray-900/50">
          <h5 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4CD964] mb-4">
            The truth:
          </h5>
          <div className="space-y-3">
            <p className="text-sm sm:text-base md:text-lg text-white font-bold  leading-relaxed">
              It's the OS they're unknowingly running.
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-200">
        And until you upgrade yours, your results will always <span className="bg-[#FFF041] text-black px-2">snap back to your current default.</span>
      </p>
      
    </div>
  );
}

export default HiddenForceSection;