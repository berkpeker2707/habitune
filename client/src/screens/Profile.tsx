import * as React from "react";
import { ScrollView, View } from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import AddFriendsButton from "../components/profile/AddFriendsButton";
import {
  fetchCurrentUserProfileAction,
  selectFetchCurrentUserProfile,
} from "../state/userSlice";
import { useAppDispatch, useSelector } from "../state/store";
import { useEffect } from "react";

const Profile = () => {
  const controller = new AbortController();

  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectFetchCurrentUserProfile);

  useEffect(() => {
    dispatch(fetchCurrentUserProfileAction());

    return () => {
      controller.abort();
    };
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
      >
        <ProfileCard
          name={currentUser.firstName}
          email={currentUser.email}
          image={currentUser.image}
        />
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
                key={index}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
