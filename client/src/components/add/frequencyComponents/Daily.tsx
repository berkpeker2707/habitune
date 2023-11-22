import * as React from "react";
import { View, TextInput } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const Daily = () => {
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
        Frequency
      </TextInput>
      <TextInput
        style={{
          height: 39.5,
          borderBottomWidth: 1,
          paddingLeft: 20,
          marginLeft: 7,
          marginRight: 7,
          marginBottom: 10,
          borderColor: theme.borderColor,
          color: theme.fadedPrimaryText,
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        Daily
      </TextInput>
    </>
  );
};

export default Daily;
