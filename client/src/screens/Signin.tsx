import * as React from "react";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";

import SigninBackground from "../assets/images/signin/signinBackground.png";
import GoogleSigninButton from "../components/signin/GoogleSigninButton";
import SigninLogo from "../components/signin/SigninLogo";
import SinginText from "../components/signin/SinginText";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

// import { useNavigation } from "@react-navigation/native";
// import { SigninScreenNavigationProp } from "../types/BottomTabNavigatorParamList";

WebBrowser.maybeCompleteAuthSession();

const Signin = () => {
  // const navigation = useNavigation<SigninScreenNavigationProp>();

  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "622076302455-0gcf5polsi68poptu1al2n96svho66mk.apps.googleusercontent.com",
    androidClientId:
      "622076302455-k8qd2e0mff9snl5pf5sgcol2v5h4j038.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSigninWithGoogle();
  }, [response]);

  const handleSigninWithGoogle = async () => {
    // const user = await AsyncStorage.getItem("@user");
    var user;
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token: any) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = await response.json();
      // await AsyncStorage.setItem("@user",JSON.stringify(user))
      setUserInfo(user);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            onPress={() => {
              console.log("TEST");
              promptAsync();
            }}
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
  );
};

export default Signin;
