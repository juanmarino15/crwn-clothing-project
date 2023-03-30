// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyARrGwDosFnOJSKWOraRjdle0nXKIReoaY",
	authDomain: "crwn-clothing-db-c5bcf.firebaseapp.com",
	projectId: "crwn-clothing-db-c5bcf",
	storageBucket: "crwn-clothing-db-c5bcf.appspot.com",
	messagingSenderId: "855201697047",
	appId: "1:855201697047:web:47546fe61946cc08837b52",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account", //always ask to select the account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	//checking if a document exists
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	//getting data into doc usersnapshot.exists() tells you if the instance exists
	const userSnapshot = await getDoc(userDocRef);

	//flow if user data DOES NOT exists
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date(); //to know when the user was created

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (e) {
			console.log("error creating the user", e.message);
		}
	}

	//if user data EXISTS
	return userDocRef;
};
