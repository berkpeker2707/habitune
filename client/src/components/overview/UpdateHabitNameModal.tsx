import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const UpdateHabitNameModal = (props: {
  name: string;
  habitID: any;
  editHabitNameModal: boolean;
  setEditHabitNameModal: Function;
  setSelectedOverviewHabit: Function;
}) => {
  const {
    name,
    habitID,
    editHabitNameModal,
    setEditHabitNameModal,
    setSelectedOverviewHabit,
  } = props;
  const { theme } = useTheme();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editHabitNameModal}
        onRequestClose={() => {
          setEditHabitNameModal(!editHabitNameModal);
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
              margin: 20,
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
            <Text
              style={{
                color: theme.primaryColor,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Change name of {name}?
            </Text>
            <Pressable
              style={{
                backgroundColor: theme.primaryColor,
                borderRadius: 20,
                padding: 10,
                elevation: 2,
              }}
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                setEditHabitNameModal(!editHabitNameModal);
                setSelectedOverviewHabit(null);
              }}
            >
              <Text
                style={{
                  color: theme.backgroundColor,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Yes
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UpdateHabitNameModal;
