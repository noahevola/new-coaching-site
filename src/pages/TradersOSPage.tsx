// src/pages/TradersOSPage.tsx
import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import VideoSection from '../components/VideoSection';
import StatusIndicators from '../components/StatusIndicators';
import TestimonialsSection from '../components/TestimonialsSection';
import DefinitionSection from '../components/DefinitionSection';
import ProblemSection from '../components/ProblemSection';
import ReasonSection from '../components/ReasonSection';
import HiddenForceSection from '../components/HiddenForceSection';
import DifferenceSection from '../components/DifferenceSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

function InlineApplyCTA({ className = '' }: { className?: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Resolve source from sessionStorage first (set by VideoToHomeCTA or by landing with ?source=...)
    let finalSource = 'home';
    try {
      const sessionSource = sessionStorage.getItem('applicationSource');
      if (sessionSource && sessionSource.trim() !== '') {
        finalSource = sessionSource;
      }
    } catch (e) {
      // ignore sessionStorage errors
    }

    // Always navigate with explicit query param so Apply page URL is clear
    navigate(`/apply?source=${encodeURIComponent(finalSource)}`);

    // scroll a moment after route changes
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 120);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-[#FFF041] text-black font-bold px-4 py-3 rounded-lg flex items-center space-x-2 ${className}`}
    >
      <span>Install The OS</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

export default function TradersOSPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // On mount, if the URL contains ?source=..., persist it to sessionStorage
  useEffect(() => {
    try {
      const urlSource = searchParams.get('source');
      if (urlSource && urlSource.trim() !== '') {
        sessionStorage.setItem('applicationSource', urlSource.trim());
      }
    } catch (e) {
      // ignore
    }
  }, [searchParams]);

  // Header prop handler: will forward whatever is in sessionStorage (fall back to 'home')
  const goToApplyPage = useCallback(() => {
    let finalSource = 'home';
    try {
      const sessionSource = sessionStorage.getItem('applicationSource');
      if (sessionSource && sessionSource.trim() !== '') finalSource = sessionSource;
    } catch (e) {}
    navigate(`/apply?source=${encodeURIComponent(finalSource)}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 120);
  }, [navigate]);

  return (
    <>
      <Header onApplyClick={goToApplyPage} />

      <div className="bg-black text-white overflow-x-hidden min-h-screen">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4 pt-0 md:pt-0 pb-6 md:pb-12">
          
          {/* Status Indicator */}
          <div className="relative flex items-center justify-center mb-6 md:mb-8 w-fit mx-auto">
            <div className="flex items-center space-x-2 bg-[#1E1E1E] rounded-lg py-2 px-3 md:px-4 transform transition-all duration-200 hover:bg-[#2A2A2A] hover:scale-105 cursor-pointer">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm md:text-lg text-white">TRADERS WHO NEED TO SEE A CHANGE THIS MONTH...</span>
            </div>
          </div>

          <HeroSection />
          <VideoSection />

          {/* CTA area */}
          <div className="my-6 md:my-12 px-4">
            <div className="relative w-fit mx-auto">
              {/* left icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
                <path d="M4 12h16M14 6l6 6-6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <InlineApplyCTA />

              {/* right icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
                <path d="M20 12H4m6-6l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <StatusIndicators />
          <TestimonialsSection />
          <DefinitionSection />

          <div id="problem-section" className="border-t border-gray-700 mb-8 md:mb-16 mx-4" />
          <ProblemSection />

          {/* More CTAs on page - all use same InlineApplyCTA */}
          <div className="flex justify-start mt-8 md:mt-16 px-4"><InlineApplyCTA /></div>

          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
          <ReasonSection />

          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
          <HiddenForceSection />

          <div className="flex justify-start mt-8 md:mt-16 px-4"><InlineApplyCTA /></div>

          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
          <DifferenceSection />

          <div className="flex justify-start mt-8 md:mt-16 px-4"><InlineApplyCTA /></div>
        </div>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}



