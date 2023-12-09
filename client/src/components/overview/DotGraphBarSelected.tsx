import * as React from "react";
import { View, Text, Vibration, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ColorPaletteIcon from "../icons/ColorPaletteIcon";
import DeleteIcon from "../icons/DeleteIcon";
import EyeIcon from "../icons/EyeIcon";
import EditIcon from "../icons/EditIcon";
import UpdateHabitNameModal from "../modals/UpdateHabitNameModal";
import UpdateHabitColorModal from "../modals/UpdateHabitColorModal";
import UpdateHabitShareModal from "../modals/UpdateHabitShareModal";
import AddFriendIcon from "../icons/AddFriendIcon";
import { useAppDispatch, useSelector } from "../../state/store";
import {
  updateHabitHiddenAction,
  deleteHabitAction,
  setEditHabitNameModal,
  setOverviewColorModal,
  setSelectedOverviewHabit,
  setShareWithFriendListModal,
  editHabitNameModal,
  overviewColorModal,
  shareWithFriendListModal,
  color as colorFromSlice,
  shareWithFriendList,
} from "../../state/habitSlice";

const DotGraphBarSelected = (props: {
  name: string;
  habitID: any;
  isHidden: boolean;
}) => {
  const { name, habitID, isHidden } = props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const editHabitNameModalState = useSelector(editHabitNameModal);
  const overviewColorModalState = useSelector(overviewColorModal);
  const shareWithFriendListModalState = useSelector(shareWithFriendListModal);
  const colorState = useSelector(colorFromSlice);
  const shareWithFriendListState = useSelector(shareWithFriendList);

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
            {name.length > 15 ? `${name.substring(0, 15)}...` : name}
          </Text>
        </View>
        <View>
          <UpdateHabitNameModal
            name={name}
            habitID={habitID}
            editHabitNameModal={editHabitNameModalState}
          />
          <UpdateHabitColorModal
            name={name}
            habitID={habitID}
            overviewColorModal={overviewColorModalState}
            color={colorState}
          />
          <UpdateHabitShareModal
            name={name}
            habitID={habitID}
            shareWithFriendListModal={shareWithFriendListModalState}
            shareWithFriendList={shareWithFriendListState}
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
              onPress={() => {
                dispatch(setEditHabitNameModal(true));
              }}
            >
              <EditIcon />
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
              onPress={() => {
                dispatch(setShareWithFriendListModal(true));
              }}
            >
              <AddFriendIcon />
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
                dispatch(setOverviewColorModal(true));
              }}
            >
              <ColorPaletteIcon />
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
                dispatch(
                  updateHabitHiddenAction({
                    _id: habitID,
                    hidden: !isHidden,
                  })
                );
                dispatch(setSelectedOverviewHabit(null));
              }}
            >
              <EyeIcon hidden={isHidden} />
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
                dispatch(setSelectedOverviewHabit(null));
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
