import * as React from "react";

import { Image, View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const ProfileCard = (props: { name: string; email: string; image: string }) => {
  const { name, email, image } = props;
  const { theme } = useTheme();

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 117,
          height: 117,
          margin: 10,

          borderRadius: 100,

          shadowColor: theme.fadedShadowColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 115,
            height: 115,
            borderRadius: 100,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            color: theme.primaryText,
            textAlign: "center",
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "500",
          }}
        >
          {name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: theme.fadedShadowColor,
            textAlign: "center",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "300",
          }}
        >
          {email}
        </Text>
      </View>
    </View>
  );
};
export default ProfileCard;
