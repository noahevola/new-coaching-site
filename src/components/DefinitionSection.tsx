import React from 'react';

function DefinitionSection() {
  const scrollToForm = () => {
    const problemSection = document.getElementById('problem-section');
    if (problemSection) {
      problemSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="mb-12 md:mb-20 px-4">
      {/* Divider */}
      <div className="border-t border-gray-700 mb-8 md:mb-16"></div>
      
      {/* Definition text */}
      <div className="mt-8 md:mt-16 max-w-4xl mx-auto text-center">
        <div className="definition-block space-y-2 text-left bg-gray-900/50 border border-gray-700 rounded-lg p-4 md:p-8 max-w-2xl mx-auto">
          <h4 className="text-xl md:text-2xl font-bold text-white">operating system</h4>
          <p className="text-sm md:text-lg text-gray-400 italic">/ˈɒpəreɪtɪŋ sɪstɪm/</p>
          <p className="text-sm md:text-lg text-gray-400 italic">noun</p>
          <p className="text-sm md:text-lg text-gray-400 italic">noun: operating system; plural noun: operating systems</p>
          <p className="text-sm md:text-lg text-white mt-4">
            the primary software that allows a computer to operate, by managing programs, organizing tasks, and controlling hardware.
          </p>
        </div>
      </div>
      
      {/* Body text underneath */}
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <p className="text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed">
          In other words, your OS is the hidden code that runs every decision you make in the markets.
        </p>
        
        {/* Install OS Button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={scrollToForm}
            className="bg-[#FFF041] text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#E6D93A] transition-colors duration-200 flex items-center justify-center space-x-2 shadow-[0_0_60px_rgba(255,255,255,0.6)] w-fit"
          >
            <span>Why Is It Broken, And How Can I Fix It?</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DefinitionSection;
