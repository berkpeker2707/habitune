import * as React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import ColorPaletteIcon from "../icons/ColorPaletteIcon";
import TopNavbarDeleteButton from "../navbarComponents/TopNavbarComponents/TopNavbarDeleteButton";
import EyeIcon from "../icons/EyeIcon";
import EditIcon from "../icons/EditIcon";
import UpdateHabitNameModal from "./UpdateHabitNameModal";
import UpdateHabitColorModal from "./UpdateHabitColorModal";

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
          <View
            style={{
              position: "absolute",
              padding: 5,
              left: 107,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPress={() => setEditHabitNameModal(!editHabitNameModal)}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              padding: 5,
              left: 167,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
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
              padding: 5,
              left: 227,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
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
              padding: 5,
              left: 287,
              top: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  deleteHabitAction({
                    _id: habitID,
                  })
                );
                setSelectedOverviewHabit(null);
              }}
            >
              <TopNavbarDeleteButton />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default DotGraphBarSelected;
