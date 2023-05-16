import * as React from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";

import SigninBackground from "../assets/images/signin/signinBackground.png";
import SigninLogo from "../assets/images/signin/signinLogo.svg";
import SigninText from "../assets/images/signin/signinText.svg";
import GoogleSigninButton from "../assets/images/signin/googleSigninButton.svg";

export function Signin() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={SigninBackground}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View className="flex-1 items-center justify-center">
          <SigninLogo
            style={{
              position: "relative",
              bottom: 70,
            }}
          />

          <SigninText
            style={{
              position: "relative",
              top: 50,
              bottom: 30,
            }}
          />

          <TouchableOpacity
            style={{
              position: "relative",
              top: 150,
              bottom: 0,
            }}
            onPress={() => console.log("TEST")}
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
}
