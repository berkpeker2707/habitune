import * as React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const DotGraphBarFriend = (props: {
  name: string;
  color: string;
  allHabitDatesDots: Array<boolean>;
}) => {
  const { name, color, allHabitDatesDots } = props;
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: 345,
        height: 39.5,
        paddingLeft: 20,
        marginBottom: 1,
        paddingBottom: 50,
        // borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        // borderTopColor: color,
        borderBottomColor: theme.primaryColor,
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 36,
          width: 300,
          left: 7,
          top: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            color: theme.fadedShadowColor,
            backgroundColor: "transparent",
          }}
        >
          {name.length > 22 ? `${name.substring(0, 19)}...` : name}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 167,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          T
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 167,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[0] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 193,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          1
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 193,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[1] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 219,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          2
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 219,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[2] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 245,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          3
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 245,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[3] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 271,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          4
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 271,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[4] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 297,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          5
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 297,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[5] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 323,
          top: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: theme.fadedShadowColor,
            fontStyle: "normal",
          }}
        >
          6
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 18,
          width: 18,
          left: 323,
          top: 29,
          borderRadius: 15,
          backgroundColor: allHabitDatesDots[6] ? color : theme.backgroundColor,
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
    </View>
  );
};

export default DotGraphBarFriend;
