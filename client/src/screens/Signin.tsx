import * as React from "react";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ImageBackground, Text } from "react-native";

import { StatusBar } from "expo-status-bar";

import SigninBackground from "../assets/images/signin/signinBackground.png";
import GoogleSigninButton from "../components/signin/GoogleSigninButton";
import SigninLogo from "../components/signin/SigninLogo";
import SinginText from "../components/signin/SinginText";

import LoginModal from "../components/signin/LoginModal";
import RegisterModal from "../components/signin/RegisterModal";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { signInWithGoogleAction } from "../state/userSlice";

WebBrowser.maybeCompleteAuthSession();

const Signin = (props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    allHabitsToday,
    habitUpdated,
    habitLoading,
  } = props;

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1018578640461-ujr095rgmk9315k12ror4q07h3fdnq8l.apps.googleusercontent.com",
    androidClientId:
      "1018578640461-qcuhsngal9ijgmhl4gkbi7kqi6ilo6ca.apps.googleusercontent.com",
  });

  useEffect(() => {
    (async () => {
      await handleSigninWithGoogle();
    })();
  }, [response]);

  async function handleSigninWithGoogle() {
    if (!userInfo) {
      if (response?.type === "success") {
        const responseFromGoogle = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: {
              Authorization: `Bearer ${response.authentication?.accessToken}`,
            },
          }
        );

        const user = await responseFromGoogle.json();

        await dispatch(signInWithGoogleAction(user));
      }
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <LoginModal
        dispatch={dispatch}
        loginModalVisible={loginModalVisible}
        setLoginModalVisible={setLoginModalVisible}
      />
      <RegisterModal
        dispatch={dispatch}
        registerModalVisible={registerModalVisible}
        setRegisterModalVisible={setRegisterModalVisible}
      />
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
          opacity: loginModalVisible || registerModalVisible ? 0.3 : 1,
          // alignItems: "center",
        }}
      >
        <ImageBackground
          source={SigninBackground}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                position: "relative",
                bottom: 70,
              }}
            >
              <SigninLogo />
            </View>
            <View
              style={{
                position: "relative",
                top: 50,
                bottom: 30,
              }}
            >
              <SinginText />
            </View>
            <TouchableOpacity
              style={{
                position: "relative",
                top: 150,
                bottom: 0,
              }}
              onPress={() => promptAsync()}
            >
              <View
                style={{
                  position: "relative",
                  paddingBottom: 0.1,
                  borderRadius: 50,
                  backgroundColor: "#E5E5E5",
                }}
              >
                <GoogleSigninButton />
              </View>
            </TouchableOpacity>
            {/* without google login/register else starts */}
            <View
              style={{
                position: "relative",
                paddingBottom: 0.1,
                borderRadius: 50,
                width: 327,
              }}
            >
              <TouchableOpacity
                style={{
                  position: "relative",
                  top: 150,
                  bottom: 0,
                  width: "100%",
                  padding: 5,
                  alignItems: "center",
                  alignContent: "center",
                }}
                onPress={() => setLoginModalVisible(!loginModalVisible)}
              >
                <Text style={{ textDecorationLine: "underline" }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "relative",
                  top: 150,
                  bottom: 0,
                  width: "100%",
                  padding: 5,
                  alignItems: "center",
                  alignContent: "center",
                }}
                onPress={() => setRegisterModalVisible(!registerModalVisible)}
              >
                <Text style={{ textDecorationLine: "underline" }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            {/* without google login/register else ends */}
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Signin;
