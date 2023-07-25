import * as React from "react";
import { ScrollView, View } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";

const Overview = () => {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
      >
        <StreakGraph />
        <View style={{ margin: 20 }}></View>
        <DotGraph />
      </ScrollView>
    </View>
  );
};

export default Overview;
