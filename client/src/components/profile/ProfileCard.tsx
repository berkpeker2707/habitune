import React, { memo } from "react";
import { Image, View, Text } from "react-native";

const ProfileCard = memo(() => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 117,
          height: 117,
          margin: 10,

          borderRadius: 100,

          shadowColor: "#968EB0",
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
            uri: "https://fastly.picsum.photos/id/100/300/300.jpg?hmac=rRJwCdAq0dwpM7tpG0mEUD9l4HJLw_ZX0pbnCw5xn_U",
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
            color: "#000000",
            textAlign: "center",
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "500",
          }}
        >
          Berk Peker
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: "#444",
            textAlign: "center",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "300",
          }}
        >
          berkolatto@gmail.com
        </Text>
      </View>
    </View>
  );
});

export default ProfileCard;
