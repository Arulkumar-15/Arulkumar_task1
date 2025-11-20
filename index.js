/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// Register background handler - must be done outside of any component
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  
  // You can perform any background task here
  // For example: update local database, show notification, etc.
});

AppRegistry.registerComponent(appName, () => App);
