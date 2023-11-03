import * as React from "react";

import FriendInner from "../components/friend/FriendInner";

const Friend = (props: any) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    allHabitsOfSelectedUser,
    allHabitsOfSelectedUserNumber,
    habitLoading,
    habitUpdated,
    refreshing,
    setRefreshing,
    isItCurrentUser,
    friendCurrentHabitWeekStreakState,
    friendAllHabitDatesDotsState,
  } = props;

  return (
    <FriendInner
      dispatch={dispatch}
      fetchAllHabitsAction={fetchAllHabitsAction}
      fetchAllHabitsOfSelectedUserAction={fetchAllHabitsOfSelectedUserAction}
      allHabitsOfSelectedUser={allHabitsOfSelectedUser}
      allHabitsOfSelectedUserNumber={allHabitsOfSelectedUserNumber}
      habitLoading={habitLoading}
      habitUpdated={habitUpdated}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
      isItCurrentUser={isItCurrentUser}
      friendCurrentHabitWeekStreakState={friendCurrentHabitWeekStreakState}
      friendAllHabitDatesDotsState={friendAllHabitDatesDotsState}
    />
  );
};

export default Friend;
