# 🔥 Firestore Integration Setup Guide

This guide will help you set up Firestore integration for the Swags Manager app.

## 📋 Prerequisites

1. **Firebase Project**: Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. **Node.js**: Ensure you have Node.js installed (version 14 or higher)
3. **Firebase CLI**: Install Firebase CLI globally (`npm install -g firebase-tools`)

## 🚀 Setup Steps

### 1. Create Environment File

Create a `.env` file in the root directory of your project:

```bash
# Copy the example file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your Firebase project details:

```env
# Firestore Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Optional: Firestore Emulator (for development)
REACT_APP_FIREBASE_USE_EMULATOR=false
REACT_APP_FIREBASE_FIRESTORE_EMULATOR_HOST=localhost:8080
REACT_APP_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099

# App Configuration
REACT_APP_ENV=development
REACT_APP_APP_NAME=Swags Manager
```

### 3. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click "Add app" and choose "Web"
7. Copy the configuration values to your `.env` file

### 4. Install Firebase Dependencies

```bash
npm install firebase
```

### 5. Initialize Firebase in Your App

In your `src/index.tsx` or `src/App.tsx`, add:

```tsx
import { initializeFirebase } from './config/firebase';

// Initialize Firebase when the app starts
initializeFirebase()
  .then(() => {
    console.log('Firebase initialized successfully');
  })
  .catch((error) => {
    console.error('Firebase initialization failed:', error);
  });
```

## 🔧 Firestore Rules

Set up Firestore security rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Or for development, allow all access (NOT recommended for production)
    // match /{document=**} {
    //   allow read, write: if true;
    // }
  }
}
```

## 🧪 Development with Emulator

For local development, you can use Firebase Emulator:

1. **Start Emulator**:
   ```bash
   firebase emulators:start
   ```

2. **Set Environment Variable**:
   ```env
   REACT_APP_FIREBASE_USE_EMULATOR=true
   ```

## 📱 Usage Examples

### Using the Helper Functions

```tsx
import { 
  COLLECTIONS, 
  toFirestore, 
  fromFirestore, 
  validateCamiseta 
} from '../utils/firestore';

// Validate data before sending to Firestore
const camiseta = {
  tamanho: 'M',
  sponsor: 'Bugcrowd',
          sexo: 'masculino',
  quantidadeAtual: 10
};

if (validateCamiseta(camiseta)) {
  // Data is valid, proceed with Firestore operation
  const firestoreData = toFirestore(camiseta);
  // ... send to Firestore
}
```

### Collection Operations

```tsx
// Get collection reference
const camisetasRef = firebase.firestore().collection(COLLECTIONS.CAMISETAS);

// Add document
const newCamiseta = toFirestore(camiseta);
await camisetasRef.add(newCamiseta);

// Get documents
const snapshot = await camisetasRef.get();
const camisetas = snapshot.docs.map(doc => fromFirestore(doc));
```

## 🚨 Security Notes

1. **Never commit `.env` files** to version control
2. **Use environment-specific configurations** for different deployment stages
3. **Implement proper authentication** before allowing write access
4. **Validate all data** before sending to Firestore
5. **Set up proper Firestore rules** to restrict access

## 🔍 Troubleshooting

### Common Issues

1. **"Firebase configuration is incomplete"**
   - Check that all required environment variables are set
   - Ensure `.env` file is in the root directory
   - Restart your development server after adding environment variables

2. **"Permission denied" errors**
   - Check Firestore security rules
   - Ensure user is authenticated (if using auth)
   - Verify collection names match your rules

3. **Emulator connection issues**
   - Ensure Firebase emulator is running
   - Check emulator host and port in `.env`
   - Restart development server after emulator changes

## 📚 Next Steps

1. **Authentication**: Implement user login/signup
2. **Real-time Updates**: Use `onSnapshot` for live data
3. **Offline Support**: Enable offline persistence
4. **Batch Operations**: Use batch writes for multiple operations
5. **Pagination**: Implement pagination for large collections

## 🆘 Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Community](https://firebase.google.com/community)

---

**Note**: This setup guide assumes you're using Create React App. If you're using a different build tool, you may need to adjust the environment variable configuration accordingly.
