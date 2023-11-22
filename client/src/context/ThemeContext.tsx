import React, { createContext, useContext, useState } from "react";

interface Theme {
  themeType: string;
  backgroundColor: string;
  fadedBackgroundColor: string;
  backgroundColorShadow: string;
  primaryColor: string;
  borderColor: string;
  primaryText: string;
  fadedPrimaryText: string;
  fadedShadowColor: string;
  warningColor: string;
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<"default" | "dark">>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"default" | "dark">("default");

  const themes = {
    default: {
      themeType: "default",
      backgroundColor: "#FFFFFF",
      fadedBackgroundColor: "rgba(52, 52, 52, 0.8)",
      backgroundColorShadow: "#E5E5E5",
      primaryColor: "#968EB0",
      borderColor: "#968EB0",
      primaryText: "#000000",
      fadedPrimaryText: "#A9A9A9",
      fadedShadowColor: "#444444",
      warningColor: "#FF0000",
    },
    dark: {
      themeType: "dark",
      backgroundColor: "#121212",
      fadedBackgroundColor: "rgba(52, 52, 52, 0.8)",
      backgroundColorShadow: "#333333",
      primaryColor: "#968EB0",
      borderColor: "#968EB0",
      primaryText: "#FFFFFF",
      fadedPrimaryText: "#A9A9A9",
      fadedShadowColor: "#444444",
      warningColor: "#FF0000",
    },
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
