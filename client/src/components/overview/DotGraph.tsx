import * as React from "react";
import { useCallback } from "react";
import { RefreshControl, ScrollView, TextInput, View } from "react-native";
import DotGraphBar from "./DotGraphBar";
import SkeletonPlaceholder from "../skeleton/SkeletonPlaceholder";
import uuid from "react-native-uuid";

const DotGraph = (props: {
  dispatch: Function;
  fetchAllHabitsAction: Function;
  fetchAllHabitsOfSelectedUserAction: Function;
  allHabits: Array<any>;
  allHabitsNumber: number;
  habitLoading: boolean;
  refreshing: boolean;
  setRefreshing: Function;
  isItCurrentUser: boolean;
  allHabitDatesDots: Array<boolean>;
}) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    allHabits,
    allHabitsNumber,
    habitLoading,
    refreshing,
    setRefreshing,
    isItCurrentUser,
    allHabitDatesDots,
  } = props;

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    isItCurrentUser
      ? dispatch(fetchAllHabitsAction())
      : // : dispatch(fetchAllHabitsOfSelectedUserAction());
        "";
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      {!habitLoading && allHabitsNumber ? (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
            All Habits 🐌
          </TextInput>
          {allHabits.map((allHabitsItem: any, allHabitsIndex: number) => (
            <DotGraphBar
              key={uuid.v4() as string}
              name={allHabitsItem.name}
              color={allHabitsItem.color}
              allHabitDatesDots={allHabitDatesDots.slice(
                allHabitsIndex * 7,
                (allHabitsIndex + 1) * 7
              )}
            />
          ))}
        </ScrollView>
      ) : allHabitsNumber && allHabitsNumber > 0 ? (
        <ScrollView
          style={{
            marginBottom: 85,
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
            All Habits 🐌
          </TextInput>
          {/* {Array(allHabitsNumber)
            .fill(0)
            .map((_, i) => ( */}
          <SkeletonPlaceholder
            // key={i}
            colorMode={"light"}
            width={345}
            height={39.5}
            radius={0}
          />
          {/* ))} */}
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
              color: "#444",
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
