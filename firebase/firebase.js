// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBcsf9GD6n1X-WySqiOp4CV8ZDemHW0jc4",
	authDomain: "new-rn-auth.firebaseapp.com",
	projectId: "new-rn-auth",
	storageBucket: "new-rn-auth.appspot.com",
	messagingSenderId: "985806944148",
	appId: "1:985806944148:web:8218262553e2185fbec181",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
