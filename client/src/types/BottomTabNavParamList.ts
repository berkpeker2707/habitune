import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/core";

export type BottomTabNavParamList = {
  Signin: undefined;
  HomeSection: undefined;
  Add: undefined;
  Overview: undefined;
};

export type HomeNavParamList = {
  Icon: undefined;
  Profile: undefined;
  Share: undefined;
  Settings: undefined;
};

export type generalScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavParamList>,
  StackNavigationProp<HomeNavParamList>
>;
