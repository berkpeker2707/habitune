import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

const TopNavbarDoneButton = () => {
  const { theme } = useTheme();

  return (
    <Svg width={31} height={24} fill="none" viewBox="0 0 31 24">
      <Path
        fill={theme.borderColor}
        stroke={theme.backgroundColor}
        d="M9.602 19.18l.25.254.249-.253L28.515.499l1.994 2.024L9.852 23.501l-9.36-9.505 2.01-2.026 7.1 7.21z"
      />
    </Svg>
  );
};

export default TopNavbarDoneButton;
