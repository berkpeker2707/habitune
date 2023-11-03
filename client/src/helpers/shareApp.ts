import { Share } from "react-native";

const onShare = async () => {
  try {
    const result = await Share.share({
      title: "App link",
      message: `Join me in Habitune!\n https://play.google.com/store/apps/details?id=com.thelittleteaclipper.habitune`,
      url: "https://play.google.com/store/apps/details?id=com.thelittleteaclipper.habitune",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log(error);
  }
};

export default onShare;
