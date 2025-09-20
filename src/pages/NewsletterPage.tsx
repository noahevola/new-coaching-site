// src/pages/NewsletterPage.tsx
import React from 'react';
import Newsletter from '../components/Newsletter';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NewsletterPage() {
  return (
    <>
      <Header showApplyButton={true} />
      
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Join The Daily Dose
        </h1>

        {/* Embedded newsletter form */}
        <Newsletter embedded={true} />

      </div>

      <Footer />
    </>
  );
}

export default NewsletterPage;
