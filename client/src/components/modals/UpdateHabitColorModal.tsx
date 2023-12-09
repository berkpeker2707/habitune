import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import Color from "../add/Color";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch } from "../../state/store";
import {
  setOverviewColorModal,
  setSelectedOverviewHabit,
  updateHabitColorAction,
} from "../../state/habitSlice";

const UpdateHabitColorModal = (props: {
  name: string;
  habitID: any;
  overviewColorModal: boolean;
  color: any;
}) => {
  const { name, habitID, overviewColorModal, color } = props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={overviewColorModal}
        onRequestClose={() => {
          dispatch(setOverviewColorModal(false));
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
            <Color />
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
                    color: color,
                  })
                );
                dispatch(setOverviewColorModal(false));
                dispatch(setSelectedOverviewHabit(null));
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
