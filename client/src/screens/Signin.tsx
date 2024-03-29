import * as React from "react";
import { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  Vibration,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SigninBackground from "../assets/images/signin/signinBackground.png";
import GoogleSigninButton from "../components/signin/GoogleSigninButton";
import SigninLogo from "../components/signin/SigninLogo";
import SinginText from "../components/signin/SinginText";
import LoginModal from "../components/signin/LoginModal";
import RegisterModal from "../components/signin/RegisterModal";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useSelector } from "../state/store";
import {
  selectUserLoading,
  signInWithGoogleAction,
  loginModalVisible,
  setLoginModalVisible,
  registerModalVisible,
  setRegisterModalVisible,
} from "../state/userSlice";

WebBrowser.maybeCompleteAuthSession();

const Signin = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userLoading = useSelector(selectUserLoading);
  const loginModalVisibleState = useSelector(loginModalVisible);
  const registerModalVisibleState = useSelector(registerModalVisible);
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

  return !userLoading ? (
    <>
      <StatusBar style="light" />
      <LoginModal />
      <RegisterModal />
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "center",
          opacity:
            loginModalVisibleState || registerModalVisibleState ? 0.3 : 1,
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
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => promptAsync()}
            >
              <View
                style={{
                  position: "relative",
                  paddingBottom: 0.1,
                  borderRadius: 50,
                  backgroundColor: theme.backgroundColorShadow,
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
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() => {
                  dispatch(setLoginModalVisible(!loginModalVisibleState));
                }}
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
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() =>
                  dispatch(setRegisterModalVisible(!registerModalVisibleState))
                }
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
  ) : (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        opacity: loginModalVisibleState || registerModalVisibleState ? 0.3 : 1,
        // alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={theme.primaryColor} />
    </View>
  );
};

export default Signin;
