//const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { firebaseConfig } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        return userCredential.user;
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode.errorMessage);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        return userCredential.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        throw error;
    }
};
