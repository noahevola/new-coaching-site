import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

function CTAButton({ text = "Install The OS", className = "", onClick }: CTAButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`bg-[#FFF041] text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#E6D93A] transition-colors duration-200 flex items-center justify-center space-x-2 shadow-[0_0_60px_rgba(255,255,255,0.6)] w-fit ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}

export default CTAButton;