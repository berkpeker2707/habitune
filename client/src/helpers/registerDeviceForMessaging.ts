import messaging from "@react-native-firebase/messaging";

// fcm notifications
const registerDeviceForMessaging = async (
  dispatch: any,
  notificationUpdateTokenAction: any
) => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();

  dispatch(notificationUpdateTokenAction(token));
  // console.log("FCM Token: ", token);
};

export default registerDeviceForMessaging;
