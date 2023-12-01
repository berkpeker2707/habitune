import * as React from "react";
import { View, Text, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import ColorPaletteIcon from "../icons/ColorPaletteIcon";
import DeleteIcon from "../icons/DeleteIcon";
import EyeIcon from "../icons/EyeIcon";
import EditIcon from "../icons/EditIcon";
import UpdateHabitNameModal from "../modals/UpdateHabitNameModal";
import UpdateHabitColorModal from "../modals/UpdateHabitColorModal";
import UpdateHabitShareModal from "../modals/UpdateHabitShareModal";
import AddFriendIcon from "../icons/AddFriendIcon";

const DotGraphBarSelected = (props: {
  name: string;
  habitID: any;
  isHidden: boolean;
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
    habitID,
    isHidden,
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
  const { theme } = useTheme();

  return (
    <>
      <View
        style={{
          width: 345,
          height: 39.5,
          paddingLeft: 20,
          marginBottom: 1,
          paddingBottom: 50,
          // borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          // borderTopColor: color,
          borderBottomColor: theme.warningColor,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: 36,
            width: 300,
            left: 7,
            top: 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 14,
              color: theme.warningColor,
              backgroundColor: theme.backgroundColor,
            }}
          >
            {name.length > 22 ? `${name.substring(0, 19)}...` : name}
          </Text>
        </View>
        <View>
          <UpdateHabitNameModal
            name={name}
            habitID={habitID}
            editHabitNameModal={editHabitNameModal}
            setEditHabitNameModal={setEditHabitNameModal}
            setSelectedOverviewHabit={setSelectedOverviewHabit}
            dispatch={dispatch}
            updateHabitNameAction={updateHabitNameAction}
          />
          <UpdateHabitColorModal
            name={name}
            habitID={habitID}
            overviewColorModal={overviewColorModal}
            setOverviewColorModal={setOverviewColorModal}
            overviewColor={overviewColor}
            setOverviewColor={setOverviewColor}
            dispatch={dispatch}
            updateHabitColorAction={updateHabitColorAction}
            setSelectedOverviewHabit={setSelectedOverviewHabit}
          />
          <UpdateHabitShareModal
            dispatch={dispatch}
            name={name}
            habitID={habitID}
            updateHabitSharedWithAction={updateHabitSharedWithAction}
            shareWithFriendListModal={shareWithFriendListModal}
            setShareWithFriendListModal={setShareWithFriendListModal}
            currentUser={currentUser}
            shareWithFriendList={shareWithFriendList}
            setShareWithFriendList={setShareWithFriendList}
          />
          <View
            style={{
              position: "absolute",
              padding: 8,
              left: 87,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() =>
                setShareWithFriendListModal(!shareWithFriendListModal)
              }
            >
              <AddFriendIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              padding: 8,
              left: 137,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => setEditHabitNameModal(!editHabitNameModal)}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              padding: 8,
              left: 187,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                dispatch(
                  updateHabitHiddenAction({
                    _id: habitID,
                    hidden: !isHidden,
                  })
                );
                setSelectedOverviewHabit(null);
              }}
            >
              <EyeIcon hidden={isHidden} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              padding: 8,
              left: 237,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                setOverviewColorModal(!overviewColorModal);
              }}
            >
              <ColorPaletteIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              padding: 8,
              left: 287,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                dispatch(
                  deleteHabitAction({
                    _id: habitID,
                  })
                );
                setSelectedOverviewHabit(null);
              }}
            >
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default DotGraphBarSelected;
