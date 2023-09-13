import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import HabitBar from "../components/home/HabitBar";

import { useAppDispatch } from "../state/store";

import {
  fetchAllTodayHabitsAction,
  updateHabitCompletedDateAction,
} from "../state/habitSlice";

import uuid from "react-native-uuid";

import SkeletonPlaceholder from "../components/home/SkeletonPlaceholder";

const Home = memo((props: any) => {
  const {
    navigation,
    homeEditState,
    allHabits,
    allHabitsNumber,
    habitUpdated,
    habitLoading,
    currentHabitDatesIncluded,
  } = props;

  const dispatch = useAppDispatch();

  const [tempBarFilled, setTempBarFilled] = useState<Array<Boolean>>(() => [
    ...currentHabitDatesIncluded,
  ]);

  useEffect(() => {
    setTempBarFilled(() => [...currentHabitDatesIncluded]);
  }, [currentHabitDatesIncluded]);

  function handleHabitClicked(index: number) {
    const newHabitArray = tempBarFilled.map((nH, i) => {
      if (i === index) {
        return !nH;
      } else {
        return nH;
      }
    });
    setTempBarFilled(newHabitArray);
  }

  const [selectedItem, setSelectedItem] = useState("");
  const [nameChangable, setNameChangable] = useState(false);

  useEffect(() => {
    navigation.setParams({ homeEditState: false });
  }, []);

  useEffect(() => {
    if (homeEditState === false) {
      setSelectedItem(() => "");

      setNameChangable(() => false);
    }
  }, [homeEditState]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTempBarFilled(() => [...currentHabitDatesIncluded]);
    dispatch(fetchAllTodayHabitsAction());
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
          <Text>Habits</Text>
          {allHabits?.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                key={uuid.v4() as string}
                onPress={() => {
                  dispatch(
                    updateHabitCompletedDateAction({
                      _id: item._id,
                      date: Date.now(),
                    })
                  );

                  handleHabitClicked(index);
                }}
                onLongPress={() => {
                  setNameChangable(() => true);
                  homeEditState
                    ? navigation.setParams({
                        homeEditState: false,
                      })
                    : navigation.setParams({
                        homeEditState: true,
                        _id: item._id,
                      });
                  setSelectedItem(() =>
                    selectedItem === item._id.toString()
                      ? ""
                      : item._id.toString()
                  );
                }}
              >
                <HabitBar
                  item={item}
                  itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
                  filled={tempBarFilled[index]}
                  nameChangable={
                    item._id.toString() === selectedItem ? nameChangable : false
                  }
                  navigation={navigation}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : allHabitsNumber && allHabitsNumber > 0 ? (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
        >
          <Text>Habits</Text>
          {Array(allHabitsNumber)
            .fill(0)
            .map((_, i) => (
              <SkeletonPlaceholder
                key={i}
                colorMode={"light"}
                width={372}
                height={48}
                radius={20}
              />
            ))}
        </ScrollView>
      ) : (
        <ScrollView
          style={{
            marginBottom: 85,
          }}
        >
          <Text>Habits Empty :(</Text>
        </ScrollView>
      )}
    </View>
  );
});

export default Home;
