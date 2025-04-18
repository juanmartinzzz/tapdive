import { useState } from "react";

const PublicTaps = () => {
  const [isPublicExpanded, setIsPublicExpanded] = useState(true);

  return (
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
  )
}

export default PublicTaps