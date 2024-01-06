import * as React from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import DotGraphBar from "./DotGraphBar";
import SkeletonPlaceholder from "../skeleton/SkeletonPlaceholder";
import uuid from "react-native-uuid";
import { useTheme } from "../../context/ThemeContext";
import {
  allHabitsNumber,
  selectAllHabitDatesDots,
  selectHabitLoading,
  selectHabits,
  selectedOverviewHabit,
  setSelectedOverviewHabit,
} from "../../state/habitSlice";
import { useAppDispatch, useSelector } from "../../state/store";

const DotGraph = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const habitLoading = useSelector(selectHabitLoading);
  const allHabits = useSelector(selectHabits);
  const allHabitsNumberState = useSelector(allHabitsNumber);
  const allHabitDatesDots = useSelector(selectAllHabitDatesDots);
  const selectedOverviewHabitState = useSelector(selectedOverviewHabit);

  return (
    <View
      style={{
        display: "flex",
        // height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!habitLoading && allHabitDatesDots && allHabitsNumberState > 0 ? (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
        >
          <Text style={{ textAlign: "center", paddingLeft: 20 }}>
            <Text
              style={{
                height: 29.5,
                color: theme.fadedShadowColor,
                fontSize: 16,
              }}
            >
              All Habits
            </Text>
            <Text
              style={{
                height: 29.5,
                color: theme.fadedShadowColor,
                fontSize: 14,
              }}
            >
              🐌
            </Text>
          </Text>
          {allHabits.map((allHabitsItem: any, allHabitsIndex: number) => (
            <TouchableOpacity
              // activeOpacity={1}
              key={uuid.v4() as string}
              onPress={() =>
                selectedOverviewHabitState === allHabitsIndex
                  ? ""
                  : dispatch(setSelectedOverviewHabit(null))
              }
              onLongPress={() =>
                dispatch(setSelectedOverviewHabit(allHabitsIndex))
              }
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
                  selectedOverviewHabitState === allHabitsIndex ? true : false
                }
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
          <Text style={{ textAlign: "center", paddingLeft: 20 }}>
            <Text
              style={{
                height: 29.5,
                color: theme.fadedShadowColor,
                fontSize: 16,
              }}
            >
              All Habits
            </Text>
            <Text
              style={{
                height: 29.5,
                color: theme.fadedShadowColor,
                fontSize: 14,
              }}
            >
              🐌
            </Text>
          </Text>
          <SkeletonPlaceholder width={345} height={39.5} radius={0} />
        </ScrollView>
      ) : (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
        >
          <Text
            style={{
              height: 29.5,
              paddingLeft: 20,
              color: theme.fadedShadowColor,
              textAlign: "center",
            }}
          >
            All Habits Empty 😔
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default DotGraph;
