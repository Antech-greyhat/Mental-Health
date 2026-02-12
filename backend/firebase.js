const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH || './firebase-service-account-key.json');

let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
} catch (error) {
  console.warn('Firebase service account key not found. Please ensure the file exists and the path is correct in .env');
  serviceAccount = null;
}

let db = null;

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  db = admin.firestore();
  console.log('Firebase initialized successfully');
} else {
  console.warn('Firebase not initialized due to missing service account key');
}

// Save chat to Firestore
async function saveChat(userId, message, reply, emotion, timestamp) {
  if (!db) {
    console.warn('Firebase not initialized, skipping chat save');
    return;
  }
  try {
    const chatRef = db.collection('chats').doc();
    await chatRef.set({
      userId,
      message,
      reply,
      emotion,
      timestamp: admin.firestore.Timestamp.fromDate(timestamp),
    });
    console.log('Chat saved to Firestore');
  } catch (error) {
    console.error('Error saving chat to Firestore:', error);
    throw error;
  }
}

// Save flagged message to Firestore
async function flagMessage(userId, message, timestamp, reason) {
  if (!db) {
    console.warn('Firebase not initialized, skipping flagged message save');
    return;
  }
  try {
    const flagRef = db.collection('flagged_messages').doc();
    await flagRef.set({
      userId,
      message,
      timestamp: admin.firestore.Timestamp.fromDate(timestamp),
      reason,
    });
    console.log('Flagged message saved to Firestore');
  } catch (error) {
    console.error('Error saving flagged message to Firestore:', error);
    throw error;
  }
}

module.exports = {
  saveChat,
  flagMessage,
};
