import * as React from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";

import SigninBackground from "../assets/images/signin/signinBackground.png";
import GoogleSigninButton from "../components/signin/GoogleSigninButton";
import SigninLogo from "../components/signin/SigninLogo";
import SinginText from "../components/signin/SinginText";

// import { useNavigation } from "@react-navigation/native";
// import { SigninScreenNavigationProp } from "../types/BottomTabNavigatorParamList";

const Signin = () => {
  // const navigation = useNavigation<SigninScreenNavigationProp>();
  return (
    <View className="flex-1">
      <ImageBackground
        source={SigninBackground}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View className="flex-1 items-center justify-center">
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
};

export default Signin;
