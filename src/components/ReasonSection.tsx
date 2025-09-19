import React from 'react';
import { AlertTriangle, Cpu, MousePointer, RefreshCw, CheckCircle, Briefcase, BookOpen, Zap } from 'lucide-react';

function ReasonSection() {
  return (
    <div className="mb-8 relative px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="bg-white rounded-full w-2 h-2 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 text-left leading-tight">
          <span className="bg-[#FFF041] text-black px-2 py-1">
            The Reason Is Not What You Think...
          </span>
        </h3>
      
        {/* Enhanced Text Layout */}
        <div className="space-y-6">
          {/* Opening Statement with Visual Emphasis */}
          <p className="text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed">
            Getting another strategy... Studying more charts... Even meditating longer... None of it will fix this.
          </p>
          
          {/* Computer Analogy Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 min-h-[160px] flex items-center">
              <div className="flex items-center space-x-4">
                <MousePointer className="w-8 h-8 text-[#FF9500] flex-shrink-0 mt-1" />
                <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
                  Right now, you're trying to fix a crashing computer by clicking faster.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 min-h-[160px] flex items-center">
              <div className="flex items-center space-x-4">
                <RefreshCw className="w-8 h-8 text-[#D400DB] flex-shrink-0 mt-1" />
                <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
                  It doesn't matter how fast you click - until you reset and upgrade the system, it's going to keep glitching.
                </p>
              </div>
            </div>
          </div>
          
          {/* Key Insight */}
          <div className="text-center py-6">
            <p className="text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed">
              Your results aren't about more effort, they're about the OS you're trading on.
            </p>
          </div>
          
          {/* Final Statements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 min-h-[120px] flex items-center space-x-4">
              <CheckCircle className="w-8 h-8 text-[#4CD964] flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
                Because you already know enough.
              </p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 min-h-[120px] flex items-center space-x-4">
              <Briefcase className="w-8 h-8 text-[#0022FF] flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
                You already work hard enough.
              </p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50 min-h-[120px] flex items-center space-x-4">
              <BookOpen className="w-8 h-8 text-[#D400DB] flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
                You're not missing knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReasonSection;