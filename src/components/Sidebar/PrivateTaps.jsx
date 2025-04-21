import { useState } from "react";
import { Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import WhiteButton from "../WhiteButton";

const PrivateTaps = ({taps}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex flex-col gap-1">
      <button
        className="flex items-center justify-between border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-bold">Private Taps</h3>
      </button>

      {isExpanded && (
        <div className="flex flex-col pl-2">
          {taps.filter(tap => !tap.isPublic).map(tap => (
            <div key={tap.id} onClick={() => navigate(`/tap/${tap.id}`)} className="py-2 px-3 text-gray-800 text-sm hover:bg-gray-100 cursor-pointer flex justify-between items-center gap-2">
              {tap.sections[0].fastView}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PrivateTaps;