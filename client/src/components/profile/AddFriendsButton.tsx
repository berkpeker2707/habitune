import * as React from "react";
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";

import { sendFriendshipAction } from "../../state/userSlice";
import { useAppDispatch } from "../../state/store";
import { useTheme } from "../../context/ThemeContext";

const AddFriendsButton = () => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

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
        backgroundColor: theme.backgroundColor,
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

          backgroundColor: theme.backgroundColor,

          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderTopColor: theme.primaryColor,
          borderBottomColor: theme.primaryColor,
          borderLeftColor: theme.primaryColor,
          borderRightColor: theme.primaryColor,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
        disabled={buttonBoolean}
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => dispatch(sendFriendshipAction({ userMail: text }))}
      >
        <Text
          style={{
            color: !buttonBoolean
              ? theme.fadedShadowColor
              : theme.fadedPrimaryText,
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
          color: theme.fadedShadowColor,
          fontSize: 14,

          backgroundColor: theme.backgroundColor,

          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0,
          borderTopColor: theme.primaryColor,
          borderBottomColor: theme.primaryColor,
          borderLeftColor: theme.primaryColor,
          borderRightColor: theme.primaryColor,
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
