import * as React from "react";
import { View, TextInput } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const ShareWithNumber = (props: { shareWithNum: number }) => {
  const { shareWithNum } = props;
  const { theme } = useTheme();

  return (
    <>
      <View
        style={{
          position: "absolute",
          height: 12,
          width: 12,
          left: 315,
          top: 14,
          borderRadius: 6,
          backgroundColor: theme.primaryColor,
        }}
      ></View>
      <TextInput
        style={{
          height: 39.5,
          borderBottomWidth: 1,
          paddingLeft: 20,
          marginBottom: 5,
          borderColor: theme.borderColor,
          color: theme.fadedShadowColor,
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        {shareWithNum > 0
          ? "Share With Your Friends (" + shareWithNum + ")"
          : "Share With Your Friends"}
      </TextInput>
    </>
  );
};

export default ShareWithNumber;
