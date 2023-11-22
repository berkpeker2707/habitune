import * as React from "react";
import { memo } from "react";
import { View, Text } from "react-native";

const DayCircle = memo(
  (props: { day: string; left: number; dayCircleMarked: boolean }) => {
    const { day, left, dayCircleMarked } = props;
    if (dayCircleMarked) {
      var backgroundColor = "#968EB0";
    } else {
      var backgroundColor = "#FFFFFF";
    }
    return (
      <View
        style={{
          position: "absolute",
          width: 35,
          height: 35,
          left: left,
          top: 0,
          // top: 90,
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: "#968EB0",
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
  }
);

export default DayCircle;
