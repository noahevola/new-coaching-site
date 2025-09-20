// src/pages/ApplyPage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationForm from '../components/ApplicationForm';

export default function ApplyPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            <span className="bg-[#FFF041] text-black px-2 py-1">
              Join The OS Programme
            </span>
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-300">
            The OS Programme is currently in beta - which means it's the cheapest it will ever be.  Limited spaces, I can only take on a few people.
          </p>
        </div>

        <section id="apply-form" style={{ scrollMarginTop: '100px' }}>
          <ApplicationForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
