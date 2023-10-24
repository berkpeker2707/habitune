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

  const OneDayAgo = new Date(today.getTime() - 86400000 * 1);
  const TwoDayAgo = new Date(today.getTime() - 86400000 * 2);
  const ThreeDayAgo = new Date(today.getTime() - 86400000 * 3);
  const FourDayAgo = new Date(today.getTime() - 86400000 * 4);
  const FiveDayAgo = new Date(today.getTime() - 86400000 * 5);
  const SixDayAgo = new Date(today.getTime() - 86400000 * 6);

  function convertUTCDateToLocalDate(date: any) {
    var newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
  }

  //${date from api} compares to ${date of today}
  const isInArray = (array: any[], value: any) => {
    return array.some((item) => {
      var elemHave = new Date(convertUTCDateToLocalDate(new Date(item)));
      var elemToday = new Date(convertUTCDateToLocalDate(value));

      const msBetweenDates = Math.abs(elemHave.getTime() - elemToday.getTime());

      //convert ms to hours(min sec ms)
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

      if (hoursBetweenDates < 24) {
        // console.log("date is within 24 hours");
        return true;
      } else {
        // console.log("date is NOT within 24 hours");
        return false;
      }
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
