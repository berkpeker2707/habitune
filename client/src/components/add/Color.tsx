import * as React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

function Color(props: any) {
  return (
    <>
      <TextInput
        style={{
          height: 29.5,
          paddingLeft: 20,

          color: "#444",
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        Color
      </TextInput>
      <View
        style={{
          width: 345,
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 9,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#9DB2CE",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 37,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#A5D2AC",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 65,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#C04F43",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 93,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#968EB0",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 121,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#F59732",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 149,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#99BB42",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 177,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#F1867E",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 205,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#FCCA1B",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 233,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#6EA8D8",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 261,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#4D6691",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 289,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#DEB4CF",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 317,
            top: 9,
            borderRadius: 15,
            backgroundColor: "#F6AF90",
          }}
        ></TouchableOpacity>
      </View>
    </>
  );
}

export default Color;
