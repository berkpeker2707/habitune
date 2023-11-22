import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

const TopNavbarEditButton = () => {
  const { theme } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <Path
        fill={theme.fadedShadowColor}
        stroke={theme.backgroundColor}
        d="M23.034 2.757v.002a2.4 2.4 0 010 3.418v.001L5.468 23.75H.25v-5.221l13.791-13.81v-.001l3.773-3.76V.956a2.42 2.42 0 013.42 0l1.8 1.8zM2.416 21.333v.24l.24.01 1.88.08.11.004.077-.078L21.576 4.718l.176-.177-.176-.177-1.88-1.88-.177-.177-.177.177L2.49 19.342l-.074.073v1.918z"
      />
    </Svg>
  );
};

export default TopNavbarEditButton;
