import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import firestore from '../integrations/firestore';

const SpaceContext = createContext();

export const useSpace = () => {
  return useContext(SpaceContext);
};

export const SpaceProvider = ({ children }) => {
  const [currentSpace, setCurrentSpace] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const { currentUser } = useAuth();

  // Fetch spaces when user changes
  useEffect(() => {
    if (currentUser) {
      firestore.space.getForUser({ userId: currentUser.uid }).then(userSpaces => {
        setSpaces(userSpaces);
      });
    } else {
      setSpaces([]);
      setCurrentSpace(null);
    }
  }, [currentUser]);

  const value = {
    currentSpace,
    setCurrentSpace,
    spaces,
    setSpaces
  };

  return (
    <SpaceContext.Provider value={value}>
      {children}
    </SpaceContext.Provider>
  );
};