import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAjyHLhAlsfglxAc7UMvkUePNZuISP1Kyw',
	authDomain: 'fir-lesson-c7720.firebaseapp.com',
	projectId: 'fir-lesson-c7720',
	storageBucket: 'fir-lesson-c7720.appspot.com',
	messagingSenderId: '426339596085',
	appId: '1:426339596085:web:2c695057c9ebcd9c97fe7c',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider);
};
