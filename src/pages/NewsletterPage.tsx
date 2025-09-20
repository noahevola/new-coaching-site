// src/pages/NewsletterPage.tsx
import React from 'react';
import Newsletter from '../components/Newsletter';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NewsletterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header showApplyButton={true} />

      {/* Heading & Subheading */}
      <div className="text-center mt-8 px-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">
          <span className="bg-[#FFF041] text-black px-2 py-1">Join My Free Newsletter</span>
        </h3>
        <p className="mt-3 text-lg font-semibold">
          Daily wisdom to speedrun trading psychology
        </p>
      </div>

      {/* Newsletter Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Newsletter embedded={true} />
      </div>

      <Footer />
    </div>
  );
}

export default NewsletterPage;
