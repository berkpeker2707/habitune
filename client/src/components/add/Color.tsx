import * as React from "react";
import Svg, { Rect, Text, Circle } from "react-native-svg";

function Color(props: any) {
  return (
    <Svg width={345} height={68} viewBox="0 0 345 68" fill="none" {...props}>
      <Rect
        x={0.25}
        y={20.25}
        width={344.5}
        height={39.5}
        rx={19.75}
        stroke="#968EB0"
        strokeWidth={0.5}
      />
      <Text x={20} y={13} fontSize="14" fontWeight={400} fill="#444">
        Color
      </Text>
      <Circle cx={47} cy={40} r={10} fill="#9DB2CE" />
      <Circle cx={103} cy={40} r={10} fill="#A5D2AC" />
      <Circle cx={75} cy={40} r={10} fill="#C04F43" />
      <Circle cx={19} cy={40} r={10} fill="#968EB0" />
      <Circle cx={159} cy={40} r={10} fill="#F59732" />
      <Circle cx={131} cy={40} r={10} fill="#99BB42" />
      <Circle cx={187} cy={40} r={10} fill="#F1867E" />
      <Circle cx={215} cy={40} r={10} fill="#FCCA1B" />
      <Circle cx={271} cy={40} r={10} fill="#6EA8D8" />
      <Circle cx={243} cy={40} r={10} fill="#4D6691" />
      <Circle cx={299} cy={40} r={10} fill="#DEB4CF" />
      <Circle cx={327} cy={40} r={10} fill="#F6AF90" />
    </Svg>
  );
}

export default Color;
