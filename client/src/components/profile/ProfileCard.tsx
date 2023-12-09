import * as React from "react";

import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch } from "../../state/store";
import { updateCurrentUserImageAction } from "../../state/userSlice";

import * as ImagePicker from "expo-image-picker";

const ProfileCard = (props: { name: string; email: string; image: string }) => {
  const { name, email, image } = props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        dispatch(updateCurrentUserImageAction(result));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

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
        <TouchableOpacity onPress={pickImage}>
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
        </TouchableOpacity>
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
