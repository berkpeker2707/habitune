import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";

const BottomTabHomeButton = (props: any) => {
  const { accessibilityState, onPress } = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={26}
              height={32}
              fill="none"
              viewBox="0 0 26 32"
              {...props}
            >
              <G filter="url(#filter0_b_195_435)">
                <Path
                  fill="#968EB0"
                  d="M0 24.481V12.908a3 3 0 01.946-2.187l9.523-8.942a3 3 0 013.925-.158l10.477 8.362A3 3 0 0126 12.328V28.2a3 3 0 01-3 3H3a3 3 0 01-3-3v-3.719z"
                />
              </G>
              <Defs></Defs>
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
          onPress={onPress}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={27}
              height={32}
              fill="none"
              viewBox="0 0 27 32"
              {...props}
            >
              <G filter="url(#filter0_b_195_427)">
                <Path
                  stroke="#968EB0"
                  d="M1 14.912v9.627M6.77 31h13.46M26 24.553v-9.46m0-2.184V28a3 3 0 01-3 3H4a3 3 0 01-3-3V13.461a3 3 0 01.946-2.187l9.048-8.495a3 3 0 013.925-.158l9.952 7.943A3 3 0 0126 12.91z"
                />
              </G>
              <Defs></Defs>
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

export default BottomTabHomeButton;
