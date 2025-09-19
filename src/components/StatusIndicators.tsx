import React from 'react';

function StatusIndicators() {
  return (
    <div className="flex flex-row justify-center items-center space-x-4 md:space-x-8 mb-8 md:mb-16 text-sm md:text-lg px-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-white font-bold">Factory Reset</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        <span className="text-white font-bold">Systems Upgrade</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-white font-bold">Installation</span>
      </div>
    </div>
  );
}

export default StatusIndicators;