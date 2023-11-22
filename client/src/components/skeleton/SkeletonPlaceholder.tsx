import * as React from "react";
import { View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useTheme } from "../../context/ThemeContext";

const SkeletonPlaceholder = (props: {
  colorMode: "dark" | "light" | undefined;
  width: number;
  height: number;
  radius: number;
}) => {
  const { colorMode, width, height, radius } = props;
  const { theme } = useTheme();

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: theme.backgroundColor }}
    >
      <Skeleton
        colorMode={colorMode}
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={colorMode}
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={colorMode}
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={colorMode}
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={colorMode}
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
    </MotiView>
  );
};

export default SkeletonPlaceholder;
