import { auth } from './firebase.js';
import {    createUserWithEmailAndPassword, 
            signInWithEmailAndPassword,
            signOut 
        } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

export const signup = async (email, password, firstName, lastName) => {
    try { 
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Successfully created user: ", user);
        return user;
    }
    catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error creating user: ", error.message);
    throw error;
    }
}

export const login = async (email, password, firstName, lastName) => {
    try { 
        const userCredential = await signInWithEmailAndPassword (auth, email, password);
        const user = userCredential.user;
        console.log("Successfully signed in: ", user);
        return user;
    }
    catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error signing in: ", error.message);
    throw error;
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) 
    {
        console.log("Error signing out: ", error.message);
        throw error;
    }
}