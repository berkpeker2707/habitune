import * as React from "react";
import { View, TextInput } from "react-native";

const ReminderWithPurpleIcon = (props: { textInputTitle: string }) => {
  const { textInputTitle } = props;

  return (
    <View style={{ width: 345 }}>
      <View
        style={{
          position: "absolute",
          height: 12,
          width: 12,
          left: 315,
          top: 14,
          borderRadius: 6,
          backgroundColor: "#968EB0",
        }}
      ></View>
      <TextInput
        style={{
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          //   marginBottom: 10,
          color: "#444",
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        {textInputTitle}
      </TextInput>
    </View>
  );
};

export default ReminderWithPurpleIcon;
