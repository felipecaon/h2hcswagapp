// Firebase Configuration for Firestore Integration
// This file contains the Firebase configuration and initialization

// Firebase instances
let firebaseApp: any = null;
let firebaseDb: any = null;
let firebaseAuth: any = null;

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firestore Settings
export const firestoreSettings = {
  // Enable offline persistence
  cacheSizeBytes: 50 * 1024 * 1024, // 50MB cache
  experimentalForceLongPolling: false,
  useFetchStreams: false,
};

// Environment Configuration
export const isDevelopment = process.env.REACT_APP_ENV === 'development';
export const useEmulator = process.env.REACT_APP_FIREBASE_USE_EMULATOR === 'true';

// Emulator Configuration (for development)
export const emulatorConfig = {
  firestore: {
    host: process.env.REACT_APP_FIREBASE_FIRESTORE_EMULATOR_HOST || 'localhost:8080',
    ssl: false,
  },
  auth: {
    host: process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099',
    ssl: false,
  },
};

// Validation function to check if Firebase config is complete
export const validateFirebaseConfig = (): boolean => {
  const requiredFields = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID',
  ];

  const missingFields = requiredFields.filter(
    field => !process.env[field] || process.env[field] === 'your_api_key_here' || process.env[field]?.includes('your_')
  );

  if (missingFields.length > 0) {
    console.error('Missing or invalid Firebase environment variables:', missingFields);
    console.error('Current config values:', {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? '***' + process.env.REACT_APP_FIREBASE_API_KEY.slice(-4) : 'missing',
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'missing',
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'missing',
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'missing',
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'missing',
      appId: process.env.REACT_APP_FIREBASE_APP_ID ? '***' + process.env.REACT_APP_FIREBASE_APP_ID.slice(-4) : 'missing'
    });
    return false;
  }

  console.log('Firebase config validation passed');
  return true;
};

// Initialize Firebase function
export const initializeFirebase = async () => {
  if (!validateFirebaseConfig()) {
    throw new Error('Firebase configuration is incomplete. Please check your .env file.');
  }

  try {
    // Import Firebase dynamically to avoid SSR issues
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, connectFirestoreEmulator } = await import('firebase/firestore');
    const { getAuth, connectAuthEmulator } = await import('firebase/auth');

    // Initialize Firebase app
    firebaseApp = initializeApp(firebaseConfig);
    
    // Initialize Firestore
    firebaseDb = getFirestore(firebaseApp);
    
    // Initialize Auth
    firebaseAuth = getAuth(firebaseApp);

    // Connect to emulators if in development mode
    if (useEmulator && isDevelopment) {
      try {
        connectFirestoreEmulator(firebaseDb, 'localhost', 8080);
        connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
        console.log('Connected to Firebase emulators');
      } catch (error) {
        console.log('Emulator connection failed, using production Firebase');
      }
    }

    console.log('Firebase initialized successfully');
    
    return {
      app: firebaseApp,
      db: firebaseDb,
      auth: firebaseAuth,
      config: firebaseConfig,
      settings: firestoreSettings,
      emulator: useEmulator ? emulatorConfig : null,
    };
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    throw error;
  }
};

// Export Firebase instances
export const getFirebaseApp = () => firebaseApp;
export const getFirebaseDb = () => firebaseDb;
export const getFirebaseAuth = () => firebaseAuth;

// Export configuration
export default {
  firebaseConfig,
  firestoreSettings,
  isDevelopment,
  useEmulator,
  emulatorConfig,
  validateFirebaseConfig,
  initializeFirebase,
};
