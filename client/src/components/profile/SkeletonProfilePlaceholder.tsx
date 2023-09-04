import * as React from "react";
import { View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const SkeletonProfilePlaceholder = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: "#ffffff" }}
    >
      <Skeleton colorMode={"light"} radius={75} height={35} width={35} />
      <View style={{ height: 2 }} />
    </MotiView>
  );
};

export default SkeletonProfilePlaceholder;
