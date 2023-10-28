import * as React from "react";
import { useCallback } from "react";
import { ScrollView, TextInput } from "react-native";
import StreakBar from "./StreakGraphBar";

import uuid from "react-native-uuid";
import { View } from "moti";
import SkeletonPlaceholder from "../home/SkeletonPlaceholder";

const StreakGraph = (props: {
  allHabits: any;
  allHabitsNumber: number;
  habitUpdated: boolean;
  habitLoading: boolean;
  isInArray: Function;
}) => {
  const { allHabits, allHabitsNumber, habitUpdated, habitLoading, isInArray } =
    props;

  //date stuff starts
  const todayTemp = new Date();
  const today = new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate(),
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  );
  const OneDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 1,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const TwoDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 2,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const ThreeDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 3,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const FourDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 4,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const FiveDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 5,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const SixDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 6,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );

  var currentHabitWeekStreak = useCallback(
    allHabits.map((allHabitsItem: any) => {
      if (
        isInArray(allHabitsItem.dates, SixDayAgo) &&
        isInArray(allHabitsItem.dates, FiveDayAgo) &&
        isInArray(allHabitsItem.dates, FourDayAgo) &&
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, today)
      ) {
        return 7;
      } else if (
        isInArray(allHabitsItem.dates, FiveDayAgo) &&
        isInArray(allHabitsItem.dates, FourDayAgo) &&
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, today)
      ) {
        return 6;
      } else if (
        isInArray(allHabitsItem.dates, FourDayAgo) &&
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, today)
      ) {
        return 5;
      } else if (
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, today)
      ) {
        return 4;
      } else if (
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, today)
      ) {
        return 3;
      } else if (
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, today)
      ) {
        return 2;
      } else if (isInArray(allHabitsItem.dates, today)) {
        return 1;
      } else {
        return 0;
      }
    }),

    [allHabits, habitUpdated]
  );

  return (
    <View>
      {!habitLoading &&
      allHabitsNumber &&
      currentHabitWeekStreak.filter((currentHabitWeekStreakFilter: number) => {
        return currentHabitWeekStreakFilter !== 0;
      }).length ? (
        <View
          style={{
            display: "flex",
            // height: "100%",
            backgroundColor: "#FFFFFF",
            justifyContent: "flex-start",
            alignItems: "center",
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
            Streaks 🔥
          </TextInput>
          {allHabits.map((allHabitsItem: any, allHabitsIndex: number) => {
            return (
              <StreakBar
                key={uuid.v4() as string}
                name={allHabitsItem.name}
                color={allHabitsItem.color}
                currentHabitWeekStreak={currentHabitWeekStreak[allHabitsIndex]}
              />
            );
          })}
        </View>
      ) : currentHabitWeekStreak.filter(
          (currentHabitWeekStreakFilter: number) => {
            return currentHabitWeekStreakFilter !== 0;
          }
        ).length &&
        currentHabitWeekStreak.filter(
          (currentHabitWeekStreakFilter: number) => {
            return currentHabitWeekStreakFilter !== 0;
          }
        ).length > 0 ? (
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
            All Tasks 🐌
          </TextInput>
          {Array(
            currentHabitWeekStreak.filter(
              (currentHabitWeekStreakFilter: number) => {
                return currentHabitWeekStreakFilter !== 0;
              }
            ).length
          )
            .fill(0)
            .map((_, i) => (
              <SkeletonPlaceholder
                key={i}
                colorMode={"light"}
                width={345}
                height={39.5}
                radius={0}
              />
            ))}
          <SkeletonPlaceholder
            colorMode={"light"}
            width={345}
            height={29.5}
            radius={0}
          />
        </ScrollView>
      ) : (
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
            Streaks Empty 😔
          </TextInput>
        </ScrollView>
      )}
    </View>
  );
};

export default StreakGraph;
