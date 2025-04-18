import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteButton from '../WhiteButton';
import { useAuth } from '../../contexts/AuthContext';
import BlackButton from '../BlackButton';
import FancyButton from '../buttons/FancyButton';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="h-[80px] border-b border-gray-700 px-8 bg-white fixed top-0 right-0 left-[250px] z-10">
      <div className="h-full flex items-center justify-between">
        <h1 className="text-3xl tracking-wider gradient-text">Tapdive</h1>

        {currentUser && (
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
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