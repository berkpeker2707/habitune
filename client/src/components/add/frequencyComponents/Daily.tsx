import * as React from "react";
import { View, TextInput } from "react-native";

const Daily = () => {
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
          backgroundColor: "#968EB0",
        }}
      ></View>
      <TextInput
        style={{
          height: 39.5,
          borderBottomWidth: 1,
          paddingLeft: 20,
          marginBottom: 5,
          borderColor: "#968EB0",
          color: "#444",
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
          borderColor: "#968EB0",
          color: "#7C7C7C",
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
