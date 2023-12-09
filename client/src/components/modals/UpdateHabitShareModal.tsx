import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import ShareOpened from "../add/shareComponents/ShareOpened";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch } from "../../state/store";
import {
  setSelectedOverviewHabit,
  setShareWithFriendListModal,
  updateHabitSharedWithAction,
} from "../../state/habitSlice";

const UpdateHabitShareModal = (props: {
  name: string;
  habitID: any;
  shareWithFriendListModal: boolean;
  shareWithFriendList: string[];
}) => {
  const { name, habitID, shareWithFriendListModal, shareWithFriendList } =
    props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={shareWithFriendListModal}
        onRequestClose={() => {
          dispatch(setShareWithFriendListModal(false));
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
            <ShareOpened />
            <Pressable
              style={[
                {
                  backgroundColor: theme.primaryColor,
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                },
              ]}
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                dispatch(
                  updateHabitSharedWithAction({
                    _id: habitID,
                    userId: shareWithFriendList[0],
                  })
                );
                dispatch(setShareWithFriendListModal(false));
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
                Share habit {name}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UpdateHabitShareModal;
