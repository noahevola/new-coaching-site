import React from 'react';

function TestimonialsSection() {
  return (
    <div className="mb-12 md:mb-20 px-4">
      {/* Divider */}
      <div className="border-t border-gray-700 mb-8 md:mb-16"></div>
      
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
          <span className="bg-[#FFF041] text-black px-2 py-1">
            Don't just take my word for it:
          </span>
        </h3>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Testimonial Grid - 3 equal columns with consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Column 1 */}
          <div className="space-y-4 md:space-y-8">
            <img 
              src="/Screenshot 2025-09-02 at 12.07.50 1 (1).png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-1.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
            <img 
              src="/Screenshot 2025-09-02 at 12.06.41 1 (2).png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-2.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
            {/* Bottom left now IMG_6513 */}
            <img 
              src="/IMG_6513 1 (1).png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-6.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
          </div>
          
          {/* Column 2 */}
          <div className="space-y-4 md:space-y-8">
            <img 
              src="/IMG_6303 1 (1).png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-3.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
            {/* Bottom centre now Group 61 */}
            <img 
              src="/Group 61.png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-4.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
          </div>
          
          {/* Column 3 */}
          <div className="space-y-4 md:space-y-8">
            {/* Top right is removed (moved to bottom centre) */}
            <img 
              src="/Group 54 (1).png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-5.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
            {/* Bottom right now IMG_6514 */}
            <img 
              src="/IMG_6514 1 (1).png" 
              alt="Trading testimonial screenshot" 
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.log('Failed to load testimonial-7.png');
                e.currentTarget.style.border = '2px solid red';
              }}
            />
          </div>
        </div>
        
        {/* Fade overlay for bottom */}
        <div className="relative -mt-32 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
