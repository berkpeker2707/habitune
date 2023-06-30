import * as React from "react";
import { View, TextInput } from "react-native";

const ShareWithNumber = (props: { shareWithNum: number }) => {
  const { shareWithNum } = props;

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
        Share With Your Friends ({shareWithNum})
      </TextInput>
    </>
  );
};

export default ShareWithNumber;
