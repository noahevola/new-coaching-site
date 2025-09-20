import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import VideoSection from '../components/VideoSection';
import CTAButton from '../components/CTAButton';
import StatusIndicators from '../components/StatusIndicators';
import TestimonialsSection from '../components/TestimonialsSection';
import DefinitionSection from '../components/DefinitionSection';
import ProblemSection from '../components/ProblemSection';
import ReasonSection from '../components/ReasonSection';
import HiddenForceSection from '../components/HiddenForceSection';
import DifferenceSection from '../components/DifferenceSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter'; // popup component

function TradersOSPage() {
  const navigate = useNavigate();

  // navigate to /apply and then scroll to top of that page
  const goToApplyPage = useCallback(() => {
    navigate('/apply');
    // give the router a moment to switch pages, then scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
  }, [navigate]);

  return (
    <>
      <Header onApplyClick={goToApplyPage} />

      <div className="bg-black text-white overflow-x-hidden min-h-screen">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4 pt-0 md:pt-0 pb-6 md:pb-12">
          
          {/* Status Indicator without top arrows */}
          <div className="relative flex items-center justify-center mb-6 md:mb-8 w-fit mx-auto">
            {/* Pill */}
            <div className="flex items-center space-x-2 bg-[#1E1E1E] rounded-lg py-2 px-3 md:px-4 transform transition-all duration-200 hover:bg-[#2A2A2A] hover:scale-105 cursor-pointer">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm md:text-lg text-white">
                TRADERS WHO NEED TO SEE A CHANGE THIS MONTH...
              </span>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Video Section */}
          <VideoSection />

          {/* First CTA Button (with inward arrows) */}
          <div className="my-6 md:my-12 px-4">
            <div className="relative w-fit mx-auto">
              {/* Left Arrow → */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none"
              >
                <path
                  d="M4 12h16M14 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <CTAButton onClick={goToApplyPage} />

              {/* Right Arrow ← */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none"
              >
                <path
                  d="M20 12H4m6-6l-6 6 6 6"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Status Indicators */}
          <StatusIndicators />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Definition Section */}
          <DefinitionSection />

          {/* Divider */}
          <div id="problem-section" className="border-t border-gray-700 mb-8 md:mb-16 mx-4" />

          {/* Problem Section */}
          <ProblemSection />

          {/* Final CTA Button (plain) */}
          <div className="flex justify-start mt-8 md:mt-16 px-4">
            <CTAButton onClick={goToApplyPage} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />

          {/* The Reason Section */}
          <ReasonSection />

          {/* Divider */}
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />

          {/* The Hidden Force Section */}
          <HiddenForceSection />

          {/* Bottom CTA Button (plain) */}
          <div className="flex justify-start mt-8 md:mt-16 px-4">
            <CTAButton onClick={goToApplyPage} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />

          {/* The Difference Section */}
          <DifferenceSection />

          {/* Bottom CTA Button (plain) */}
          <div className="flex justify-start mt-8 md:mt-16 px-4">
            <CTAButton onClick={goToApplyPage} />
          </div>

          {/* Removed the application form from the homepage */}
          {/* If you want a link anchor here, keep it, otherwise remove entirely. */}
          <div className="border-t border-gray-700 my-8 md:my-16 mx-4" />
        </div>

        {/* Newsletter popup component (renders its own trigger & modal) */}
        <Newsletter />

        <Footer />
      </div>
    </>
  );
}

export default TradersOSPage;
