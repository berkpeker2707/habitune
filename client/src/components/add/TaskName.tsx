import * as React from "react";
import Svg, { Rect, Path, Text } from "react-native-svg";

function TaskName(props: any) {
  return (
    <Svg width={345} height={48} viewBox="0 0 345 48" fill="none" {...props}>
      {/* task name starts */}
      <Rect
        x={0.25}
        y={0.25}
        width={344.5}
        height={39.5}
        rx={19.75}
        stroke="#968EB0"
        strokeWidth={0.5}
      />
      <Text x={20} y={25} fontSize="14" fontWeight={400} fill="#444">
        Task Name
      </Text>
      {/* task name ends */}
    </Svg>
  );
}

export default TaskName;
