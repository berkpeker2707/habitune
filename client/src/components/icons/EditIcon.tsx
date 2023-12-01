import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const EditIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <Path
        fill={theme.primaryColor}
        d="M18.94 3.12l2.122 2.122a3 3 0 010 4.243l-1.803 1.803-6.364-6.364 1.803-1.803a3 3 0 014.242 0zm-7.106 2.865l-8.127 8.127a3 3 0 00-.861 1.797l-.394 3.617a2 2 0 002.204 2.205l3.618-.394a3 3 0 001.796-.86l8.128-8.128-6.364-6.364z"
      />
    </Svg>
  );
};

export default EditIcon;
