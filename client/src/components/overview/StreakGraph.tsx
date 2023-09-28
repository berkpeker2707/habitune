import * as React from "react";
import { useCallback } from "react";
import { ScrollView, TextInput } from "react-native";
import StreakBar from "./StreakGraphBar";

import uuid from "react-native-uuid";
import { View } from "moti";
import SkeletonPlaceholder from "../home/SkeletonPlaceholder";

const StreakGraph = (props: any) => {
  const { allHabits, allHabitsNumber, habitUpdated, habitLoading } = props;

  //date stuff starts
  const todayTemp = new Date();
  const today = new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate()
  );

  const userTimezoneOffset = today.getTimezoneOffset() * 60000;

  const todayLocal = new Date(today.getTime() - userTimezoneOffset);
  const OneDayAgo = new Date(
    today.getTime() - 86400000 * 1 - userTimezoneOffset
  );
  const TwoDayAgo = new Date(
    today.getTime() - 86400000 * 2 - userTimezoneOffset
  );
  const ThreeDayAgo = new Date(
    today.getTime() - 86400000 * 3 - userTimezoneOffset
  );
  const FourDayAgo = new Date(
    today.getTime() - 86400000 * 4 - userTimezoneOffset
  );
  const FiveDayAgo = new Date(
    today.getTime() - 86400000 * 5 - userTimezoneOffset
  );
  const SixDayAgo = new Date(
    today.getTime() - 86400000 * 6 - userTimezoneOffset
  );

  //need this for setting default hour 21
  //if backend is not 21 but 00, remove this
  // const todayLocal21 = new Date(todayLocal.getTime() + 3600000 * 21);

  const isInArray = (array: any[], value: Date) => {
    return array.find((item) => {
      return new Date(item).getTime() == value.getTime();
    });
  };

  var currentHabitWeekStreak = useCallback(
    allHabits.map((allHabitsItem: any) => {
      if (
        isInArray(allHabitsItem.dates, SixDayAgo) &&
        isInArray(allHabitsItem.dates, FiveDayAgo) &&
        isInArray(allHabitsItem.dates, FourDayAgo) &&
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, todayLocal)
      ) {
        return 7;
      } else if (
        isInArray(allHabitsItem.dates, FiveDayAgo) &&
        isInArray(allHabitsItem.dates, FourDayAgo) &&
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, todayLocal)
      ) {
        return 6;
      } else if (
        isInArray(allHabitsItem.dates, FourDayAgo) &&
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, todayLocal)
      ) {
        return 5;
      } else if (
        isInArray(allHabitsItem.dates, ThreeDayAgo) &&
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, todayLocal)
      ) {
        return 4;
      } else if (
        isInArray(allHabitsItem.dates, TwoDayAgo) &&
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, todayLocal)
      ) {
        return 3;
      } else if (
        isInArray(allHabitsItem.dates, OneDayAgo) &&
        isInArray(allHabitsItem.dates, todayLocal)
      ) {
        return 2;
      } else if (isInArray(allHabitsItem.dates, todayLocal)) {
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
            backgroundColor: "red",
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
