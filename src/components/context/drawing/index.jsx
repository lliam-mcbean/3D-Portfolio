import React, { createContext, useState, useContext } from 'react';

const DrawingContext = createContext();

export const useDrawing = () => {
  return useContext(DrawingContext);
};

export const DrawingProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <DrawingContext.Provider value={{ isDrawing, setIsDrawing }}>
      {children}
    </DrawingContext.Provider>
  );
};