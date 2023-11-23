import * as React from "react";
import Svg, { Path, G, Defs } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

const TopNavbarDeleteButton = () => {
  const { theme } = useTheme();

  return (
    <Svg width={21} height={24} fill="none" viewBox="0 0 21 24">
      <Path
        fill={theme.borderColor}
        stroke={theme.backgroundColor}
        d="M13.77.25c.231 0 .418.187.418.417 0 .506.41.916.916.916H20a.75.75 0 01.75.75v1.01a.406.406 0 01-.406.407c-.5 0-.907.406-.907.906v16.677c0 1.333-1.073 2.417-2.375 2.417H3.938c-1.301 0-2.374-1.084-2.374-2.417V4.656c0-.5-.406-.906-.907-.906a.406.406 0 01-.406-.406v-1.01a.75.75 0 01.75-.75h4.896a.918.918 0 00.917-.917c0-.23.186-.417.416-.417h6.542zM3.689 20.333c0 .69.56 1.25 1.25 1.25h11.125c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25H4.938c-.69 0-1.25.56-1.25 1.25v15.333zM6.812 7.667a.75.75 0 01.75-.75h.625a.75.75 0 01.75.75v10a.75.75 0 01-.75.75h-.624a.75.75 0 01-.75-.75v-10zm6.625-.75a.75.75 0 01.75.75v10a.75.75 0 01-.75.75h-.624a.75.75 0 01-.75-.75v-10a.75.75 0 01.75-.75h.624z"
      />
    </Svg>
  );
};

export default TopNavbarDeleteButton;
