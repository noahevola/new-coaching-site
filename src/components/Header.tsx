import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  showApplyButton?: boolean;
  onApplyClick?: () => void;
}

function Header({
  title = "OS Programme 1.0",
  showApplyButton = true,
  onApplyClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToApplyPage = () => {
    setIsMenuOpen(false);
    navigate("/apply");
    setTimeout(scrollToTop, 150);
  };

  const navigateToHomeTop = () => {
    navigate("/");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  const navigateToFreeAnalysis = () => {
    navigate("/free-analysis");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  const navigateToBacktestingMethod = () => {
    navigate("/backtesting-method");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  const navigateToNewsletter = () => {
    navigate("/newsletter");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  return (
    <>
      {/* Msg me on bar */}
      <div className="w-full bg-gray-900 text-gray-200 text-sm py-2 flex justify-center gap-4">
        <span className="font-medium">Msg me on:</span>
        <button className="hover:text-[#FFF041] transition-colors">X</button>
        <button className="hover:text-[#FFF041] transition-colors">Telegram</button>
      </div>

      <header className="sticky top-0 h-[100px] flex items-center relative z-50 bg-black w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/Group 59.png)" }}
        />

        {/* Burger Menu */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-[#FFF041] transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full mt-2 left-0 bg-black border border-gray-700 rounded-lg shadow-xl min-w-[200px] overflow-hidden z-[9999]">
              <button
                onClick={navigateToApplyPage}
                className="w-full px-4 py-3 text-left text-[#FFF041] hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 border-b border-gray-700 font-bold"
              >
                Apply
              </button>
              <button
                onClick={navigateToFreeAnalysis}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 border-b border-gray-700 font-bold"
              >
                Get Your Free Analysis
              </button>
              <button
                onClick={navigateToBacktestingMethod}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 border-b border-gray-700 font-bold"
              >
                7 Figure Backtesting Method
              </button>
              <button
                onClick={navigateToNewsletter}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 font-bold"
              >
                Newsletter
              </button>
            </div>
          )}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 w-full h-full flex items-center justify-between px-4">
          <div className="w-[120px] hidden md:block" />
          <h1
            onClick={navigateToHomeTop}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-center flex-1 cursor-pointer hover:text-[#FFF041] transition-colors duration-200"
          >
            {title}
          </h1>

          <div className="text-right hidden md:block">
            {showApplyButton && (
              <span
                onClick={navigateToFreeAnalysis}
                className="bg-[#FFF041] text-black px-3 py-1 text-xl md:text-2xl font-bold cursor-pointer hover:bg-[#E6D93A] transition-colors duration-200"
              >
                Free Analysis
              </span>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

