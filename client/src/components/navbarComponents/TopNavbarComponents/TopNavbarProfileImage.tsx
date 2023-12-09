import * as React from "react";
import { Image, Platform, View } from "react-native";
import SkeletonPlaceholder from "../../skeleton/SkeletonPlaceholder";
import { useTheme } from "../../../context/ThemeContext";

const TopNavbarProfileImage = (props: any) => {
  const { imageSource } = props;
  const { theme } = useTheme();

  return imageSource ? (
    <View
      style={
        Platform.OS === "android"
          ? {
              elevation: 6,
              shadowColor: theme.backgroundColorShadow,
            }
          : {
              shadowColor: theme.backgroundColorShadow,
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
          borderWidth: 0.5,
          borderColor: theme.borderColor,
        }}
      />
    </View>
  ) : (
    <></>
  );
};

export default TopNavbarProfileImage;
