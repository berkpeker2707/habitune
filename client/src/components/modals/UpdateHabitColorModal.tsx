import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Color from "../add/Color";

const UpdateHabitColorModal = (props: {
  name: string;
  habitID: any;
  overviewColorModal: boolean;
  setOverviewColorModal: Function;
  overviewColor: string;
  setOverviewColor: Function;
  dispatch: Function;
  updateHabitColorAction: Function;
  setSelectedOverviewHabit: Function;
}) => {
  const {
    name,
    habitID,
    overviewColorModal,
    setOverviewColorModal,
    overviewColor,
    setOverviewColor,
    dispatch,
    updateHabitColorAction,
    setSelectedOverviewHabit,
  } = props;
  const { theme } = useTheme();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={overviewColorModal}
        onRequestClose={() => {
          setOverviewColorModal(!overviewColorModal);
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
            <Color color={overviewColor} setColor={setOverviewColor} />
            <Text
              style={{
                color: theme.primaryColor,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Change color of {name}?
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
                dispatch(
                  updateHabitColorAction({
                    _id: habitID,
                    color: overviewColor,
                  })
                );
                setOverviewColorModal(!overviewColorModal);
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

export default UpdateHabitColorModal;
