import * as React from "react";
import { Pressable, Vibration, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
import Home from "../../src/screens/Home";
import Profile from "../../src/screens/Profile";
import Settings from "../../src/screens/Settings";
import Friend from "../../src/screens/Friend";
import NavbarLogo from "../components/icons/NavbarLogo";
import TopNavbarProfileImage from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarProfileImage";
import BackIcon from "../components/icons/BackIcon";
import ShareIcon from "../components/icons/ShareIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "../state/store";
import { friendName, selectFetchCurrentUserProfile } from "../state/userSlice";
import onShare from "../helpers/shareApp";
import ErrorBoundary from "react-native-error-boundary";
import CustomFallback from "../helpers/errorFallback";

const StackNavigator = createStackNavigator<StackNavParamList>();

const HomeSection = (props: any) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const currentUser = useSelector(selectFetchCurrentUserProfile);
  const friendNameState = useSelector(friendName);

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70, backgroundColor: theme.backgroundColor },
        headerTitleStyle: { color: theme.borderColor },
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <StackNavigator.Screen
        name="Home"
        children={(props: any) => (
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <Home {...props} />
          </ErrorBoundary>
        )}
        options={{
          headerTitle: "Today",
          headerLeft: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <NavbarLogo />
            </View>
          ),
          headerRight: () => (
            <Pressable
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                try {
                  navigation.navigate("Profile");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <TopNavbarProfileImage imageSource={currentUser.image} />
              </View>
            </Pressable>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Profile"
        children={(props: any) => (
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <Profile {...props} navigation={navigation} />
          </ErrorBoundary>
        )}
        options={{
          headerTitle: "Profile",
          headerLeft: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <NavbarLogo />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <View>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      onShare();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <ShareIcon />
                </Pressable>
              </View>
              <View style={{ flexBasis: "100%", height: 0 }}></View>
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      navigation.navigate("Settings");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <SettingsIcon />
                </Pressable>
              </View>
            </View>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Settings"
        children={(props: any) => (
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <Settings {...props} />
          </ErrorBoundary>
        )}
        options={{
          headerTitle: "Settings",
          headerLeft: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            >
              <Pressable
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <BackIcon />
              </Pressable>
            </View>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Friend"
        options={{ title: `${friendNameState}'s Habits` }}
        children={(props: any) => (
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <Friend {...props} />
          </ErrorBoundary>
        )}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeSection;
