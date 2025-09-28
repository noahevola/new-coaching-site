import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [source, setSource] = useState<string | null>(null);

  const extractSourceFromSearch = (search: string) => {
    const params = new URLSearchParams(search);
    return (
      params.get("source") ||
      params.get("utm_source") ||
      params.get("ref") ||
      null
    );
  };

  const appendSourceToPath = (path: string) => {
    if (!source) return path;
    const url = new URL(path, window.location.origin);
    url.searchParams.set("source", source);
    return `${url.pathname}${url.search}${url.hash}`;
  };

  useEffect(() => {
    const found = extractSourceFromSearch(location.search);
    if (found) {
      setSource(found);
      sessionStorage.setItem("source", found);
      return;
    }

    const fromSession = sessionStorage.getItem("source");
    if (fromSession) {
      setSource(fromSession);
      return;
    }

    try {
      const ref = document.referrer;
      if (ref) {
        const refUrl = new URL(ref);
        const refSource = refUrl.hostname;
        setSource(refSource);
        sessionStorage.setItem("source", refSource);
      }
    } catch {
      // ignore
    }
  }, [location.search]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToApplyPage = () => {
    navigate(appendSourceToPath("/apply"));
    setTimeout(scrollToTop, 150);
  };

  const navigateToBlueprint = () => {
    navigate(appendSourceToPath("/free-analysis"));
    setTimeout(scrollToTop, 150);
  };

  const navigateToBacktestingMethod = () => {
    navigate(appendSourceToPath("/backtesting-method"));
    setTimeout(scrollToTop, 150);
  };

  const navigateToNewsletter = () => {
    navigate(appendSourceToPath("/newsletter"));
    setTimeout(scrollToTop, 150);
  };

  return (
    <footer className="bg-black border-t border-gray-700 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <button
            onClick={navigateToBlueprint}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Free Psychology Analysis
          </button>
          <button
            onClick={navigateToApplyPage}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Apply
          </button>
          <button
            onClick={navigateToBacktestingMethod}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            7 Figure Backtesting Method
          </button>
          <button
            onClick={navigateToNewsletter}
            className="text-white text-base md:text-lg font-bold hover:text-[#FFF041] transition-colors duration-200"
          >
            Newsletter
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
