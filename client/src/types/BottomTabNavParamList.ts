import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/core";

// import { RouteProp } from "@react-navigation/native";
export type BottomTabNavParamList = {
  Signin: any;
  HomeSection: any;
  AddSection: any;
  Overview: any;
};

export type StackNavParamList = {
  Home: any;
  Profile: any;
  Share: any;
  Settings: any;
  Add: any;
};

export type generalScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavParamList>,
  StackNavigationProp<StackNavParamList>
>;
