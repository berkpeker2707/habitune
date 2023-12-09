import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { sendFriendshipAction } from "../../state/userSlice";

const AcceptOrRemoveFriendModal = (props: {
  dispatch: Function;
  acceptOrRemoveFriendModalVisible: boolean;
  setAcceptOrRemoveFriendModalVisible: Function;
  selectedUser: any;
}) => {
  const {
    dispatch,
    acceptOrRemoveFriendModalVisible,
    setAcceptOrRemoveFriendModalVisible,
    selectedUser,
  } = props;
  const { theme } = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={acceptOrRemoveFriendModalVisible}
      onRequestClose={() => {
        dispatch(setAcceptOrRemoveFriendModalVisible(false));
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
          {selectedUser?.pending ? (
            <Text
              style={{
                color: theme.primaryColor,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Accept friendship request from {selectedUser?.name}?
            </Text>
          ) : (
            <Text
              style={{
                color: theme.primaryColor,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Remove {selectedUser?.name} from friends?
            </Text>
          )}
          <Pressable
            style={{
              backgroundColor: theme.primaryColor,
              borderRadius: 20,
              padding: 10,
              elevation: 2,
            }}
            onPressIn={() => Vibration.vibrate(10)}
            onPress={() => {
              dispatch(setAcceptOrRemoveFriendModalVisible(false));
              dispatch(sendFriendshipAction({ userMail: selectedUser.email }));
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
  );
};

export default AcceptOrRemoveFriendModal;
