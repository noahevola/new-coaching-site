import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function TradersOS() {
  return (
    <>
      <Header title="Traders OS" showApplyButton={false} />
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Blank page content goes here */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TradersOS;