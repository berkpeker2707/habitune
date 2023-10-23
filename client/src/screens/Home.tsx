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

import SkeletonPlaceholder from "../components/home/SkeletonPlaceholder";
import ShareOpened from "../components/add/shareComponents/ShareOpened";
import { notificationSendAction } from "../state/notificationSlice";
import HabitBarParent from "../components/home/HabitBarParent";

const Home = memo((props: any) => {
  const {
    navigation,
    homeEditState,
    dispatch,
    currentUser,
    allHabits,
    allHabitsNumber,
    currentHabitDatesIncluded,
    habitLoading,
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
                habitLoading={habitLoading}
                allHabitsNumber={allHabitsNumber}
                tempBarFilled={tempBarFilled}
                dispatch={dispatch}
                // item={item}
                allHabits={allHabits}
                // index={index}
                // tempBarFilled={tempBarFilled}
                currentUser={currentUser}
                homeEditState={homeEditState}
                navigation={navigation}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                updateHabitCompletedDateAction={updateHabitCompletedDateAction}
                notificationSendAction={notificationSendAction}
                handleHabitClicked={handleHabitClicked}
                nameChangable={nameChangable}
                setNameChangable={setNameChangable}
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
    </>
  );
});

export default Home;
