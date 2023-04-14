// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account", //always ask to select the account
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuemnts = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);

	//using batch to create a transaction to write into db
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q); //fetching document snapshots
	//reducing over docs array to end up with objects
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	//checking if a document exists
	const userDocRef = doc(db, "users", userAuth.uid);

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
				...additionalInformation,
			});
		} catch (e) {
			console.log("error creating the user", e.message);
		}
	}

	//if user data EXISTS
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

//interface for signing out
export const signOutUser = async () => await signOut(auth);

//whenever we user auth changes it will trigger a callback (running the function)
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
