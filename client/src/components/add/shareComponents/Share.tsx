import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import ShareWithPurpleIcon from "./ShareWithPurpleIcon";
import ShareOpened from "./ShareOpened";

const Share = (props: any) => {
  const { currentUser } = props;
  const [openShare, setOpenShare] = useState(false);
  return (
    <>
      {!openShare ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPress={() => setOpenShare((openShare) => !openShare)}
          onBlur={() => setOpenShare((openShare) => !openShare)}
          onLongPress={() => setOpenShare((openShare) => !openShare)}
        >
          <ShareWithPurpleIcon textInputTitle={"Share With Your Friends"} />
        </TouchableOpacity>
      ) : (
        <ShareOpened navigation={props.navigation} currentUser={currentUser} />
      )}
    </>
  );
};

export default Share;
