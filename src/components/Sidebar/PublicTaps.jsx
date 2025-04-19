import { EyeClosed, LockIcon } from "lucide-react";
import { useState } from "react";

const PublicTaps = ({taps}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex flex-col gap-1">
      <button
        className="flex items-center justify-between border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Taps</span>
        {/* <span className={`text-sm transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span> */}
      </button>

      {isExpanded && (
        <div className="flex flex-col pl-2">
          <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Latest</a>

          {taps.filter(tap => tap.isPublic).map(tap => (
            <div key={tap.id} onClick={() => navigate(`/tap/${tap.id}`)} className="py-2 px-3 text-gray-800 text-sm hover:bg-gray-100 cursor-pointer flex justify-between items-center gap-2">
              {tap.sections[0].fastView}
              <EyeClosed size={16} />
            </div>
          ))}
          <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Popular</a>
          <a href="#" className="py-2 px-3 text-gray-800 text-sm no-underline hover:bg-gray-100">Trending</a>
        </div>
      )}
    </div>
  )
}

export default PublicTaps