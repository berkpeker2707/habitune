import * as React from "react";
import DotGraphBarUnselected from "./DotGraphBarUnselected";
import DotGraphBarSelected from "./DotGraphBarSelected";

const DotGraphBar = (props: {
  name: string;
  color: string;
  allHabitDatesDots: Array<boolean>;
  habitID: any;
  isHidden: boolean;
  selected: boolean;
  dispatch: Function;
  deleteHabitAction: Function;
  updateHabitColorAction: Function;
  updateHabitHiddenAction: Function;
  editHabitNameModal: boolean;
  setEditHabitNameModal: Function;
  overviewColorModal: boolean;
  setOverviewColorModal: Function;
  overviewColor: string;
  setOverviewColor: Function;
  setSelectedOverviewHabit: Function;
  updateHabitNameAction: Function;
  updateHabitSharedWithAction: Function;
  shareWithFriendListModal: boolean;
  setShareWithFriendListModal: Function;
  currentUser: any;
  shareWithFriendList: string[];
  setShareWithFriendList: Function;
}) => {
  const {
    name,
    color,
    allHabitDatesDots,
    habitID,
    isHidden,
    selected,
    dispatch,
    deleteHabitAction,
    updateHabitColorAction,
    updateHabitHiddenAction,
    editHabitNameModal,
    setEditHabitNameModal,
    overviewColorModal,
    setOverviewColorModal,
    overviewColor,
    setOverviewColor,
    setSelectedOverviewHabit,
    updateHabitNameAction,
    updateHabitSharedWithAction,
    shareWithFriendListModal,
    setShareWithFriendListModal,
    currentUser,
    shareWithFriendList,
    setShareWithFriendList,
  } = props;

  if (selected) {
    return (
      <DotGraphBarSelected
        name={name}
        habitID={habitID}
        isHidden={isHidden}
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
        updateHabitSharedWithAction={updateHabitSharedWithAction}
        shareWithFriendListModal={shareWithFriendListModal}
        setShareWithFriendListModal={setShareWithFriendListModal}
        currentUser={currentUser}
        shareWithFriendList={shareWithFriendList}
        setShareWithFriendList={setShareWithFriendList}
      />
    );
  } else {
    return (
      <DotGraphBarUnselected
        name={name}
        color={color}
        allHabitDatesDots={allHabitDatesDots}
      />
    );
  }
};

export default DotGraphBar;
