/**
 * Firebase Configuration
 * 
 * To use this configuration:
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Add Android app with package name: com.task
 * 3. Add iOS app with bundle ID: org.reactjs.native.example.Task
 * 4. Download google-services.json and place it in android/app/
 * 5. Download GoogleService-Info.plist and place it in ios/Task/
 * 6. Replace the values below with your Firebase project credentials
 */

export const firebaseConfig = {
  apiKey: "AIzaSyCVWHMSxDTqBJiXCixPAHPFTzy1QMW5OPo",
  authDomain: "alabtech-d316c.firebaseapp.com",
  projectId: "alabtech-d316c",
  storageBucket: "alabtech-d316c.firebasestorage.app",
  messagingSenderId: "8204948608",
  appId: "1:8204948608:android:f92730db9abd54a6f18265",
  measurementId: "G-XXXXXXXXXX" // Optional for Analytics - Replace with your measurement ID
};

// Firebase Cloud Messaging Server Key
// Get this from Firebase Console > Project Settings > Cloud Messaging > Server Key
export const FCM_SERVER_KEY = "YOUR_FCM_SERVER_KEY"; // Replace with your actual server key

export default firebaseConfig;

