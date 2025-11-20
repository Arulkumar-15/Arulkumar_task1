/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// @ts-ignore - Module resolution issue in TypeScript, but packages are installed
import { NavigationContainer } from '@react-navigation/native';
// @ts-ignore - Module resolution issue in TypeScript, but packages are installed
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// @ts-ignore - Module resolution issue in TypeScript, but packages are installed
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PostsScreen from './screens/PostsScreen';
import { initializePushNotifications } from './services/pushNotification';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: { userName?: string };
  Posts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
type PostsScreenProps = NativeStackScreenProps<RootStackParamList, 'Posts'>;

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  useEffect(() => {
    // Initialize push notifications
    const setupPushNotifications = async () => {
      try {
        const result = await initializePushNotifications();
        if (result && result.token) {
          console.log('Push notifications initialized successfully');
          console.log('FCM Token:', result.token);
          
          // TODO: Send token to your backend server
          // Example: await api.post('/users/fcm-token', { token: result.token });
        } else {
          console.log('Push notifications initialization failed');
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    };

    setupPushNotifications();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.primary}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {!isLoggedIn ? (
              <Stack.Screen 
                name="Login"
                options={{ headerShown: false }}
              >
                {(props: LoginScreenProps) => (
                  <LoginScreen
                    {...props}
                    onLoginSuccess={() => setIsLoggedIn(true)}
                  />
                )}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen 
                  name="Dashboard"
                  options={{ headerShown: false }}
                >
                  {(props: DashboardScreenProps) => <DashboardScreen {...props} userName="John Doe" />}
                </Stack.Screen>
                <Stack.Screen 
                  name="Posts" 
                  options={{
                    headerShown: true,
                    title: 'Posts',
                  }}
                >
                  {(props: PostsScreenProps) => <PostsScreen {...props} />}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
