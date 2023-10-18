import * as React from "react";
import { useState } from "react";
import { View, Text, TextInput, Modal, Pressable } from "react-native";
import { signInAction } from "../../state/userSlice";

const LoginModal = (props: any) => {
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
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
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
              color: "#968EB0",
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
              borderColor: emailState.length > 0 ? "#968EB0" : "red",
            }}
            placeholder="email"
            onChangeText={(text) => setEmailState(text)}
            maxLength={30}
          />
          <TextInput
            style={{
              width: 345,
              height: 39.5,
              borderWidth: 0.5,
              borderRadius: 20,
              paddingLeft: 20,
              marginBottom: 10,
              borderColor: passwordState.length > 0 ? "#968EB0" : "red",
            }}
            placeholder="password"
            onChangeText={(text) => setPasswordState(text)}
            maxLength={30}
          />
          <Pressable
            style={[
              { borderRadius: 20, padding: 10, elevation: 2 },
              { backgroundColor: "#968EB0" },
            ]}
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
                color: "white",
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
