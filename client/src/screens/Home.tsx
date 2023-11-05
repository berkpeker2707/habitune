import * as React from "react";
import { memo, useCallback, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import ShareOpened from "../components/add/shareComponents/ShareOpened";
import HabitBarParent from "../components/home/HabitBarParent";

const Home = memo((props: any) => {
  const {
    navigation,
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
    nameChangable,
    setNameChangable,
    text,
    onChangeText,
    modalVisible,
    setModalVisible,
  } = props;

  function handleHabitClicked(index: number) {
    const newHabitArray = tempBarFilled?.map((nH: any, i: number) => {
      if (i === index) {
        return !nH;
      } else {
        return nH;
      }
    });
    setTempBarFilled(newHabitArray);
  }

  useEffect(() => {
    if (currentHabitDatesIncluded) {
      setTempBarFilled(() => [...currentHabitDatesIncluded]);
    }
  }, [currentHabitDatesIncluded]);

  useEffect(() => {
    setHomeEditBool(false);
  }, []);

  useEffect(() => {
    if (homeEditBool === false) {
      setSelectedItem(() => "");
      setNameChangable(() => false);
    }
  }, [homeEditBool]);

  useEffect(() => {
    navigation.setParams({
      name: text,
    });
  }, [text]);

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
              currentUser={currentUser}
              shareWithFriendList={shareWithFriendList}
              setShareWithFriendList={setShareWithFriendList}
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
          setHomeEditBool(false);
        }}
        style={{ backgroundColor: "yellow" }}
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {!habitLoading &&
            allHabits &&
            allHabitsNumber > 0 &&
            tempBarFilled ? (
              <>
                <Text>Habits</Text>
                <HabitBarParent
                  navigation={navigation}
                  dispatch={dispatch}
                  updateHabitCompletedDateAction={
                    updateHabitCompletedDateAction
                  }
                  notificationSendAction={notificationSendAction}
                  currentUser={currentUser}
                  allHabits={allHabits}
                  tempBarFilled={tempBarFilled}
                  homeEditBool={homeEditBool}
                  setHomeEditBool={setHomeEditBool}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  handleHabitClicked={handleHabitClicked}
                  nameChangable={nameChangable}
                  setNameChangable={setNameChangable}
                  text={text}
                  onChangeText={onChangeText}
                />
              </>
            ) : allHabitsNumber && allHabitsNumber > 0 ? (
              <>
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
              </>
            ) : (
              <Text>Habits Empty 😔</Text>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
});

export default Home;
