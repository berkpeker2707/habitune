import * as React from "react";
import { memo } from "react";
import { TextInput, TouchableOpacity, Vibration, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch, useSelector } from "../../state/store";
import { color, setColor } from "../../state/habitSlice";

const Color = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const colorState = useSelector(color);

  return (
    <>
      <TextInput
        style={{
          height: 29.5,
          paddingLeft: 20,
          color: theme.fadedShadowColor,
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        Color
      </TextInput>
      <View
        style={{
          width: 345,
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          borderColor: colorState ? theme.borderColor : theme.warningColor,
          paddingLeft: 20,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 9,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor2,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor2)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor2))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor2) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor2}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 37,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor4,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor4)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor4))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor4) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor4}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 65,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor3,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor3)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor3))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor3) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor3}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 93,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor1,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor1)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor1))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor1) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor1}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 121,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor6,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor6)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor6))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor6) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor6}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 149,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor5,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor5)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor5))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor5) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor5}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 177,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor7,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor7)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor7))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor7) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor7}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 205,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor8,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor8)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor8))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor8) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor8}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 233,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor10,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor10)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor10))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor10) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor10}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 261,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor9,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor9)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor9))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor9) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor9}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 289,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor11,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor11)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor11))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor11) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor11}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 317,
            top: 9,
            borderRadius: 15,
            backgroundColor: theme.permaColor12,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            colorState?.includes(theme.permaColor12)
              ? dispatch(setColor(""))
              : dispatch(setColor(theme.permaColor12))
          }
        >
          {/* marking starts */}
          {colorState?.includes(theme.permaColor12) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.permaColor0}
                  stroke={theme.permaColor12}
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
        </TouchableOpacity>
      </View>
    </>
  );
});

export default Color;
