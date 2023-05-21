import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/core";

export type BottomTabNavParamList = {
  Signin: undefined;
  HomeSection: undefined;
  AddSection: undefined;
  Overview: undefined;
};

export type StackNavParamList = {
  Home: undefined;
  Profile: undefined;
  Share: undefined;
  Settings: undefined;
  Add: undefined;
};

export type generalScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavParamList>,
  StackNavigationProp<StackNavParamList>
>;
