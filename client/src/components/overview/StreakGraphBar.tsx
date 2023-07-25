import * as React from "react";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

function StreakGraphBar(props: any) {
  const { name, color } = props;
  return (
    <View
      style={{
        width: 345,
        height: 39.5,
        paddingLeft: 20,
        marginBottom: 20,

        borderTopWidth: 0.5,
        // borderBottomWidth: 0.5,
        borderTopColor: "#968EB0",
        // borderBottomColor: color,
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 345,
          left: 0,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#444",
            fontStyle: "italic",
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 34,
          top: 20,
        }}
      >
        <Svg width={25} height={34} fill="none" viewBox="0 0 25 34">
          <Path
            fill={color}
            stroke="#444"
            d="M20.764 12.569a1.93 1.93 0 00-1.534-1.01 1.966 1.966 0 00-1.707.7c-1.033 1.267-1.873 2.023-2.518 2.44-.64.413-.96.412-1.038.405-.052-.006-.2-.03-.45-.31-.27-.304-.566-.812-.837-1.555-.541-1.483-.84-3.491-.916-5.475-.075-1.994.084-3.75.337-4.712.242-.926-.287-1.864-1.205-2.188-.914-.322-1.945.06-2.388.905L7.876 2.97l-.014.027C4.344 9.677.75 16.502.75 24.2c0 3.444 1.394 5.89 3.867 7.349 2.292 1.353 5.257 1.701 8.131 1.701 5.083 0 9.269-1.643 10.86-5.698 1.48-3.77.35-8.893-2.844-14.983zM9.568 6.974c.01 1.513.145 3.148.436 4.654.29 1.502.74 2.896 1.393 3.912.654 1.02 1.539 1.697 2.69 1.664 1.13-.031 2.438-.746 3.95-2.296.31-.316.628-.668.957-1.058.22.428.428.848.624 1.26 2.59 5.45 3.03 9.458 1.786 12.084-1.232 2.602-4.178 3.956-8.656 3.956-2.77 0-5.23-.352-6.993-1.392-1.738-1.026-2.827-2.739-2.827-5.558 0-6.146 2.47-11.73 5.434-17.489.44-.855.89-1.713 1.345-2.577a23.824 23.824 0 00-.14 2.84z"
          />
        </Svg>
      </View>
      <View
        style={{
          position: "absolute",
          height: 34,
          width: 22,
          left: 9,
          top: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#444",
          }}
        >
          33
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 109,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 137,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 165,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 193,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 221,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 249,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 22,
          width: 22,
          left: 277,
          top: 29,
          borderRadius: 15,
          backgroundColor: "#FFF",
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
    </View>
  );
}

export default StreakGraphBar;
