import * as React from "react";
import { View, Text } from "react-native";

const DayCircle = (props: {
  day: string;
  left: number;
  backgroundColor: string;
}) => {
  const { day, left, backgroundColor } = props;

  return (
    <View
      style={{
        position: "absolute",
        width: 35,
        height: 35,
        left: left,
        top: 90,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#D9D9D9",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Text
          style={{
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: 12,
            lineHeight: 15,
          }}
        >
          {day}
        </Text>
      </View>
    </View>
  );
};

export default DayCircle;
