import * as React from "react";
import { View, TextInput } from "react-native";

const DayBetween = (props: { day: string }) => {
  const { day } = props;

  return (
    <View style={{ top: 40 }}>
      <TextInput
        style={{
          height: 49.5,
          borderTopWidth: 1,
          paddingLeft: 20,
          marginLeft: 7,
          marginRight: 7,
          marginBottom: 10,
          borderColor: "#968EB0",
          color: "#7c7c7c",
          textAlign: "left",
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        {day}
      </TextInput>
    </View>
  );
};

export default DayBetween;
