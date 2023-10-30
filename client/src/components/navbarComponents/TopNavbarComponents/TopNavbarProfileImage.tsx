import * as React from "react";
import { Image, Platform, View } from "react-native";
import SkeletonProfilePlaceholder from "../../skeleton/SkeletonProfilePlaceholder";

const TopNavbarProfileImage = (props: any) => {
  const { imageSource } = props;

  return imageSource ? (
    <View
      style={
        Platform.OS === "android"
          ? {
              elevation: 6,
              shadowColor: "black",
            }
          : {
              shadowColor: "black",
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.3,
            }
      }
    >
      <Image
        source={{ uri: imageSource }}
        style={{
          width: 35,
          height: 35,
          borderRadius: 150 / 2,
          overflow: "hidden",
          // borderWidth: 0.5,
          // borderColor: "red",
        }}
      />
    </View>
  ) : (
    <SkeletonProfilePlaceholder
      colorMode={"light"}
      width={35}
      height={35}
      radius={75}
    />
  );
};

export default TopNavbarProfileImage;
