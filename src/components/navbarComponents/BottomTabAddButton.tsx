import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

//svg
import Svg, { Circle, Defs, G, Path } from "react-native-svg";

const BottomTabAddButton = (props: any) => {
  const { onPress } = props;

  return (
    <View style={styles.btnWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.addNavButtons]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.svgGapFiller]} />
          <View>
            <Svg
              width={150}
              height={80}
              fill="none"
              viewBox="0 0 150 80"
              {...props}
            >
              <Path d="M0 0h150v80H0z" />
              <G filter="url(#filter0_d_153_1425)">
                <Path
                  fill="#FFFFFF"
                  d="M-112 0H3.279a55.43 55.43 0 0144.495 22.375l2.4 3.23a32.186 32.186 0 007.841 7.475c10.636 7.158 24.675 7.28 35.344.172a31.64 31.64 0 008.272-8.037l2.22-3.133A52.353 52.353 0 01146.565 0H263v80h-375V0z"
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
                <Circle cx={31} cy={31} r={27} fill="#FFFFFF" />
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
  },
  addNavButtons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default BottomTabAddButton;
