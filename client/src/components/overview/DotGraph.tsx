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
  updateHabitHiddenAction: Function;
  allHabits: Array<any>;
  allHabitsNumber: number;
  habitLoading: boolean;
  refreshing: boolean;
  setRefreshing: Function;
  allHabitDatesDots: Array<boolean>;
  selectedOverviewHabit: number;
  setSelectedOverviewHabit: Function;
  updateHabitColorAction: Function;
  editHabitNameModal: boolean;
  setEditHabitNameModal: Function;
  overviewColorModal: boolean;
  setOverviewColorModal: Function;
  overviewColor: string;
  setOverviewColor: Function;
  updateHabitNameAction: Function;
}) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    deleteHabitAction,
    updateHabitHiddenAction,
    allHabits,
    allHabitsNumber,
    habitLoading,
    refreshing,
    setRefreshing,
    allHabitDatesDots,
    selectedOverviewHabit,
    setSelectedOverviewHabit,
    updateHabitColorAction,
    editHabitNameModal,
    setEditHabitNameModal,
    overviewColorModal,
    setOverviewColorModal,
    overviewColor,
    setOverviewColor,
    updateHabitNameAction,
  } = props;
  const { theme } = useTheme();

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
                isHidden={allHabitsItem.isHidden}
                selected={
                  selectedOverviewHabit === allHabitsIndex ? true : false
                }
                dispatch={dispatch}
                deleteHabitAction={deleteHabitAction}
                updateHabitColorAction={updateHabitColorAction}
                updateHabitHiddenAction={updateHabitHiddenAction}
                editHabitNameModal={editHabitNameModal}
                setEditHabitNameModal={setEditHabitNameModal}
                overviewColorModal={overviewColorModal}
                setOverviewColorModal={setOverviewColorModal}
                overviewColor={overviewColor}
                setOverviewColor={setOverviewColor}
                setSelectedOverviewHabit={setSelectedOverviewHabit}
                updateHabitNameAction={updateHabitNameAction}
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
