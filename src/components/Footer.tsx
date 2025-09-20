import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToApplyPage = () => {
    navigate('/apply');
    setTimeout(scrollToTop, 150);
  };

  const navigateToBlueprint = () => {
    navigate('/free-analysis');
    setTimeout(scrollToTop, 150);
  };

  const navigateToBacktestingMethod = () => {
    navigate('/backtesting-method');
    setTimeout(scrollToTop, 150);
  };

  const navigateToNewsletter = () => {
    navigate('/newsletter');
    setTimeout(scrollToTop, 150);
  };

  return (
    <footer className="bg-black border-t border-gray-700 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <button
            onClick={navigateToBlueprint}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Free Psychology Analysis
          </button>
          <button
            onClick={navigateToApplyPage}
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
          <button
            onClick={navigateToNewsletter}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Newsletter
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
