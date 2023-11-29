import * as React from "react";
import { View, Text, Modal, Pressable, Vibration } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import ColorPaletteIcon from "../icons/ColorPaletteIcon";
import TopNavbarDeleteButton from "../navbarComponents/TopNavbarComponents/TopNavbarDeleteButton";
import Color from "../add/Color";
import EyeIcon from "../icons/EyeIcon";

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
  overviewColorModal: boolean;
  setOverviewColorModal: Function;
  overviewColor: string;
  setOverviewColor: Function;
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
    overviewColorModal,
    setOverviewColorModal,
    overviewColor,
    setOverviewColor,
  } = props;
  const { theme } = useTheme();
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={overviewColorModal}
        onRequestClose={() => {
          setOverviewColorModal(!overviewColorModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            backgroundColor: theme.fadedBackgroundColor,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: theme.backgroundColor,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: theme.fadedShadowColor,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Color color={overviewColor} setColor={setOverviewColor} />
            <Text
              style={{
                color: theme.primaryColor,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Change Color?
            </Text>
            <Pressable
              style={{
                backgroundColor: theme.primaryColor,
                borderRadius: 20,
                padding: 10,
                elevation: 2,
              }}
              onPressIn={() => Vibration.vibrate(10)}
              onPress={() => {
                dispatch(
                  updateHabitColorAction({
                    _id: habitID,
                    color: overviewColor,
                  })
                );
                setOverviewColorModal(!overviewColorModal);
              }}
            >
              <Text
                style={{
                  color: theme.backgroundColor,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Yes
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
          borderBottomColor: theme.primaryColor,
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
              fontSize: name.length > 23 ? 12 : 15,
              color: selected ? theme.warningColor : theme.fadedShadowColor,
            }}
          >
            {name}
          </Text>
        </View>
        {selected ? (
          <View>
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
                onPress={() =>
                  dispatch(
                    updateHabitHiddenAction({
                      _id: habitID,
                      hidden: !isHidden,
                    })
                  )
                }
              >
                <EyeIcon hidden={isHidden} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                padding: 5,
                left: 217,
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
                left: 267,
                top: 10,
                backgroundColor: theme.backgroundColor,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    deleteHabitAction({
                      _id: habitID,
                    })
                  )
                }
              >
                <TopNavbarDeleteButton />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 167,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                T
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 167,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[0]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 193,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                1
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 193,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[1]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 219,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                2
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 219,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[2]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 245,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                3
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 245,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[3]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 271,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                4
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 271,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[4]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 297,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                5
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 297,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[5]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 323,
                top: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: theme.fadedShadowColor,
                  fontStyle: "normal",
                }}
              >
                6
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                left: 323,
                top: 29,
                borderRadius: 15,
                backgroundColor: allHabitDatesDots[6]
                  ? color
                  : theme.backgroundColor,
                borderColor: color,
                borderWidth: 1,
              }}
            ></View>
          </>
        )}
      </View>
    </>
  );
};

export default DotGraphBar;
