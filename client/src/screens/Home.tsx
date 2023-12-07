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
import { useTheme } from "../context/ThemeContext";

const Home = memo(
  (props: {
    refreshCurrentUsersTodayHabits: Function;
    dispatch: Function;
    updateHabitCompletedDateAction: Function;
    notificationSendAction: Function;
    currentUser: { firstName: string; friends: object[]; pending: boolean };
    allHabits: [];
    allHabitsNumber: number;
    currentHabitDatesIncluded: [];
    habitLoading: boolean;
    tempBarFilled: [boolean];
    setTempBarFilled: Function;
    refreshing: boolean;
    setRefreshing: Function;
    selectedItem: string;
  }) => {
    const {
      refreshCurrentUsersTodayHabits,
      dispatch,
      updateHabitCompletedDateAction,
      notificationSendAction,
      currentUser,
      allHabits,
      allHabitsNumber,
      currentHabitDatesIncluded,
      habitLoading,
      tempBarFilled,
      setTempBarFilled,
      refreshing,
      setRefreshing,
      selectedItem,
    } = props;
    const { theme } = useTheme();

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

    if (habitLoading) {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: theme.backgroundColor,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.primaryText }}>Loading...</Text>
          <SkeletonPlaceholder width={372} height={48} radius={20} />
        </View>
      );
    } else if (!habitLoading && allHabitsNumber === 0) {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView
            style={{
              marginBottom: 0,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() =>
                  refreshCurrentUsersTodayHabits(
                    setRefreshing,
                    setTempBarFilled,
                    currentHabitDatesIncluded
                  )
                }
              />
            }
          >
            <TextInput
              style={{
                height: 29.5,
                paddingLeft: 20,
                color: theme.fadedShadowColor,
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
    } else if (!habitLoading && allHabitsNumber > 0 && tempBarFilled) {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: theme.backgroundColor,
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
                onRefresh={() =>
                  refreshCurrentUsersTodayHabits(
                    setRefreshing,
                    setTempBarFilled,
                    currentHabitDatesIncluded
                  )
                }
              />
            }
          >
            <View style={{ paddingTop: 20 }}></View>
            {/* <Text>Habits</Text> */}
            <HabitBarParent
              dispatch={dispatch}
              updateHabitCompletedDateAction={updateHabitCompletedDateAction}
              notificationSendAction={notificationSendAction}
              currentUser={currentUser}
              allHabits={allHabits}
              tempBarFilled={tempBarFilled}
              // setHomeEditBool={setHomeEditBool}
              selectedItem={selectedItem}
              // setSelectedItem={setSelectedItem}
              handleHabitClicked={handleHabitClicked}
              // setEditHabitSelected={setEditHabitSelected}
              // setHabitNameState={setHabitNameState}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            backgroundColor: theme.backgroundColor,
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
