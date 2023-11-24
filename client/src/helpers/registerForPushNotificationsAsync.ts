// expo notifications
async function registerForPushNotificationsAsync(Notifications: any) {
  let deviceToken;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }
  deviceToken = (await Notifications.getExpoPushTokenAsync()).data;
  // console.log("deviceToken:", deviceToken);

  return deviceToken;
}

export default registerForPushNotificationsAsync;
