import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Vibration,
} from "react-native";
import { signInAction } from "../../state/userSlice";
import { useTheme } from "../../context/ThemeContext";

const LoginModal = (props: any) => {
  const { theme } = useTheme();

  const { dispatch, loginModalVisible, setLoginModalVisible } = props;
  const [emailState, setEmailState] = useState<string>("");
  const [passwordState, setPasswordState] = useState<string>("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loginModalVisible}
      onRequestClose={() => {
        setLoginModalVisible(!loginModalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
          backgroundColor: theme.fadedBackgroundColor,
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: theme.backgroundColor,
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: theme.fadedShadowColor,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: theme.primaryColor,
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Login without Google
          </Text>
          <TextInput
            style={{
              width: 345,
              height: 39.5,
              borderWidth: 0.5,
              borderRadius: 20,
              paddingLeft: 20,
              marginBottom: 10,
              borderColor:
                emailState.length > 0 ? theme.primaryColor : theme.warningColor,
            }}
            placeholder="email"
            onChangeText={(text) => setEmailState(text)}
            maxLength={30}
            placeholderTextColor={theme.fadedPrimaryText}
          />
          <TextInput
            style={{
              width: 345,
              height: 39.5,
              borderWidth: 0.5,
              borderRadius: 20,
              paddingLeft: 20,
              marginBottom: 10,
              borderColor:
                passwordState.length > 0
                  ? theme.primaryColor
                  : theme.warningColor,
            }}
            placeholder="password"
            onChangeText={(text) => setPasswordState(text)}
            maxLength={30}
            placeholderTextColor={theme.fadedPrimaryText}
          />
          <Pressable
            style={{
              backgroundColor: theme.primaryColor,
              borderRadius: 20,
              padding: 10,
              elevation: 2,
            }}
            onPressIn={() => Vibration.vibrate(10)}
            onPress={() => {
              setLoginModalVisible(!loginModalVisible);
              dispatch(
                signInAction({
                  email: emailState,
                  password: passwordState,
                })
              );
            }}
          >
            <Text
              style={{
                color: theme.backgroundColor,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;
