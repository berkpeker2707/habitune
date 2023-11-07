import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle, Defs, G, Path } from "react-native-svg";

const BottomTabAddButton = (props: any) => {
  const { onPressIn } = props;

  return (
    <View style={styles.btnWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        style={[styles.addNavButtons]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.svgGapFiller]} />
          <View>
            <Svg
              width={379}
              height={68}
              viewBox="0 0 379 68"
              fill="none"
              {...props}
            >
              <G filter="url(#filter0_d_388_5995)">
                <Path
                  stroke="#BBBBBB"
                  strokeWidth="0.3"
                  d="M2 3h115.279a55.429 55.429 0 0144.495 22.375l2.401 3.23a32.186 32.186 0 007.84 7.475c10.637 7.158 24.675 7.28 35.344.172a31.638 31.638 0 008.272-8.037l2.22-3.133A52.353 52.353 0 01260.565 3H377v64H2V3z"
                  fill="#fff"
                />
              </G>
              <Defs></Defs>
            </Svg>
          </View>
          <View
            style={{
              flex: 1,
              position: "absolute",
              height: 0,
              alignItems: "center",
              justifyContent: "center",
              left: 0,
              right: 0,
            }}
          >
            <Svg
              width={62}
              height={62}
              viewBox="0 0 62 62"
              fill="none"
              {...props}
            >
              <G filter="url(#filter0_d_194_424)">
                <Circle
                  cx={31}
                  cy={31}
                  r={27}
                  fill="#FFFFFF"
                  stroke="#BBBBBB"
                  strokeWidth="0.3"
                />
              </G>
              <G filter="url(#filter1_d_194_424)" fill="#968EB0">
                <Path d="M29 42V20a2 2 0 114 0v22a2 2 0 11-4 0z" />
                <Path d="M42 33H20a2 2 0 110-4h22a2 2 0 110 4z" />
              </G>
              <Defs></Defs>
            </Svg>
          </View>
          <View style={styles.svgGapFiller} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  addNavButtons: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  svgGapFiller: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
  },
});

export default BottomTabAddButton;
