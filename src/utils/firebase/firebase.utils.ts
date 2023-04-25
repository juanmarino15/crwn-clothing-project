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
	User,
	NextOrObserver,
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
	QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/category.types";

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

export type ObjecToAdd = {
	title: string;
};

export const addCollectionAndDocuemnts = async <T extends ObjecToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
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

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q); //fetching document snapshots
	//reducing over docs array to end up with objects
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	); //category is what you are getting back);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot> => {
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
			console.log("error creating the user", e);
		}
	}

	//if user data EXISTS
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

//interface for signing out
export const signOutUser = async () => await signOut(auth);

//whenever we user auth changes it will trigger a callback (running the function)
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsuscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsuscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
