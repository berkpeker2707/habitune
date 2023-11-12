import * as React from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Vibration,
  TextInput,
} from "react-native";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import ShareOpened from "../components/add/shareComponents/ShareOpened";
import HabitBarParent from "../components/home/HabitBarParent";

const Home = memo(
  (props: {
    dispatch: Function;
    fetchAllTodayHabitsAction: Function;
    updateHabitCompletedDateAction: Function;
    updateHabitSharedWithAction: Function;
    notificationSendAction: Function;
    currentUser: { firstName: string; friends: object[]; pending: boolean };
    allHabits: [];
    allHabitsNumber: number;
    currentHabitDatesIncluded: [];
    homeEditBool: boolean;
    setHomeEditBool: Function;
    habitLoading: boolean;
    tempBarFilled: [boolean];
    setTempBarFilled: Function;
    refreshing: boolean;
    setRefreshing: Function;
    shareWithFriendList: [any];
    setShareWithFriendList: Function;
    selectedItem: string;
    setSelectedItem: Function;
    modalVisible: boolean;
    setModalVisible: Function;
    setEditHabitSelected: Function;
    setHabitNameState: Function;
  }) => {
    const {
      dispatch,
      fetchAllTodayHabitsAction,
      updateHabitCompletedDateAction,
      updateHabitSharedWithAction,
      notificationSendAction,
      currentUser,
      allHabits,
      allHabitsNumber,
      currentHabitDatesIncluded,
      homeEditBool,
      setHomeEditBool,
      habitLoading,
      tempBarFilled,
      setTempBarFilled,
      refreshing,
      setRefreshing,
      shareWithFriendList,
      setShareWithFriendList,
      selectedItem,
      setSelectedItem,
      modalVisible,
      setModalVisible,
      setEditHabitSelected,
      setHabitNameState,
    } = props;

    const handleHabitClicked = useMemo(() => {
      return (index: number) => {
        const newHabitArray = tempBarFilled?.map((nH: any, i: number) => {
          if (i === index) {
            return !nH;
          } else {
            return nH;
          }
        });
        setTempBarFilled(newHabitArray);
      };
    }, [tempBarFilled, setTempBarFilled]);

    useEffect(() => {
      if (currentHabitDatesIncluded) {
        setTempBarFilled(() => [...currentHabitDatesIncluded]);
      }
    }, [currentHabitDatesIncluded, refreshing]);

    // useEffect(() => {
    //   setHomeEditBool(false);
    // }, []);

    useEffect(() => {
      if (homeEditBool === false) {
        setSelectedItem(() => "");
        setHabitNameState(() => "");
      }
    }, [homeEditBool]);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTempBarFilled(() => [...currentHabitDatesIncluded]);
      dispatch(
        fetchAllTodayHabitsAction(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          ).getTime()
        )
      );
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    if (habitLoading) {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: "#FFFFFF",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
          <SkeletonPlaceholder
            colorMode={"light"}
            width={372}
            height={48}
            radius={20}
          />
        </View>
      );
    } else if (!habitLoading && allHabitsNumber === 0) {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: "#FFFFFF",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ScrollView
            style={{
              marginBottom: 0,
            }}
          >
            <TextInput
              style={{
                height: 29.5,
                paddingLeft: 20,
                color: "#444",
                textAlign: "center",
              }}
              editable={false}
              selectTextOnFocus={false}
            >
              Habits Empty 😔
            </TextInput>
          </ScrollView>
        </View>
      );
    } else if (!habitLoading && allHabitsNumber > 0) {
      return (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              setHomeEditBool(false);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
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
                  currentUser={currentUser}
                  shareWithFriendList={shareWithFriendList}
                  setShareWithFriendList={setShareWithFriendList}
                />

                <Pressable
                  style={[
                    { borderRadius: 20, padding: 10, elevation: 2 },
                    { backgroundColor: "#968EB0" },
                  ]}
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    dispatch(
                      updateHabitSharedWithAction({
                        _id: selectedItem,
                        userId: shareWithFriendList[0],
                      })
                    );
                    setHomeEditBool(false);
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
          <TouchableWithoutFeedback
            onBlur={() => {
              if (!modalVisible) {
                setHomeEditBool(false);
              }
            }}
          >
            <View
              style={{
                display: "flex",
                height: "100%",
                backgroundColor: "#FFFFFF",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <ScrollView
                style={{
                  marginBottom: 85,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <Text>Habits</Text>
                <HabitBarParent
                  dispatch={dispatch}
                  updateHabitCompletedDateAction={
                    updateHabitCompletedDateAction
                  }
                  notificationSendAction={notificationSendAction}
                  currentUser={currentUser}
                  allHabits={allHabits}
                  tempBarFilled={tempBarFilled}
                  setHomeEditBool={setHomeEditBool}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  handleHabitClicked={handleHabitClicked}
                  setEditHabitSelected={setEditHabitSelected}
                  setHabitNameState={setHabitNameState}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </>
      );
    } else {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>"I have no memory of this place..." 🧙🏻</Text>
        </View>
      );
    }
  }
);

export default Home;
