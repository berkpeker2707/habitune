import * as React from "react";
import { RefreshControl, ScrollView, TextInput, View } from "react-native";
import DotGraphBar from "./DotGraphBar";
import SkeletonPlaceholder from "../home/SkeletonPlaceholder";
import { fetchAllHabitsAction } from "../../state/habitSlice";
import { useAppDispatch } from "../../state/store";
import { useCallback } from "react";

import uuid from "react-native-uuid";

const DotGraph = (props: any) => {
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
    return array.some((item) => {
      return new Date(item).getTime() == value.getTime();
    });
  };

  var allHabitDatesDots: Array<boolean> = [];
  for (var i = 0; i < allHabits.length; i++) {
    allHabitDatesDots.push(isInArray(allHabits[i].dates, todayLocal));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, OneDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, TwoDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, ThreeDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, FourDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, FiveDayAgo));
    allHabitDatesDots.push(isInArray(allHabits[i].dates, SixDayAgo));
  }

  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAllHabitsAction());
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
