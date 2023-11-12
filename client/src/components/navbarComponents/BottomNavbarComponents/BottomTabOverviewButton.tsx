import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const BottomTabOverviewButton = (props: any) => {
  const { accessibilityState, onPressIn } = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={onPressIn}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
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
                fill="#968EB0"
                stroke="#968EB0"
              />
              <Circle
                cx={24.5}
                cy={6.5}
                r={4.5}
                fill="#968EB0"
                stroke="#968EB0"
              />
              <Path stroke="#968EB0" d="M20.967 7.743L7.669 19.712M44 6H29" />
              <Circle
                cx={48.5}
                cy={5.5}
                r={4.5}
                fill="#968EB0"
                stroke="#968EB0"
              />
            </Svg>
            <View style={[styles.svgGapFiller]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={onPressIn}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={54}
              height={29}
              fill="none"
              viewBox="0 0 54 29"
              {...props}
            >
              <Circle cx={5.5} cy={23.5} r={4.5} stroke="#968EB0" />
              <Circle cx={48.5} cy={5.5} r={4.5} stroke="#968EB0" />
              <Circle cx={24.5} cy={6.5} r={4.5} stroke="#968EB0" />
              <Path stroke="#968EB0" d="M20.967 7.743L7.669 19.712M44 6H29" />
            </Svg>
            <View style={[styles.svgGapFiller]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
    alignItems: "center",
    zIndex: 1,
  },
  otherNavButtons: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.2,
    borderColor: "#BBBBBB",
    marginTop: 1,
  },
  svgGapFiller: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
  },
});

export default BottomTabOverviewButton;
