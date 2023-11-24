import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

const BottomTabOverviewButton = (props: any) => {
  const { accessibilityState, onPressIn } = props;
  const { theme } = useTheme();

  if (accessibilityState.selected) {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: theme.backgroundColor
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={onPressIn}
          style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: 0.2,
            borderColor: theme.borderColor,
            marginTop: 1,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                // backgroundColor: theme.backgroundColor
              }}
            />
            <Svg
              width={54}
              height={29}
              fill="none"
              viewBox="0 0 54 29"
              {...props}
            >
              <Circle
                cx={5.5}
                cy={23.5}
                r={4.5}
                fill={theme.primaryColor}
                stroke={theme.primaryColor}
              />
              <Circle
                cx={24.5}
                cy={6.5}
                r={4.5}
                fill={theme.primaryColor}
                stroke={theme.primaryColor}
              />
              <Path
                stroke={theme.primaryColor}
                d="M20.967 7.743L7.669 19.712M44 6H29"
              />
              <Circle
                cx={48.5}
                cy={5.5}
                r={4.5}
                fill={theme.primaryColor}
                stroke={theme.primaryColor}
              />
            </Svg>
            <View
              style={{
                flex: 1,
                // backgroundColor: theme.backgroundColor
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: theme.backgroundColor
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={onPressIn}
          style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: 0.2,
            borderColor: theme.borderColor,
            marginTop: 1,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                // backgroundColor: theme.backgroundColor
              }}
            />
            <Svg
              width={54}
              height={29}
              fill="none"
              viewBox="0 0 54 29"
              {...props}
            >
              <Circle cx={5.5} cy={23.5} r={4.5} stroke={theme.primaryColor} />
              <Circle cx={48.5} cy={5.5} r={4.5} stroke={theme.primaryColor} />
              <Circle cx={24.5} cy={6.5} r={4.5} stroke={theme.primaryColor} />
              <Path
                stroke={theme.primaryColor}
                d="M20.967 7.743L7.669 19.712M44 6H29"
              />
            </Svg>
            <View
              style={{
                flex: 1,
                // backgroundColor: theme.backgroundColor
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default BottomTabOverviewButton;
