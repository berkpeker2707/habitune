import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const EyeIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M3 5l18 14z" fill={theme.primaryColor} />
      <Path
        d="M3 5l18 14"
        stroke={theme.primaryColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.365 13.846a3 3 0 01-4.767-3.643M9 5.627a7.003 7.003 0 017.85 1.423l3.001 3.002c.497.497.745.745.885 1.008a2 2 0 010 1.88c-.14.263-.388.511-.885 1.008L19.8 14M7.016 8.399A1 1 0 105.6 6.984L7.016 8.4zm.64 7.844l-2.12-2.121-1.415 1.414 2.121 2.121 1.415-1.414zm8.486 0a6 6 0 01-8.485 0l-1.415 1.414a8 8 0 0011.314 0l-1.414-1.414zM5.535 9.879l1.48-1.48-1.414-1.415-1.48 1.48L5.535 9.88zm11.211 5.76l-.604.604 1.414 1.414.604-.604-1.414-1.415zM5.536 14.12c-.687-.686-1.13-1.132-1.413-1.503-.265-.347-.295-.51-.295-.618h-2c0 .721.304 1.306.705 1.832.384.502.941 1.057 1.588 1.704l1.414-1.415zM4.12 8.465c-.647.646-1.204 1.201-1.588 1.704-.401.526-.705 1.11-.705 1.831h2c0-.107.03-.27.295-.618.283-.371.726-.816 1.412-1.503L4.121 8.465z"
        fill={theme.primaryColor}
      />
    </Svg>
  );
};

export default EyeIcon;
