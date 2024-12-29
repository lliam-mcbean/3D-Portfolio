import React, { createContext, useState, useContext } from 'react';

const ExploreContext = createContext();

export const useExplore = () => {
  return useContext(ExploreContext);
};

export const ExploreProvider = ({ children }) => {
  const [explore, setExplore] = useState(false);

  return (
    <ExploreContext.Provider value={{ explore, setExplore }}>
      {children}
    </ExploreContext.Provider>
  );
};