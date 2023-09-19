import * as React from "react";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";

import { StatusBar } from "expo-status-bar";

import SigninBackground from "../assets/images/signin/signinBackground.png";
import GoogleSigninButton from "../components/signin/GoogleSigninButton";
import SigninLogo from "../components/signin/SigninLogo";
import SinginText from "../components/signin/SinginText";

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
    userUpdated,
    habitUpdated,
    habitLoading,
  } = props;

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
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
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
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Signin;
