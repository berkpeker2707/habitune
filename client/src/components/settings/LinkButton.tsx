import * as React from "react";
import { useCallback } from "react";
import { Linking, TextInput, TouchableOpacity, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const LinkButton = (props: { buttonName: string; url: string }) => {
  const { buttonName, url } = props;

  const { theme, setTheme } = useTheme();

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity
      style={{ width: 345 }}
      onPressIn={() => Vibration.vibrate(10)}
      onPress={handlePress}
    >
      <TextInput
        style={{
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          marginBottom: 10,
          color: theme.fadedShadowColor,
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        {buttonName}
      </TextInput>
    </TouchableOpacity>
  );
};

export default LinkButton;
