import * as React from "react";
import { ScrollView, Text, View } from "react-native";

export function Overview(props: any) {
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
        <Text>Overview</Text>
      </ScrollView>
    </View>
  );
}
