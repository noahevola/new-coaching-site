import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const navigateToHomeAndScroll = () => {
    navigate('/');
    setTimeout(() => {
      const formElement = document.getElementById('apply-now');
      if (formElement) {
        formElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // fallback: scroll to top if no form
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToBlueprint = () => {
    navigate('/free-analysis');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToBacktestingMethod = () => {
    navigate('/backtesting-method');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="border-t border-gray-700 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <button
            onClick={navigateToBlueprint}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Free Psychology Analysis
          </button>
          <button
            onClick={navigateToHomeAndScroll}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Apply
          </button>
          <button
            onClick={navigateToBacktestingMethod}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            7 Figure Backtesting Method
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;