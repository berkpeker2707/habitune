import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const AddFriendsButton = () => {
  const [text, setText] = useState("");
  const [buttonBoolean, setButtonBoolean] = useState(true);

  const validate = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setText(text);
      setButtonBoolean(true);
      return false;
    } else {
      setText(text);
      setButtonBoolean(false);
      return true;
    }
  };

  return (
    <View
      style={{
        // width: 345,
        marginBottom: 10,
        height: 39.5,
        backgroundColor: "#FFFFFF",
      }}
    >
      <TouchableOpacity
        style={{
          //   position: "absolute",
          top: 0,
          width: 40,
          height: 39.5,
          left: 285,
          justifyContent: "center",

          backgroundColor: "#FFFFFF",

          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderTopColor: "#968EB0",
          borderBottomColor: "#968EB0",
          borderLeftColor: "#968EB0",
          borderRightColor: "#968EB0",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
        disabled={buttonBoolean}
        onPress={() => console.log("Add Button Pressed")}
      >
        <Text
          style={{
            color: !buttonBoolean ? "#444" : "#D3D3D3",
            textAlign: "center",
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
      <TextInput
        style={{
          position: "absolute",
          top: 0,
          width: 275,
          height: 39.5,
          paddingLeft: 20,
          marginLeft: 20,
          zIndex: -10,
          marginBottom: 5,
          color: "#444",
          fontSize: 14,

          backgroundColor: "#FFFFFF",

          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0,
          borderTopColor: "#968EB0",
          borderBottomColor: "#968EB0",
          borderLeftColor: "#968EB0",
          borderRightColor: "#968EB0",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        editable={true}
        selectTextOnFocus={false}
        placeholder="Friend's Email"
        onChangeText={(text) => validate(text)}
        value={text}
        maxLength={50}
      />
    </View>
  );
};

export default AddFriendsButton;
