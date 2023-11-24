import * as React from "react";
import { memo } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const DayCircle = memo(
  (props: { day: string; left: number; dayCircleMarked: boolean }) => {
    const { day, left, dayCircleMarked } = props;
    const { theme } = useTheme();

    if (dayCircleMarked) {
      var color = theme.backgroundColor;
      var backgroundColor = theme.primaryColor;
    } else {
      var color = theme.primaryColor;
      var backgroundColor = theme.backgroundColor;
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
          borderColor: theme.borderColor,
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
              color: color,
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
