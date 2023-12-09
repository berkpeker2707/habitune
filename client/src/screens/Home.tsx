import * as React from "react";
import { memo } from "react";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TextInput,
} from "react-native";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import HabitBarParent from "../components/home/HabitBarParent";
import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useSelector } from "../state/store";
import {
  allHabitsTodayNumber,
  refreshHabits,
  selectHabitLoading,
  selectHabitsTodayBoolean,
  tempBarFilled,
} from "../state/habitSlice";
import refreshCurrentUsersTodayHabits from "../helpers/refreshers/refreshCurrentUsersTodayHabits";

const Home = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const habitLoadingState = useSelector(selectHabitLoading);
  const refreshHabitsState = useSelector(refreshHabits);
  const tempBarFilledState = useSelector(tempBarFilled);
  const habitsTodayBoolean = useSelector(selectHabitsTodayBoolean);

  const allHabitsTodayNumberState = useSelector(allHabitsTodayNumber);

  if (habitLoadingState) {
    return (
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.primaryText }}>Loading...</Text>
        <SkeletonPlaceholder width={372} height={48} radius={20} />
      </View>
    );
  } else if (!habitLoadingState && allHabitsTodayNumberState === 0) {
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
        <ScrollView
          style={{
            marginBottom: 0,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshHabitsState}
              onRefresh={() =>
                refreshCurrentUsersTodayHabits(dispatch, habitsTodayBoolean)
              }
            />
          }
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
            Habits Empty 😔
          </TextInput>
        </ScrollView>
      </View>
    );
  } else if (
    !habitLoadingState &&
    allHabitsTodayNumberState > 0 &&
    tempBarFilledState
  ) {
    return (
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            marginBottom: 85,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshHabitsState}
              onRefresh={() =>
                refreshCurrentUsersTodayHabits(dispatch, habitsTodayBoolean)
              }
            />
          }
        >
          <View style={{ paddingTop: 20 }}></View>
          {/* <Text>Habits</Text> */}
          <HabitBarParent tempBarFilled={tempBarFilledState} />
        </ScrollView>
      </View>
    );
  } else {
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
        <Text>"I have no memory of this place..." 🧙🏻</Text>
      </View>
    );
  }
});

export default Home;
