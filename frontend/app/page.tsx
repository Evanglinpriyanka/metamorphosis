'use client';

import { useState } from 'react';

export default function Home() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
    console.log("User successfully clicked!");
  };

  // SIMULATION: If user misses the button (clicks the background), we log a "Frustration Error"
  const handleMiss = () => {
    console.error("UX_ERROR: User missed the button! Frustration detected.");
    // In the real version, this would send an API call to Kestra
  };

  return (
    <div 
      onClick={handleMiss}
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8"
    >
      <h1 className="text-4xl font-bold text-white mb-8">
        Metamorphosis Target
      </h1>
      
      <div className="p-10 border border-gray-700 rounded-lg bg-gray-800 text-center">
        <p className="text-gray-400 mb-4">Try to click the button below:</p>
        
        {/* THE TRAP: A button with terrible UX 
           - Small padding
           - Low contrast (gray on gray)
           - No cursor pointer
        */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Stop the "Miss" event
            handleClick();
          }}
          className="bg-gray-700 text-gray-500 text-xs px-2 py-1 rounded" 
          id="evolve-me-button"
        >
          Click Me
        </button>

        <p className="mt-4 text-green-400">Success Count: {clicks}</p>
      </div>
    </div>
  );
}
