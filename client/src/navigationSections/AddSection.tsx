import * as React from "react";
import { memo } from "react";
import { Pressable, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//types
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
// screens
import Add from "../../src/screens/Add";

//navbar components
import TopNavbarBackButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarDoneButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarDoneButton";

import { createHabitAction } from "../../src/state/habitSlice";

const StackNavigator = createStackNavigator<StackNavParamList>();

const AddSection = memo((props: any) => {
  const { navigation, currentUser, dispatch } = props;

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Add"
        children={(props: any) => (
          <Add {...props} navigation={navigation} currentUser={currentUser} />
        )}
        options={{
          headerTitle: "New Habit",
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
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <TopNavbarBackButton />
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 10,
              }}
            >
              <Pressable
                disabled={
                  navigation.getState().routes[1].params?.firstDate &&
                  navigation.getState().routes[1].params?.lastDate &&
                  navigation.getState().routes[1].params?.name
                    ? false
                    : true
                }
                onPress={() => {
                  try {
                    // console.log(navigation.getState().routes[1].params);
                    dispatch(
                      createHabitAction(navigation.getState().routes[1].params)
                    );
                    navigation.goBack();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <TopNavbarDoneButton />
              </Pressable>
            </View>
          ),
        }}
      />
    </StackNavigator.Navigator>
  );
});

export default AddSection;
