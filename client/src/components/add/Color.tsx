import * as React from "react";
import { memo, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Color = memo((props: any) => {
  const [color, setColor] = useState<String>();

  //updating params if color changes starts
  useEffect(() => {
    props.navigation.setParams({
      color: color,
    });
  }, [color]);
  //updating params if color changes ends

  return (
    <>
      <TextInput
        style={{
          height: 29.5,
          paddingLeft: 20,
          color: "#444",
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
          borderColor: color ? "#968EB0" : "red",
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
            backgroundColor: "#9DB2CE",
          }}
          onPress={() =>
            color?.includes("#9DB2CE")
              ? setColor(() => "")
              : setColor(() => "#9DB2CE")
          }
        >
          {/* marking starts */}
          {color?.includes("#9DB2CE") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#9DB2CE"
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
            backgroundColor: "#A5D2AC",
          }}
          onPress={() =>
            color?.includes("#A5D2AC")
              ? setColor(() => "")
              : setColor(() => "#A5D2AC")
          }
        >
          {/* marking starts */}
          {color?.includes("#A5D2AC") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#A5D2AC"
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
            backgroundColor: "#C04F43",
          }}
          onPress={() =>
            color?.includes("#C04F43")
              ? setColor(() => "")
              : setColor(() => "#C04F43")
          }
        >
          {/* marking starts */}
          {color?.includes("#C04F43") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#C04F43"
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
            backgroundColor: "#968EB0",
          }}
          onPress={() =>
            color?.includes("#968EB0")
              ? setColor(() => "")
              : setColor(() => "#968EB0")
          }
        >
          {/* marking starts */}
          {color?.includes("#968EB0") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#968EB0"
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
            backgroundColor: "#F59732",
          }}
          onPress={() =>
            color?.includes("#F59732")
              ? setColor(() => "")
              : setColor(() => "#F59732")
          }
        >
          {/* marking starts */}
          {color?.includes("#F59732") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#F59732"
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
            backgroundColor: "#99BB42",
          }}
          onPress={() =>
            color?.includes("#99BB42")
              ? setColor(() => "")
              : setColor(() => "#99BB42")
          }
        >
          {/* marking starts */}
          {color?.includes("#99BB42") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#99BB42"
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
            backgroundColor: "#F1867E",
          }}
          onPress={() =>
            color?.includes("#F1867E")
              ? setColor(() => "")
              : setColor(() => "#F1867E")
          }
        >
          {/* marking starts */}
          {color?.includes("#F1867E") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#F1867E"
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
            backgroundColor: "#FCCA1B",
          }}
          onPress={() =>
            color?.includes("#FCCA1B")
              ? setColor(() => "")
              : setColor(() => "#FCCA1B")
          }
        >
          {/* marking starts */}
          {color?.includes("#FCCA1B") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#FCCA1B"
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
            backgroundColor: "#6EA8D8",
          }}
          onPress={() =>
            color?.includes("#6EA8D8")
              ? setColor(() => "")
              : setColor(() => "#6EA8D8")
          }
        >
          {/* marking starts */}
          {color?.includes("#6EA8D8") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#6EA8D8"
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
            backgroundColor: "#4D6691",
          }}
          onPress={() =>
            color?.includes("#4D6691")
              ? setColor(() => "")
              : setColor(() => "#4D6691")
          }
        >
          {/* marking starts */}
          {color?.includes("#4D6691") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#4D6691"
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
            backgroundColor: "#DEB4CF",
          }}
          onPress={() =>
            color?.includes("#DEB4CF")
              ? setColor(() => "")
              : setColor(() => "#DEB4CF")
          }
        >
          {/* marking starts */}
          {color?.includes("#DEB4CF") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#DEB4CF"
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
            backgroundColor: "#F6AF90",
          }}
          onPress={() =>
            color?.includes("#F6AF90")
              ? setColor(() => "")
              : setColor(() => "#F6AF90")
          }
        >
          {/* marking starts */}
          {color?.includes("#F6AF90") ? (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#F6AF90"
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
