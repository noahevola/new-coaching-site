// src/pages/apply.tsx
import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationForm from '../components/ApplicationForm';

export default function ApplyPage() {
  return (
    <>
      <Head>
        <title>Apply — Traders OS</title>
        <meta name="description" content="Apply for the OS Programme — fix your trading psychology." />
      </Head>

      <Header />

      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4 pt-8 md:pt-12 pb-12 md:pb-20">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
              <span className="bg-[#FFF041] text-black px-2 py-1">
                Apply to The OS Programme
              </span>
            </h1>
            <p className="mt-3 text-lg md:text-xl text-gray-300">
              Fill out the application below — only serious traders please.
            </p>
          </div>

          <div id="apply-form" style={{ scrollMarginTop: '100px' }}>
            <ApplicationForm />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
