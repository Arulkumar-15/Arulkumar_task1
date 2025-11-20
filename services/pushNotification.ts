/**
 * Push Notification Service
 * Handles Firebase Cloud Messaging (FCM) setup and notifications
 */

import { Platform, PermissionsAndroid } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FCM_TOKEN_KEY = '@fcm_token';

/**
 * Request notification permission (iOS specific)
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('iOS notification permission granted:', authStatus);
      }
      return enabled;
    } else if (Platform.OS === 'android') {
      // Android 13+ requires notification permission
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // Below Android 13, permission is granted by default
    }
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Get FCM token
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    // Check if permission is granted
    const hasPermission = await checkNotificationPermission();
    if (!hasPermission) {
      console.log('Notification permission not granted');
      return null;
    }

    // Get FCM token
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);

    // Save token to AsyncStorage
    await AsyncStorage.setItem(FCM_TOKEN_KEY, fcmToken);

    return fcmToken;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Check if notification permission is granted
 */
export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().hasPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

/**
 * Initialize push notifications
 */
export const initializePushNotifications = async () => {
  try {
    // Request permission
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log('Notification permission denied');
      return null;
    }

    // Get FCM token
    const token = await getFCMToken();

    // Listen for token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
      console.log('FCM token refreshed:', newToken);
      await AsyncStorage.setItem(FCM_TOKEN_KEY, newToken);
      // TODO: Send new token to your backend server
    });

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Foreground notification:', remoteMessage);
        handleForegroundNotification(remoteMessage);
      },
    );

    // Handle background messages (app in background/quit state)
    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Background notification:', remoteMessage);
        // Handle the notification when app is in background
      },
    );

    // Handle notification opened app
    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Notification opened app:', remoteMessage);
        handleNotificationOpen(remoteMessage);
      },
    );

    // Check if app was opened by a notification
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      console.log('App opened by notification:', initialNotification);
      handleNotificationOpen(initialNotification);
    }

    return {
      token,
      unsubscribe: () => {
        unsubscribeTokenRefresh();
        unsubscribeForeground();
        unsubscribeNotificationOpened();
      },
    };
  } catch (error) {
    console.error('Error initializing push notifications:', error);
    return null;
  }
};

/**
 * Handle foreground notification
 */
const handleForegroundNotification = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  // Show a local notification or update UI
  const { notification, data } = remoteMessage;

  if (notification) {
    console.log('Notification Title:', notification.title);
    console.log('Notification Body:', notification.body);
  }

  if (data) {
    console.log('Notification Data:', data);
  }

  // You can display an in-app notification here using a library like react-native-toast-message
  // or update your app's state to show the notification
};

/**
 * Handle notification tap/open
 */
const handleNotificationOpen = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const { notification, data } = remoteMessage;

  console.log('User tapped notification:', notification?.title);

  // Navigate to specific screen based on notification data
  if (data) {
    // Example: Navigate to posts screen if notification contains post_id
    if (data.screen === 'Posts') {
      // You would call your navigation function here
      console.log('Navigate to Posts screen');
    }
  }
};

/**
 * Subscribe to a topic
 */
export const subscribeToTopic = async (topic: string): Promise<boolean> => {
  try {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to topic: ${topic}`);
    return true;
  } catch (error) {
    console.error(`Error subscribing to topic ${topic}:`, error);
    return false;
  }
};

/**
 * Unsubscribe from a topic
 */
export const unsubscribeFromTopic = async (topic: string): Promise<boolean> => {
  try {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from topic: ${topic}`);
    return true;
  } catch (error) {
    console.error(`Error unsubscribing from topic ${topic}:`, error);
    return false;
  }
};

/**
 * Get saved FCM token from storage
 */
export const getSavedFCMToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(FCM_TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error getting saved FCM token:', error);
    return null;
  }
};

/**
 * Delete FCM token
 */
export const deleteFCMToken = async (): Promise<boolean> => {
  try {
    await messaging().deleteToken();
    await AsyncStorage.removeItem(FCM_TOKEN_KEY);
    console.log('FCM token deleted');
    return true;
  } catch (error) {
    console.error('Error deleting FCM token:', error);
    return false;
  }
};

/**
 * Check if app has notification badge
 */
export const getNotificationBadgeCount = async (): Promise<number> => {
  try {
    if (Platform.OS === 'ios') {
      const badge = await messaging().getInitialNotification();
      return badge ? 1 : 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting badge count:', error);
    return 0;
  }
};

/**
 * Set notification badge count (iOS only)
 */
export const setNotificationBadgeCount = async (count: number): Promise<void> => {
  try {
    if (Platform.OS === 'ios') {
      await messaging().getInitialNotification();
    }
  } catch (error) {
    console.error('Error setting badge count:', error);
  }
};

export default {
  requestNotificationPermission,
  getFCMToken,
  checkNotificationPermission,
  initializePushNotifications,
  subscribeToTopic,
  unsubscribeFromTopic,
  getSavedFCMToken,
  deleteFCMToken,
  getNotificationBadgeCount,
  setNotificationBadgeCount,
};

