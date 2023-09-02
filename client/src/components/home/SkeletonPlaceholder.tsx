import * as React from "react";
import { View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const SkeletonPlaceholder = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: "#ffffff" }}
    >
      <Skeleton colorMode={"light"} width={372} height={48} radius={20} />
      <View style={{ height: 2 }} />
    </MotiView>
  );
};

export default SkeletonPlaceholder;
