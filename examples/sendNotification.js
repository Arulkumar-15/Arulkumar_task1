/**
 * Example Node.js script to send push notifications using Firebase Admin SDK
 * 
 * Setup:
 * 1. npm install firebase-admin
 * 2. Download your service account key from Firebase Console:
 *    Project Settings > Service Accounts > Generate New Private Key
 * 3. Save it as serviceAccountKey.json in this directory
 * 4. Run: node sendNotification.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
try {
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error.message);
  console.log('\nPlease ensure you have:');
  console.log('1. Installed firebase-admin: npm install firebase-admin');
  console.log('2. Downloaded serviceAccountKey.json from Firebase Console');
  console.log('3. Placed serviceAccountKey.json in the examples/ directory');
  process.exit(1);
}

/**
 * Send notification to a specific device
 */
async function sendToDevice(fcmToken, title, body, data = {}) {
  const message = {
    token: fcmToken,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      priority: 'high',
      notification: {
        sound: 'default',
        channelId: 'default_notification_channel',
        color: '#6200EE',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
          badge: 1,
          contentAvailable: true,
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('✅ Successfully sent notification to device:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error sending notification to device:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send notification to a topic
 */
async function sendToTopic(topic, title, body, data = {}) {
  const message = {
    topic: topic,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      priority: 'high',
      notification: {
        sound: 'default',
        channelId: 'default_notification_channel',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(`✅ Successfully sent notification to topic '${topic}':`, response);
    return { success: true, response };
  } catch (error) {
    console.error(`❌ Error sending notification to topic '${topic}':`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send notification to multiple devices
 */
async function sendToMultipleDevices(fcmTokens, title, body, data = {}) {
  const message = {
    tokens: fcmTokens,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      priority: 'high',
    },
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log(`✅ Successfully sent notification to ${response.successCount} devices`);
    
    if (response.failureCount > 0) {
      console.log(`⚠️  Failed to send to ${response.failureCount} devices`);
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          console.log(`   Device ${idx}: ${resp.error.message}`);
        }
      });
    }
    
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error sending multicast notification:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send data-only message (silent notification)
 */
async function sendDataMessage(fcmToken, data) {
  const message = {
    token: fcmToken,
    data: data,
    android: {
      priority: 'high',
    },
    apns: {
      payload: {
        aps: {
          contentAvailable: true,
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('✅ Successfully sent data message:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error sending data message:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send notification with image
 */
async function sendWithImage(fcmToken, title, body, imageUrl, data = {}) {
  const message = {
    token: fcmToken,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      notification: {
        imageUrl: imageUrl,
      },
    },
    apns: {
      payload: {
        aps: {
          mutableContent: 1,
        },
      },
      fcm_options: {
        image: imageUrl,
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('✅ Successfully sent notification with image:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error sending notification with image:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Subscribe devices to a topic
 */
async function subscribeToTopic(fcmTokens, topic) {
  try {
    const response = await admin.messaging().subscribeToTopic(fcmTokens, topic);
    console.log(`✅ Successfully subscribed ${response.successCount} devices to topic '${topic}'`);
    
    if (response.failureCount > 0) {
      console.log(`⚠️  Failed to subscribe ${response.failureCount} devices`);
    }
    
    return { success: true, response };
  } catch (error) {
    console.error(`❌ Error subscribing to topic '${topic}':`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Unsubscribe devices from a topic
 */
async function unsubscribeFromTopic(fcmTokens, topic) {
  try {
    const response = await admin.messaging().unsubscribeFromTopic(fcmTokens, topic);
    console.log(`✅ Successfully unsubscribed ${response.successCount} devices from topic '${topic}'`);
    
    if (response.failureCount > 0) {
      console.log(`⚠️  Failed to unsubscribe ${response.failureCount} devices`);
    }
    
    return { success: true, response };
  } catch (error) {
    console.error(`❌ Error unsubscribing from topic '${topic}':`, error.message);
    return { success: false, error: error.message };
  }
}

// Example usage
async function main() {
  console.log('\n📱 Firebase Push Notification Examples\n');
  console.log('═══════════════════════════════════════\n');

  // Replace with actual FCM token from your device
  const testToken = 'PASTE_YOUR_FCM_TOKEN_HERE';
  
  if (testToken === 'PASTE_YOUR_FCM_TOKEN_HERE') {
    console.log('⚠️  Please replace testToken with your actual FCM token');
    console.log('   You can get it from the app console logs\n');
    return;
  }

  // Example 1: Simple notification
  console.log('1️⃣  Sending simple notification...');
  await sendToDevice(
    testToken,
    'Hello from Firebase!',
    'This is a test notification'
  );
  console.log('');

  // Example 2: Notification with navigation data
  console.log('2️⃣  Sending notification with navigation data...');
  await sendToDevice(
    testToken,
    'New Post Available',
    'Check out the latest posts!',
    { screen: 'Posts', postId: '12345' }
  );
  console.log('');

  // Example 3: Topic notification
  console.log('3️⃣  Sending notification to topic...');
  await sendToTopic(
    'news',
    'Breaking News',
    'Important update for all users!'
  );
  console.log('');

  // Example 4: Data-only message
  console.log('4️⃣  Sending data-only message...');
  await sendDataMessage(testToken, {
    action: 'refresh',
    screen: 'Dashboard',
    silent: 'true'
  });
  console.log('');

  // Example 5: Notification with image
  console.log('5️⃣  Sending notification with image...');
  await sendWithImage(
    testToken,
    'Beautiful Landscape',
    'Check out this amazing view!',
    'https://picsum.photos/400/300',
    { type: 'image', imageId: '123' }
  );
  console.log('');

  console.log('✨ All examples completed!\n');
}

// Run examples
if (require.main === module) {
  main()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

// Export functions for use in other scripts
module.exports = {
  sendToDevice,
  sendToTopic,
  sendToMultipleDevices,
  sendDataMessage,
  sendWithImage,
  subscribeToTopic,
  unsubscribeFromTopic,
};

