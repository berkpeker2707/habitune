import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ShareOpened from "../add/shareComponents/ShareOpened";

const UpdateHabitShareModal = (props: {
  dispatch: Function;
  name: string;
  habitID: any;
  updateHabitSharedWithAction: Function;
  shareWithFriendListModal: boolean;
  setShareWithFriendListModal: Function;
  currentUser: any;
  shareWithFriendList: string[];
  setShareWithFriendList: Function;
}) => {
  const {
    dispatch,
    name,
    habitID,
    updateHabitSharedWithAction,
    shareWithFriendListModal,
    setShareWithFriendListModal,
    currentUser,
    shareWithFriendList,
    setShareWithFriendList,
  } = props;
  const { theme } = useTheme();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={shareWithFriendListModal}
        onRequestClose={() => {
          setShareWithFriendListModal(!shareWithFriendListModal);
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
            <ShareOpened
              currentUser={currentUser}
              shareWithFriendList={shareWithFriendList}
              setShareWithFriendList={setShareWithFriendList}
            />
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
                setShareWithFriendListModal(!shareWithFriendListModal);
                dispatch(
                  updateHabitSharedWithAction({
                    _id: habitID,
                    userId: shareWithFriendList[0],
                  })
                );
                // setHomeEditBool(false);
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
