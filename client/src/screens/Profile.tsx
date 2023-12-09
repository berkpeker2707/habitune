import * as React from "react";
import { memo } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import AddFriendsButton from "../components/profile/AddFriendsButton";
import uuid from "react-native-uuid";
import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useSelector } from "../state/store";
import {
  acceptOrRemoveFriendModalVisible,
  refreshUser,
  selectFetchCurrentUserProfile,
  selectedUser,
  setAcceptOrRemoveFriendModalVisible,
} from "../state/userSlice";
import refreshCurrentUser from "../helpers/refreshers/refreshCurrentUser";
import AcceptOrRemoveFriendModal from "../components/modals/AcceptOrRemoveFriendModal";

const Profile = memo((props: { navigation: any }) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectFetchCurrentUserProfile);
  const refreshUserState = useSelector(refreshUser);
  const acceptOrRemoveFriendModalVisibleState = useSelector(
    acceptOrRemoveFriendModalVisible
  );
  const selectedUserState = useSelector(selectedUser);

  return currentUser.friends ? (
    <View
      style={{
        // display: "flex",
        height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshUserState}
            onRefresh={() => refreshCurrentUser(dispatch)}
          />
        }
      >
        {currentUser &&
          currentUser.firstName &&
          currentUser.email &&
          currentUser.image && (
            <ProfileCard
              name={currentUser.firstName}
              email={currentUser.email}
              image={currentUser.image}
            />
          )}
        <View
          style={{
            width: 345,
            backgroundColor: theme.backgroundColor,
          }}
        >
          <AddFriendsButton />
          <AcceptOrRemoveFriendModal
            dispatch={dispatch}
            acceptOrRemoveFriendModalVisible={
              acceptOrRemoveFriendModalVisibleState
            }
            setAcceptOrRemoveFriendModalVisible={
              setAcceptOrRemoveFriendModalVisible
            }
            selectedUser={selectedUserState}
          />
          {currentUser &&
            currentUser.friends &&
            currentUser.friends.length > 0 &&
            currentUser.friends.map((friendElem: any, index: number) => (
              <FriendsCard
                navigation={navigation}
                key={uuid.v4() as string}
                friendElemID={friendElem.friend._id}
                name={friendElem.friend.firstName}
                image={friendElem.friend.image}
                email={friendElem.friend.email}
                pending={friendElem.pending}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  ) : (
    <></>
  );
});

export default Profile;
