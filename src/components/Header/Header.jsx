import React from 'react';
import BlackButton from '../BlackButton';
import { useNavigate } from 'react-router-dom';
import FancyButton from '../buttons/FancyButton';
import { useAuth } from '../../contexts/AuthContext';
import { useSpace } from '../../contexts/SpaceContext';

const Header = ({ headerHeightPixels, sidebarWidth }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { currentSpace } = useSpace();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className={`h-[80px] px-8 fixed top-0 right-0 left-0 md:left-64 border-b border-borders bg-white z-10`}>
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl tracking-wider gradient-text">Tapdive</h1>

          {currentSpace && (
            <div className="ml-6 flex items-center">
              <span className="text-2xl mr-2">{currentSpace.emoji || '🚀'}</span>
              <h2 className="text-xl font-medium">{currentSpace.name}</h2>
            </div>
          )}
        </div>

        {currentUser && (
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 hidden md:block">
              {currentUser.email}
            </div>

            <FancyButton
              onClick={() => navigate('/new-tap')}
            >
              Create New Tap
            </FancyButton>

            <BlackButton
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </BlackButton>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;