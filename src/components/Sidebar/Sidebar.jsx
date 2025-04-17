import React, { useState } from 'react';

const Sidebar = () => {
  const [isPublicExpanded, setIsPublicExpanded] = useState(true);
  const [isPrivateExpanded, setIsPrivateExpanded] = useState(true);

  return (
    <div className="w-[250px] h-screen bg-white border-r border-gray-700 fixed left-0 top-0 p-4">
      <div className="py-4 border-b border-gray-700 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/default-avatar.png" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium">John Doe</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-between p-3 border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100"
            onClick={() => setIsPublicExpanded(!isPublicExpanded)}
          >
            <span>Public Taps</span>
            <span className={`text-sm transition-transform duration-200 ${isPublicExpanded ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {isPublicExpanded && (
            <div className="flex flex-col pl-4">
              <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Latest</a>
              <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Popular</a>
              <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Trending</a>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-between p-3 border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100"
            onClick={() => setIsPrivateExpanded(!isPrivateExpanded)}
          >
            <span>Private Taps</span>
            <span className={`text-sm transition-transform duration-200 ${isPrivateExpanded ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {isPrivateExpanded && (
            <div className="flex flex-col pl-4">
              <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">My Taps</a>
              <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Saved</a>
              <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Drafts</a>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <a href="#" className="flex items-center justify-between p-3 border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100">Settings</a>
          <a href="#" className="flex items-center justify-between p-3 border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100">Help</a>
          <a href="#" className="flex items-center justify-between p-3 border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100">About</a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;