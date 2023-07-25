import * as React from "react";
import { memo } from "react";
import { View, Text } from "react-native";

const DotGraphBar = memo((props: any) => {
  const { name, color } = props;
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
        borderBottomColor: "#968EB0",
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 34,
          width: 300,
          left: 7,
          top: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: name.length > 23 ? 12 : 15,
            color: "#444",
          }}
        >
          {name}
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
            color: "#444",
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
          left: 167,
          top: 29,
          borderRadius: 15,
          backgroundColor: color,
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
            color: "#444",
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
            color: "#444",
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
          left: 219,
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
            color: "#444",
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
          left: 245,
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
            color: "#444",
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
          left: 271,
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
            color: "#444",
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
          left: 297,
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
            color: "#444",
            fontStyle: "normal",
          }}
        >
          7
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
          backgroundColor: "#FFF",
          borderColor: color,
          borderWidth: 1,
        }}
      ></View>
    </View>
  );
});

export default DotGraphBar;
