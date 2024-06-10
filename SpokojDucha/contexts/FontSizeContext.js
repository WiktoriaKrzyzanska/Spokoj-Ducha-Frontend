import React, { createContext, useState } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSizeDelta, setFontSizeDelta] = useState(0);

  const increaseFontSize = () => {
    setFontSizeDelta((prevDelta) => prevDelta + 2);
  };

  const decreaseFontSize = () => {
    setFontSizeDelta((prevDelta) => prevDelta - 2);
  };

  return (
    <FontSizeContext.Provider value={{ fontSizeDelta, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};


