import * as React from "react";
import { RefreshControl, ScrollView, TextInput, View } from "react-native";
import DotGraphBar from "./DotGraphBar";
import SkeletonPlaceholder from "../home/SkeletonPlaceholder";
import { fetchAllHabitsAction } from "../../state/habitSlice";
import { useCallback } from "react";

import uuid from "react-native-uuid";

const DotGraph = (props: any) => {
  const {
    dispatch,
    allHabits,
    allHabitsNumber,
    habitUpdated,
    habitLoading,
    isItCurrentUser,
  } = props;

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

  var allHabitDatesDots: Array<boolean> = [];
  for (var i = 0; i < allHabits.length; i++) {
    allHabitDatesDots.push(isInArray(allHabits[i].dates, today));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, OneDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, TwoDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, ThreeDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, FourDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, FiveDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, SixDayAgo));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    isItCurrentUser ? dispatch(fetchAllHabitsAction()) : "";
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
          {Array(allHabitsNumber)
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
