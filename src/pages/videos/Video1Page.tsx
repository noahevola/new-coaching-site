import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import VideoSection from '../../components/VideoSection';
import StatusIndicators from '../../components/StatusIndicators';
import TestimonialsSection from '../../components/TestimonialsSection';
import DefinitionSection from '../../components/DefinitionSection';
import ProblemSection from '../../components/ProblemSection';
import ReasonSection from '../../components/ReasonSection';
import HiddenForceSection from '../../components/HiddenForceSection';
import DifferenceSection from '../../components/DifferenceSection';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';

interface InlineCTAProps {
  text?: string;
  className?: string;
}

function InlineCTA({ text = 'Install The OS', className = '' }: InlineCTAProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    try { sessionStorage.setItem('applicationSource', 'video-1'); } catch {}
    navigate('/apply?source=video-1');
    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 120);
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

function Video1Page() {
  const navigate = useNavigate();
  const goToApplyPage = useCallback(() => {
    try { sessionStorage.setItem('applicationSource', 'video-1'); } catch {}
    navigate('/apply?source=video-1');
    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 120);
  }, [navigate]);

  return (
    <>
      <Header onApplyClick={goToApplyPage} />
      <div className="bg-black text-white overflow-x-hidden min-h-screen">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4 pt-0 md:pt-0 pb-6 md:pb-12">
          <div className="relative flex items-center justify-center mb-6 md:mb-8 w-fit mx-auto">
            <div className="flex items-center space-x-2 bg-[#1E1E1E] rounded-lg py-2 px-3 md:px-4 transform transition-all duration-200 hover:bg-[#2A2A2A] hover:scale-105 cursor-pointer">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm md:text-lg text-white">
                TRADERS WHO NEED TO SEE A CHANGE THIS MONTH...
              </span>
            </div>
          </div>

          <HeroSection />
          <VideoSection />

          <div className="my-6 md:my-12 px-4">
            <div className="relative w-fit mx-auto">
              <svg className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M4 12h16M14 6l6 6-6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <InlineCTA />
              <svg className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 12H4m6-6l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <StatusIndicators />
          <TestimonialsSection />
          <DefinitionSection />
          <div id="problem-section" className="border-t border-gray-700 mb-8 md:mb-16 mx-4" />
          <ProblemSection />
          <div className="flex justify-start mt-8 md:mt-16 px-4"><InlineCTA /></div>
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
          <ReasonSection />
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
          <HiddenForceSection />
          <div className="flex justify-start mt-8 md:mt-16 px-4"><InlineCTA /></div>
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
          <DifferenceSection />
          <div className="flex justify-start mt-8 md:mt-16 px-4"><InlineCTA /></div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default Video1Page;
