import React from 'react';
import { Brain, TrendingDown, HelpCircle, Zap, RotateCcw } from 'lucide-react';

function ProblemSection() {
  return (
    <div className="mb-8 md:mb-16 px-4">
      {/* Intro */}
      <div className="text-left mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight">
          <span className="bg-[#FFF041] text-black px-2 inline">
            You've Done Everything Right, But Things Are Still Going Wrong...
          </span>
        </h3>

        <div className="space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed">
            You've been trading for months, maybe years. You've learned strategies, studied courses, maybe passed phases of challenges. And STILL, it isn't clicking.
          </p>
        </div>
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16 relative">
        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center space-x-4 min-h-[120px]">
          <Brain className="w-8 h-8 text-[#FF3B30] flex-shrink-0" />
          <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-tight text-left">
            You know your system... but you don't follow it.
          </p>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center space-x-4 min-h-[120px]">
          <TrendingDown className="w-8 h-8 text-[#FF9500] flex-shrink-0" />
          <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-tight text-left">
            You work harder than ever, but your results stay the same.
          </p>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center space-x-4 min-h-[120px]">
          <HelpCircle className="w-8 h-8 text-[#FFF041] flex-shrink-0" />
          <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-tight text-left">
            Deep down, you wonder if you're even cut out for this.
          </p>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center space-x-4 min-h-[120px]">
          <Zap className="w-8 h-8 text-[#0022FF] flex-shrink-0" />
          <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-tight text-left">
            The pressure to perform makes every trade feel heavier.
          </p>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 flex items-center space-x-4 min-h-[120px]">
          <RotateCcw className="w-8 h-8 text-[#D400DB] flex-shrink-0" />
          <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-tight text-left">
            Each week feels like starting from zero, stuck in the same cycles.
          </p>
        </div>
      </div>

      {/* Final Message */}
      <div className="w-full">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-left max-w-none">
          I was in your exact position two years ago. I fixed it, and so can you. Except you can
          <span className="bg-[#FFF041] text-black font-bold px-2 inline">
          skip the pain I went through to get there.
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProblemSection;