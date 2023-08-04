import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAGTmXLHualUYNszIv8g8jFHHkmrzmSZl4',
  authDomain: 'trip-app-394913.firebaseapp.com',
  projectId: 'trip-app-394913',
  storageBucket: 'trip-app-394913.appspot.com',
  messagingSenderId: '336399768802',
  appId: '1:336399768802:web:f33df3fb4ae4dd00e4d2bb',
  measurementId: 'G-8BWJ7K6JSJ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
