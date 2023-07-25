import * as React from "react";
import { TextInput, View } from "react-native";

const SettingsButton = (props: { buttonName: string }) => {
  const { buttonName } = props;
  return (
    <View style={{ width: 345 }}>
      <TextInput
        style={{
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          marginBottom: 10,
          color: "#444",
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        {buttonName}
      </TextInput>
    </View>
  );
};

export default SettingsButton;
