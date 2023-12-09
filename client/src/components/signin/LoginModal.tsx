import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Vibration,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch, useSelector } from "../../state/store";
import {
  signInAction,
  email,
  password,
  setEmail,
  setPassword,
  loginModalVisible,
  setLoginModalVisible,
} from "../../state/userSlice";

const LoginModal = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const loginModalVisibleState = useSelector(loginModalVisible);
  const emailState = useSelector(email);
  const passwordState = useSelector(password);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loginModalVisibleState}
      onRequestClose={() => {
        dispatch(setLoginModalVisible(!loginModalVisibleState));
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
              color: theme.primaryText,
            }}
            placeholder="email"
            value={emailState}
            onChangeText={(text) => dispatch(setEmail(text))}
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
              color: theme.primaryText,
            }}
            placeholder="password"
            value={passwordState}
            onChangeText={(text) => dispatch(setPassword(text))}
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
              dispatch(setLoginModalVisible(!loginModalVisibleState));
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
