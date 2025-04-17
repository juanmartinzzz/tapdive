import React, { useState } from 'react';

const Tap = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 bg-white section-border">
      <button
        className="w-full flex justify-between items-center p-4 bg-transparent border-none cursor-pointer text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl m-0">{title}</h2>
        <span className={`text-sm transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-gray-700">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tap;