import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Pressable,
  Modal,
} from "react-native";
import HabitBar from "../components/home/HabitBar";

import {
  fetchAllTodayHabitsAction,
  updateHabitCompletedDateAction,
  updateHabitSharedWithAction,
} from "../state/habitSlice";

import uuid from "react-native-uuid";

import SkeletonPlaceholder from "../components/home/SkeletonPlaceholder";
import ShareOpened from "../components/add/shareComponents/ShareOpened";
import { notificationSendAction } from "../state/notificationSlice";

const Home = memo((props: any) => {
  const {
    navigation,
    homeEditState,
    dispatch,
    currentUser,
    allHabits,
    allHabitsNumber,
    habitUpdated,
    habitLoading,
    currentHabitDatesIncluded,
    modalVisible,
    setModalVisible,
  } = props;

  const [tempBarFilled, setTempBarFilled] = useState<Array<Boolean>>();
  () => [];

  useEffect(() => {
    if (currentHabitDatesIncluded) {
      setTempBarFilled(() => [...currentHabitDatesIncluded]);
    }
  }, [currentHabitDatesIncluded]);

  function handleHabitClicked(index: number) {
    const newHabitArray = tempBarFilled?.map((nH, i) => {
      if (i === index) {
        return !nH;
      } else {
        return nH;
      }
    });
    setTempBarFilled(newHabitArray);
  }

  const [selectedItem, setSelectedItem] = useState("");
  const [nameChangable, setNameChangable] = useState(false);

  useEffect(() => {
    navigation.setParams({ homeEditState: false });
  }, []);

  useEffect(() => {
    if (homeEditState === false) {
      setSelectedItem(() => "");
      setNameChangable(() => false);
    }
  }, [homeEditState]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTempBarFilled(() => [...currentHabitDatesIncluded]);
    dispatch(fetchAllTodayHabitsAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
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
              navigation={props.navigation}
              currentUser={currentUser}
            />

            <Pressable
              style={[
                { borderRadius: 20, padding: 10, elevation: 2 },
                { backgroundColor: "#968EB0" },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                dispatch(
                  updateHabitSharedWithAction({
                    _id: navigation.getState().routes[0].params._id,
                    userId:
                      navigation.getState().routes[0].params.friendList[0],
                  })
                );
                navigation.setParams({ homeEditState: false });
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Share
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {!habitLoading && allHabits && allHabitsNumber > 0 && tempBarFilled ? (
          <ScrollView
            style={{
              marginBottom: 85,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text>Habits</Text>
            {allHabits.map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  key={uuid.v4() as string}
                  onPress={() => {
                    dispatch(
                      updateHabitCompletedDateAction({
                        _id: item._id,
                        date: Date.now(),
                      })
                    );
                    //only if habit is checked send notification
                    !tempBarFilled[index]
                      ? dispatch(
                          notificationSendAction({
                            imageUrl: "image",
                            friend: item.sharedWith.map(
                              (sharedWithIds: any) => sharedWithIds._id
                            ),
                            firstName: currentUser.firstName,
                            friendImage: item.sharedWith.map(
                              (sharedWithFriendImage: any) =>
                                sharedWithFriendImage.image
                            ),
                            habitName: item.name,
                            tokens: item.sharedWith.map(
                              (sharedWithTokens: any) =>
                                sharedWithTokens.fcmToken
                            ),
                          })
                        )
                      : "";
                    handleHabitClicked(index);
                  }}
                  onLongPress={() => {
                    setNameChangable(() => true);
                    homeEditState
                      ? navigation.setParams({
                          homeEditState: false,
                        })
                      : navigation.setParams({
                          homeEditState: true,
                          _id: item._id,
                        });
                    setSelectedItem(() =>
                      selectedItem === item._id.toString()
                        ? ""
                        : item._id.toString()
                    );
                  }}
                >
                  <HabitBar
                    item={item}
                    itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
                    filled={tempBarFilled[index]}
                    nameChangable={
                      item._id.toString() === selectedItem
                        ? nameChangable
                        : false
                    }
                    navigation={navigation}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : allHabitsNumber && allHabitsNumber > 0 ? (
          <ScrollView
            style={{
              marginBottom: 85,
            }}
          >
            <Text>Habits</Text>
            {Array(allHabitsNumber)
              .fill(0)
              .map((_, i) => (
                <SkeletonPlaceholder
                  key={i}
                  colorMode={"light"}
                  width={372}
                  height={48}
                  radius={20}
                />
              ))}
          </ScrollView>
        ) : (
          <ScrollView
            style={{
              marginBottom: 85,
            }}
          >
            <Text>Habits Empty 😔</Text>
          </ScrollView>
        )}
      </View>
    </>
  );
});

export default Home;
