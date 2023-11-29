import * as React from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import DotGraphBar from "./DotGraphBar";
import SkeletonPlaceholder from "../skeleton/SkeletonPlaceholder";
import uuid from "react-native-uuid";
import { useTheme } from "../../context/ThemeContext";

const DotGraph = (props: {
  dispatch: Function;
  fetchAllHabitsAction: Function;
  fetchAllHabitsOfSelectedUserAction: Function;
  deleteHabitAction: Function;
  allHabits: Array<any>;
  allHabitsNumber: number;
  habitLoading: boolean;
  refreshing: boolean;
  setRefreshing: Function;
  isItCurrentUser: boolean;
  allHabitDatesDots: Array<boolean>;
  selectedOverviewHabit: number;
  setSelectedOverviewHabit: Function;
  updateHabitColorAction: Function;
  overviewColorModal: boolean;
  setOverviewColorModal: Function;
  overviewColor: string;
  setOverviewColor: Function;
}) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    deleteHabitAction,
    allHabits,
    allHabitsNumber,
    habitLoading,
    refreshing,
    setRefreshing,
    isItCurrentUser,
    allHabitDatesDots,
    selectedOverviewHabit,
    setSelectedOverviewHabit,
    updateHabitColorAction,
    overviewColorModal,
    setOverviewColorModal,
    overviewColor,
    setOverviewColor,
  } = props;
  const { theme } = useTheme();

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   isItCurrentUser
  //     ? dispatch(
  //         fetchAllHabitsAction(
  //           new Date(
  //             new Date().getFullYear(),
  //             new Date().getMonth(),
  //             new Date().getDate(),
  //             new Date().getHours(),
  //             new Date().getMinutes(),
  //             new Date().getSeconds()
  //           ).getTime()
  //         )
  //       )
  //     : // : dispatch(fetchAllHabitsOfSelectedUserAction());
  //       "";
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

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
      {!habitLoading && allHabitDatesDots && allHabitsNumber > 0 ? (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
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
            All Habits 🐌
          </TextInput>
          {allHabits.map((allHabitsItem: any, allHabitsIndex: number) => (
            <TouchableOpacity
              activeOpacity={1}
              key={uuid.v4() as string}
              onLongPress={() => {
                setSelectedOverviewHabit(() => allHabitsIndex);
              }}
            >
              <DotGraphBar
                name={allHabitsItem.name}
                color={allHabitsItem.color}
                allHabitDatesDots={allHabitDatesDots.slice(
                  allHabitsIndex * 7,
                  (allHabitsIndex + 1) * 7
                )}
                habitID={allHabitsItem._id}
                selected={
                  selectedOverviewHabit === allHabitsIndex ? true : false
                }
                dispatch={dispatch}
                deleteHabitAction={deleteHabitAction}
                updateHabitColorAction={updateHabitColorAction}
                overviewColorModal={overviewColorModal}
                setOverviewColorModal={setOverviewColorModal}
                overviewColor={overviewColor}
                setOverviewColor={setOverviewColor}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : habitLoading ? (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
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
            All Habits 🐌
          </TextInput>
          <SkeletonPlaceholder width={345} height={39.5} radius={0} />
        </ScrollView>
      ) : (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
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
            All Habits Empty 😔
          </TextInput>
        </ScrollView>
      )}
    </View>
  );
};

export default DotGraph;
