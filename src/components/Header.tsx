import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When user clicks Apply:
  // - If parent provided onApplyClick AND we are on the homepage ("/"), call it (scroll behavior).
  // - Otherwise navigate to /apply and then scroll to top.
  const handleApplyClick = () => {
    setIsMenuOpen(false);

    if (onApplyClick && location.pathname === "/") {
      onApplyClick();
      return;
    }

    navigate("/apply");
    setTimeout(scrollToTop, 150);
  };

  const navigateToHomeTop = () => {
    navigate("/");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  // Top-right / dropdown Free Analysis should go to /blueprint
  const navigateToBlueprint = () => {
    navigate("/blueprint");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  const navigateToBacktestingMethod = () => {
    navigate("/backtesting-method");
    setIsMenuOpen(false);
    setTimeout(scrollToTop, 150);
  };

  return (
    <header className="sticky top-0 h-[100px] flex items-center relative z-50 bg-black w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/Group 59.png)" }}
      ></div>

      {/* Burger Menu */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:text-[#FFF041] transition-colors duration-200"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full mt-2 left-0 bg-black border border-gray-700 rounded-lg shadow-xl min-w-[200px] overflow-hidden z-[9999]">
            {/* APPLY -> navigate to /apply (or call onApplyClick on homepage) */}
            <button
              onClick={handleApplyClick}
              className="w-full px-4 py-3 text-left text-[#FFF041] hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 border-b border-gray-700 font-bold"
            >
              Apply
            </button>

            {/* Free Analysis -> /blueprint */}
            <button
              onClick={navigateToBlueprint}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 border-b border-gray-700 font-bold"
            >
              Get Your Free Analysis
            </button>

            <button
              onClick={navigateToBacktestingMethod}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 hover:text-[#FFF041] transition-colors duration-200 font-bold"
            >
              7 Figure Backtesting Method
            </button>
          </div>
        )}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex items-center justify-between px-4">
        <div className="w-[120px] hidden md:block"></div>

        <h1
          onClick={navigateToHomeTop}
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-center flex-1 cursor-pointer hover:text-[#FFF041] transition-colors duration-200"
        >
          {title}
        </h1>

        <div className="text-right hidden md:block">
          {showApplyButton && (
            // TOP-RIGHT: Free Analysis (navigates to /blueprint)
            <span
              onClick={navigateToBlueprint}
              className="bg-[#FFF041] text-black px-3 py-1 text-xl md:text-2xl font-bold cursor-pointer hover:bg-[#E6D93A] transition-colors duration-200"
            >
              Free Analysis
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
