import * as React from "react";
import { useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { View, ScrollView, RefreshControl } from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import AddFriendsButton from "../components/profile/AddFriendsButton";
import {
  fetchCurrentUserProfileAction,
  selectFetchCurrentUserProfile,
  selectUserUpdated,
} from "../state/userSlice";
import { useAppDispatch, useSelector } from "../state/store";

import uuid from "react-native-uuid";

const Profile = () => {
  const controller = new AbortController();

  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectFetchCurrentUserProfile);

  const updated = useSelector(selectUserUpdated);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCurrentUserProfileAction());

      return () => {
        controller.abort();
      };
    }, [updated])
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCurrentUserProfileAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View
      style={{
        // display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            backgroundColor: "#FFFFFF",
          }}
        >
          <AddFriendsButton />
          {currentUser &&
            currentUser.friends &&
            currentUser.friends.length > 0 &&
            currentUser.friends.map((friendElem: any, index: number) => (
              <FriendsCard
                name={friendElem.friend.firstName}
                image={friendElem.friend.image}
                i={index}
                key={uuid.v4() as string}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
