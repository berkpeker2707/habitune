import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Vibration,
  TextInput,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch } from "../../state/store";
import {
  setEditHabitNameModal,
  setSelectedOverviewHabit,
  updateHabitNameAction,
} from "../../state/habitSlice";

const UpdateHabitNameModal = (props: {
  name: string;
  habitID: any;
  editHabitNameModal: boolean;
}) => {
  const { name, habitID, editHabitNameModal } = props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [value, onChangeText] = useState(name);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editHabitNameModal}
        onRequestClose={() => {
          dispatch(setEditHabitNameModal(false));
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
            <TextInput
              placeholder={name}
              style={{
                height: 45,
                width: 370,
                // paddingLeft: 40,
                borderRadius: 20,
                fontSize: 19,
                color: theme.primaryText,
                textAlign: "center",
              }}
              maxLength={30}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              autoFocus={true}
              placeholderTextColor={theme.fadedPrimaryText}
            />

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
                dispatch(
                  updateHabitNameAction({
                    _id: habitID,
                    name: value,
                  })
                );
                dispatch(setEditHabitNameModal(false));
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

export default UpdateHabitNameModal;
