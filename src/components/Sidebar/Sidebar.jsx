import PublicTaps from './PublicTaps';
import PrivateTaps from './PrivateTaps';
import WhiteButton from '../WhiteButton';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSpace } from '../../contexts/SpaceContext';
import firestore from '../../integrations/firestore';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, sidebarWidth }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { spaces, currentSpace, setCurrentSpace } = useSpace();
  const [taps, setTaps] = useState([]);
  const [isPublicExpanded, setIsPublicExpanded] = useState(true);
  const [isPrivateExpanded, setIsPrivateExpanded] = useState(true);
  const [isSpacesExpanded, setIsSpacesExpanded] = useState(true);

  useEffect(() => {
    if(currentUser) {
      firestore.userTapId.get({userId: currentUser.uid}).then(userTapIds => {
        firestore.tap.getMany({ids: userTapIds.map(userTapId => userTapId.tapId)}).then(taps => {
          setTaps(taps);
        });
      });
    }
  }, [currentUser]);

  const handleSpaceClick = (space) => {
    setCurrentSpace(space);
    navigate(`/space/${space.id}`);
  };

  return (
    <div className={`w-0 p-0 md:w-64 md:px-4 h-screen flex flex-col justify-between bg-white border-r border-borders fixed left-0 top-0 ${isSidebarOpen ? 'block' : 'hidden'} overflow-hidden`}>
      <div>
        {currentUser ? (
          <div className="h-[80px] flex items-center gap-4 border-b border-borders">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-xs shadow-black/50">
              <img src="https://i.pravatar.cc/300" alt="User" className="w-full h-full object-cover" />
            </div>

            <span>U</span>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            <WhiteButton onClick={() => navigate('/login')}>
              Sign In
            </WhiteButton>
          </div>
        )}

        {currentUser && (
          <div>
            <div className="mt-8">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsSpacesExpanded(!isSpacesExpanded)}
              >
                <h3 className="font-medium">Spaces</h3>
                {/* <span>{isSpacesExpanded ? '▼' : '▶'}</span> */}
              </div>

              {isSpacesExpanded && (
                <div className="mt-2 space-y-1">
                  {spaces.length > 0 ? (
                    spaces.map(space => (
                      <div
                        key={space.id}
                        className={`p-2 rounded cursor-pointer ${currentSpace && currentSpace.id === space.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        onClick={() => handleSpaceClick(space)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{space.emoji || '🚀'}</span>
                          <span className="truncate">{space.name}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 p-2">No spaces yet</p>
                  )}

                  <div className="mt-8 flex justify-center">
                    <WhiteButton onClick={() => navigate('/new-space')}>
                      New Space
                    </WhiteButton>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <PublicTaps taps={taps} />
            </div>

            <div className="mt-8">
              <PrivateTaps taps={taps} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <a href="#" className="py-2 flex items-center justify-between border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100">Settings</a>
        <a href="#" className="py-2 flex items-center justify-between border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100">Help</a>
        <a href="#" className="py-2 flex items-center justify-between border-none bg-transparent text-gray-800 text-base cursor-pointer text-left w-full hover:bg-gray-100">About</a>
      </div>

    </div>
  );
};

export default Sidebar;