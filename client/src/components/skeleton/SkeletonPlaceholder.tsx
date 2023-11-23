import * as React from "react";
import { View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useTheme } from "../../context/ThemeContext";

const SkeletonPlaceholder = (props: {
  width: number;
  height: number;
  radius: number;
}) => {
  const { width, height, radius } = props;
  const { theme } = useTheme();

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: theme.backgroundColor }}
    >
      <Skeleton
        colorMode={
          theme.themeType === "default"
            ? "light"
            : theme.themeType === "dark"
            ? "dark"
            : "light"
        }
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={
          theme.themeType === "default"
            ? "light"
            : theme.themeType === "dark"
            ? "dark"
            : "light"
        }
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={
          theme.themeType === "default"
            ? "light"
            : theme.themeType === "dark"
            ? "dark"
            : "light"
        }
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={
          theme.themeType === "default"
            ? "light"
            : theme.themeType === "dark"
            ? "dark"
            : "light"
        }
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
      <Skeleton
        colorMode={
          theme.themeType === "default"
            ? "light"
            : theme.themeType === "dark"
            ? "dark"
            : "light"
        }
        width={width}
        height={height}
        radius={radius}
      />
      <View style={{ height: 2 }} />
    </MotiView>
  );
};

export default SkeletonPlaceholder;
