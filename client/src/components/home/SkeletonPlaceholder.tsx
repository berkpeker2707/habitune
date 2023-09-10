import * as React from "react";
import { View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const SkeletonPlaceholder = (props: any) => {
  const { colorMode, width, height, radius } = props;
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: "#ffffff" }}
    >
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
