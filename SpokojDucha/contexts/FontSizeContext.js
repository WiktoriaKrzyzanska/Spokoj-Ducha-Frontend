import React, { createContext, useState } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSizeDelta, setFontSizeDelta] = useState(0);
  const minFontSizeDelta = -8; 
  const maxFontSizeDelta = 20; 

  const increaseFontSize = () => {
    setFontSizeDelta((prevDelta) => Math.min(prevDelta + 2, maxFontSizeDelta));
  };

  const decreaseFontSize = () => {
    setFontSizeDelta((prevDelta) => Math.max(prevDelta - 2, minFontSizeDelta));
  };

  return (
    <FontSizeContext.Provider value={{ fontSizeDelta, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};