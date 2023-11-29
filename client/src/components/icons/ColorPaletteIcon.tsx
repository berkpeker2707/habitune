import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const ColorPaletteIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <Path
        fill={theme.borderColor}
        stroke={theme.backgroundColor}
        d="M19.54 5.08A10.61 10.61 0 0011.91 2a10 10 0 10-.05 20 2.58 2.58 0 002.53-1.89 2.52 2.52 0 00-.57-2.28.499.499 0 01.37-.83h1.65A6.15 6.15 0 0022 11.33a8.48 8.48 0 00-2.46-6.25zm-12.7 9.66a1.5 1.5 0 11.4-2.08 1.49 1.49 0 01-.4 2.08zM8.3 9.25a1.5 1.5 0 11-2.64-1.425A1.5 1.5 0 018.3 9.25zM11 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5.75.8a1.5 1.5 0 11-1.54-2.575A1.5 1.5 0 0116.75 7.8z"
      />
    </Svg>
  );
};

export default ColorPaletteIcon;
