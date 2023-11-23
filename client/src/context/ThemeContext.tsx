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
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
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
      color0: "#FFFFFF",
      color1: "#968EB0",
      color2: "#9DB2CE",
      color3: "#C04F43",
      color4: "#A5D2AC",
      color5: "#99BB42",
      color6: "#F59732",
      color7: "#F1867E",
      color8: "#FCCA1B",
      color9: "#4D6691",
      color10: "#6EA8D8",
      color11: "#DEB4CF",
      color12: "#F6AF90",
    },
    dark: {
      themeType: "dark",
      backgroundColor: "#282828",
      fadedBackgroundColor: "rgba(32, 32, 32, 0.8)",
      backgroundColorShadow: "#1E1E1E",
      primaryColor: "#FFFFFF",
      borderColor: "#FFFFFF",
      primaryText: "#FFFFFF",
      fadedPrimaryText: "#B0B0B0",
      fadedShadowColor: "#999999",
      warningColor: "#FF0000",
      color0: "#FFFFFF",
      color1: "#7D7A8D",
      color2: "#6F88A1",
      color3: "#A53E38",
      color4: "#849E7E",
      color5: "#7AA32B",
      color6: "#D77E21",
      color7: "#D45C56",
      color8: "#E6B914",
      color9: "#324461",
      color10: "#507BAE",
      color11: "#B0849E",
      color12: "#D9947A",
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
