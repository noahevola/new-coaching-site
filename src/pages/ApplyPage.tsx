import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationForm from '../components/ApplicationForm';

export default function ApplyPage() {
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState<string>('direct');

  useEffect(() => {
    // Get source from URL params
    const urlSource = searchParams.get('source');
    if (urlSource) {
      setSource(urlSource);
      try {
        sessionStorage.setItem('applicationSource', urlSource);
      } catch (e) {
        // ignore if sessionStorage is unavailable
      }
    } else {
      // Check sessionStorage for source if no URL param
      try {
        const sessionSource = sessionStorage.getItem('applicationSource');
        if (sessionSource) {
          setSource(sessionSource);
        }
      } catch (e) {
        // ignore if sessionStorage is unavailable
      }
    }
  }, [searchParams]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            <span className="bg-[#FFF041] text-black px-2 py-1">
              Apply To The OS Programme
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white font-bold">
            The OS Programme is currently in beta - which means it's the cheapest it will ever be. Limited spaces, I can only take on a few people.
          </p>
        </div>
        <section id="apply-form" style={{ scrollMarginTop: '100px' }}>
          <ApplicationForm source={source} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
