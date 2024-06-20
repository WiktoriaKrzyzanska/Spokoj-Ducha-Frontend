import React, { createContext, useState } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSizeDelta, setFontSizeDelta] = useState(0);

  const increaseFontSize = () => {
    setFontSizeDelta((prevDelta) => {
      if (prevDelta < MAX_FONT_SIZE_DELTA) {
        return prevDelta + 2;
      } else {
        return prevDelta;
      }
    });
  };

  const decreaseFontSize = () => {
    setFontSizeDelta((prevDelta) => {
      if (prevDelta > MIN_FONT_SIZE_DELTA) {
        return prevDelta - 2;
      } else {
        return prevDelta;
      }
    });
  };

  return (
    <FontSizeContext.Provider value={{ fontSizeDelta, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};


