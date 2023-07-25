import * as React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Pressable,
  Text,
  TextInput,
  Linking,
  Button,
} from "react-native";
import SettingsButton from "../components/settings/SettingsButton";
import { useCallback, useState } from "react";

{
  /* store link starts */
}
const OpenURLButton = ({ url, children }: any) => {
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

  return <Button title={children} onPress={handlePress} />;
};
{
  /* store link ends */
}

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState<String>();

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
      {/* send us feedback modal starts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              height: 400,
              width: 400,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ marginBottom: 10, textAlign: "center" }}>
              Your feedback is precious to us! Please let us know we can improve
              your Habitune experience!
            </Text>
            <TextInput
              style={{
                width: 250,
                height: 200,
                marginLeft: 20,
                color: "#444",
                fontSize: 14,
                backgroundColor: "#FFFFFF",
                marginBottom: 20,
              }}
              editable={true}
              selectTextOnFocus={false}
              maxLength={500}
              placeholder="My feedback is..."
              onChangeText={(feedback) => setFeedback(feedback)}
              multiline
            />
            <Pressable
              style={{
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                backgroundColor: "#968EB0",
              }}
              onPress={() => {
                setModalVisible(!modalVisible), console.log(feedback);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Hide Modal
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* send us feedback modal ends */}

      <ScrollView
        style={{
          marginTop: 20,
          marginBottom: 85,
          opacity: !modalVisible ? 1 : 0.3,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <SettingsButton buttonName="Send Us Feedback" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Rate Us" />
          <OpenURLButton
            url={
              "https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf&hl=en&gl=US"
            }
          >
            Open Supported URL
          </OpenURLButton>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Security" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Notification Settings" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="About Us" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Delete Account" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Sign Out" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;
