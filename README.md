# README STILL IN PROGRESS...

## APP PREVIEW

<details>
  <summary>Login</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962836-bad05767-a977-4d16-ae4f-d1f592d95469.jpg" width="400" title="Home">
  
</details>
<details>
  <summary>Home</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962834-abef1cbb-fefb-4522-ac0f-600931e4fc13.jpg" width="400" title="Home">
  
</details>
<details>
  <summary>Home Edit</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962831-371b3226-d567-4ae1-b134-a2073704f7ee.jpg" width="400" title="Home">
  
</details>
<details>
  <summary>Add</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962827-282a3901-204f-4da3-8384-2b956da82f8d.jpg" width="400" title="Home">
  
</details>
<details>
  <summary>Add Calendar</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962820-350dc24f-6219-4f7f-908c-f182dee1cc0e.jpg" width="400" title="Home">
  
</details>
<details>
  <summary>Overview</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962841-2ceccd2b-24a6-420e-9d02-5c22c9d25352.jpg" width="400" title="Home">
  
</details>
<details>
  <summary>Settings</summary>
  
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/15816386/266962842-2032fbd9-b25f-412f-82c7-833ec58b560a.jpg" width="400" title="Home">
  
</details>

## API SIDE NOTES

To Run Docker Image
(change version :1.0 of new images)

- docker build -t habitunecontainer:1.0 .

To Build the Docker Image

- docker run -d -p 1111:1111 habitunecontainer:1.0
  (docker port is usually same with the api, but you can expose different port)

## Google Integration Links:

https://www.habitune.net

https://www.habitune.net/api/user/google/callback

http://localhost:1111/api

http://localhost:1111/api/user/google/callback

## CLIENT SIDE NOTES

// color1: #968EB0
// color2: #9DB2CE
// color3: #C04F43
// color4: #A5D2AC
// color5: #99BB42
// color6: #F59732
// color7: #F1867E
// color8: #FCCA1B
// color9: #4D6691
// color10: #6EA8D8
// color11: #DEB4CF
// color12: #F6AF90

### Client Side Development Notes:

"ipconfig" to check netowork
setx /M REACT_NATIVE_PACKAGER_HOSTNAME 192.168.1.33

Extra libraries to "create-expo-app ." fresh start:
npm install @react-native-async-storage/async-storage @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack @reduxjs/toolkit axios expo-application expo-auth-session expo-web-browser react-native-gesture-handler react-native-paper react-native-paper-dates react-native-render-html react-native-safe-area-context react-native-screens react-native-svg react-native-webview react-redux redux-persist expo-linear-gradient
npx expo install expo-linear-gradient
npm i moti --legacy-peer-deps
npm install lottie-react-native @types/react-lottie
expo install react-native-svg

Expo Dev Client Deployment (Stream)

1. npx create-expo-app .
2. eas configure
   Select "all" then check, eas.json file for "developmentClient": true".
3. npx expo prebuild
4. eas build --profile development --platform android
   Then install the apk file.
5. npx expo start --dev-client
6. Then scan QR code and check if live server is connected to expo go build project.
   Sources: https://docs.expo.dev/develop/development-builds/create-a-build/?redirected
   https://blog.expo.dev/the-new-expo-cli-f4250d8e3421

If device does not have app:
npx expo start
https://docs.expo.dev/get-started/expo-go/

If app cannot find development server, probably network adress is changed:
https://stackoverflow.com/questions/42064283/could-not-connect-to-react-native-development-server-on-android/42064719#42064719
