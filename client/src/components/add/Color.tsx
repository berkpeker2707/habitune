import * as React from "react";
import { memo } from "react";
import { TextInput, TouchableOpacity, Vibration, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const Color = memo((props: { color: string; setColor: Function }) => {
  const { color, setColor } = props;
  const { theme } = useTheme();

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
          borderColor: color ? theme.borderColor : theme.warningColor,
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
            backgroundColor: theme.color2,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color2)
              ? setColor(() => "")
              : setColor(() => theme.color2)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color2) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color2}
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
            backgroundColor: theme.color4,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color4)
              ? setColor(() => "")
              : setColor(() => theme.color4)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color4) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color4}
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
            backgroundColor: theme.color3,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color3)
              ? setColor(() => "")
              : setColor(() => theme.color3)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color3) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color3}
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
            backgroundColor: theme.color1,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color1)
              ? setColor(() => "")
              : setColor(() => theme.color1)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color1) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color1}
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
            backgroundColor: theme.color6,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color6)
              ? setColor(() => "")
              : setColor(() => theme.color6)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color6) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color6}
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
            backgroundColor: theme.color5,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color5)
              ? setColor(() => "")
              : setColor(() => theme.color5)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color5) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color5}
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
            backgroundColor: theme.color7,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color7)
              ? setColor(() => "")
              : setColor(() => theme.color7)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color7) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color7}
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
            backgroundColor: theme.color8,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color8)
              ? setColor(() => "")
              : setColor(() => theme.color8)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color8) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color8}
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
            backgroundColor: theme.color10,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color10)
              ? setColor(() => "")
              : setColor(() => theme.color10)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color10) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color10}
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
            backgroundColor: theme.color9,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color9)
              ? setColor(() => "")
              : setColor(() => theme.color9)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color9) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color9}
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
            backgroundColor: theme.color11,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color11)
              ? setColor(() => "")
              : setColor(() => theme.color11)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color11) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color11}
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
            backgroundColor: theme.color12,
          }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            color?.includes(theme.color12)
              ? setColor(() => "")
              : setColor(() => theme.color12)
          }
        >
          {/* marking starts */}
          {color?.includes(theme.color12) ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill={theme.color0}
                  stroke={theme.color12}
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
