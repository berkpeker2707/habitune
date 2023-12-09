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
  name,
  setName,
  setEmail,
  setPassword,
  registerModalVisible,
  setRegisterModalVisible,
} from "../../state/userSlice";

const RegisterModal = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const registerModalVisibleState = useSelector(registerModalVisible);
  const emailState = useSelector(email);
  const passwordState = useSelector(password);
  const nameState = useSelector(name);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={registerModalVisibleState}
      onRequestClose={() => {
        dispatch(setRegisterModalVisible(!registerModalVisibleState));
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
            Register without Google
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
                nameState.length > 0 ? theme.primaryColor : theme.warningColor,
              color: theme.primaryText,
            }}
            placeholder="name"
            value={nameState}
            onChangeText={(text) => dispatch(setName(text))}
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
              dispatch(setRegisterModalVisible(!registerModalVisibleState));
              dispatch(
                signInAction({
                  id: 0,
                  name: nameState,
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
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default RegisterModal;
