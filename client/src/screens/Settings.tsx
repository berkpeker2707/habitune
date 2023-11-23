import * as React from "react";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Pressable,
  Text,
  TextInput,
  Vibration,
} from "react-native";
import SettingsButton from "../components/settings/SettingsButton";
import LinkButton from "../components/settings/LinkButton";
import { useTheme } from "../context/ThemeContext";

const Settings = (props: {
  dispatch: Function;
  revertAll: Function;
  revertAllHabit: Function;
  deleteUserAction: Function;
}) => {
  const { dispatch, revertAll, revertAllHabit, deleteUserAction } = props;

  const { theme, setTheme } = useTheme();

  const [feedbackModalVisible, setFeedbackModalVisible] =
    useState<boolean>(false);
  const [aboutUsModalVisible, setAboutUsModalVisible] =
    useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* send us feedback modal starts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={feedbackModalVisible}
        onRequestClose={() => {
          setFeedbackModalVisible(!feedbackModalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            backgroundColor: theme.fadedBackgroundColor,
          }}
        >
          <View
            style={{
              height: 400,
              width: 400,
              backgroundColor: theme.backgroundColor,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: theme.fadedShadowColor,
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
                color: theme.fadedShadowColor,
                fontSize: 14,
                backgroundColor: theme.backgroundColor,
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
                backgroundColor: theme.primaryColor,
              }}
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                setFeedbackModalVisible(!feedbackModalVisible),
                  console.log(feedback);
              }}
            >
              <Text
                style={{
                  color: theme.backgroundColor,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Send
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* send us feedback modal ends */}
      {/* abous us starts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutUsModalVisible}
        onRequestClose={() => {
          setAboutUsModalVisible(!aboutUsModalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            backgroundColor: theme.fadedBackgroundColor,
          }}
        >
          <View
            style={{
              height: 400,
              width: 400,
              backgroundColor: theme.backgroundColor,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: theme.fadedShadowColor,
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
              Habitune is habit building application, that allows you to track
              habits, improve behaviours, schedule habits and customize them
              according to desired week day; in short period and color. Habitune
              also allows users to socialize and share their individual habits
              with friends and notifiy friends once you check your habits to
              improve productivity. {"\n\n"}
              For further assistance:{"\n"}📧habitune.contact@gmail.com
            </Text>
            <Pressable
              style={{
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                backgroundColor: theme.primaryColor,
              }}
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                setAboutUsModalVisible(!aboutUsModalVisible);
              }}
            >
              <Text
                style={{
                  color: theme.backgroundColor,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Okay
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* about us ends */}
      <ScrollView
        style={{
          marginTop: 20,
          marginBottom: 85,
          opacity: !feedbackModalVisible ? 1 : 0.3,
        }}
      >
        <TouchableOpacity
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            setTheme(theme.themeType === "default" ? "dark" : "default")
          }
        >
          {theme.themeType === "default" ? (
            <SettingsButton buttonName="Change Theme to Dark" />
          ) : (
            <SettingsButton buttonName="Change Theme to Default" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() => setFeedbackModalVisible(true)}
        >
          <SettingsButton buttonName="Send Us Feedback" />
        </TouchableOpacity>
        <View>
          <LinkButton
            buttonName="Rate Us"
            url="https://play.google.com/store/apps/details?id=com.thelittleteaclipper.habitune"
          />
        </View>
        {/* <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Security" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => console.log("TEST")}>
          <SettingsButton buttonName="Notification Settings" />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() => setAboutUsModalVisible(true)}
        >
          <SettingsButton buttonName="About Us" />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() => dispatch(deleteUserAction())}
        >
          <SettingsButton buttonName="Delete Account" />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() => {
            dispatch(revertAll());
            dispatch(revertAllHabit());
          }}
        >
          <SettingsButton buttonName="Sign Out" />
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          marginBottom: 105,
        }}
      >
        <Text style={{ color: theme.fadedPrimaryText }}>v1.1.4</Text>
      </View>
    </View>
  );
};

export default Settings;
