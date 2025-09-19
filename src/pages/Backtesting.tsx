import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";

export default function BacktestingPage() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/5rsdk3uh34.js";
    script2.type = "module";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="bg-black text-white overflow-x-hidden min-h-screen">
        <div className="container mx-auto px-2 sm:px-4 py-6 md:py-12 max-w-6xl text-center">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            <span className="bg-[#FFF041] text-black px-2 py-1">
              The 7-Figure Backtesting Method
            </span>
          </h1>

          {/* Subheading */}
          <h2 className="text-base md:text-lg lg:text-xl text-white font-bold max-w-2xl mx-auto">
            Unlock the missing foundation every trader needs: true understanding of your system.
          </h2>

          {/* Embed */}
          <div className="flex justify-center mt-10">
            <div className="relative aspect-[16/9] bg-neutral-200 w-full max-w-[614px] rounded-2xl border border-neutral-700 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <style>
                {`
                  wistia-player[media-id='5rsdk3uh34']:not(:defined) {
                    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/5rsdk3uh34/swatch');
                    display: block;
                    filter: blur(5px);
                    padding-top: 56.25%;
                  }
                `}
              </style>
              <wistia-player media-id="5rsdk3uh34" seo="false" aspect="1.7777777777777777" />
            </div>
          </div>

          {/* Paragraph */}
          <p className="text-base md:text-lg lg:text-xl text-white font-bold mx-auto mt-10">
            The proven backtesting method – taken directly from my high-level OS program – gives you a simple,
            repeatable process to build clarity, connect knowledge to execution, and finally trade with consistency.
            If you’ve been stuck spinning your wheels, this is the fastest, most affordable way to create the
            breakthrough you’ve been chasing.
          </p>

          {/* Button */}
          <div className="mt-10 flex justify-center">
            <a
              href="https://whop.com/checkout/2wFd06AV4cVR4PfZNT-juGc-slTz-5d55-7LVX1yV0U3qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFF041] text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl 
                         px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#E6D93A] 
                         transition-colors duration-200 flex items-center justify-center space-x-2 
                         shadow-[0_0_60px_rgba(255,255,255,0.6)] w-fit"
            >
              <span>Buy The Method</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
