import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAAO1ZCSJCG-L5AdT6JYqnWyPxvNDcgjZw",
    authDomain: "filzgadgets.firebaseapp.com",
    projectId: "filzgadgets",
    storageBucket: "filzgadgets.appspot.com",
    messagingSenderId: "255321675283",
    appId: "1:255321675283:web:ecc3726721b26b4f0691e6",
    measurementId: "G-G5HHTVF660"
};

// Check if a Firebase app is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); 
}

const analytics = getAnalytics();

// Log an event
logEvent(analytics, 'button_click');

// Export firebase as default
export default firebase;

// Your authentication functions here

export const login = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // User is logged in
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const register = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // User is registered
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const logout = async () => {
    try {
        await firebase.auth().signOut();
        // User is logged out
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const signInWithPhoneNumber = async (phoneNumber, appVerifier) => {
    try {
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
        return confirmationResult;
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const confirmOTP = async (confirmationResult, code) => {
    try {
        const result = await confirmationResult.confirm(code);
        // User signed in successfully.
        return result.user;
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await firebase.auth().signInWithPopup(provider);
        // User is signed in with Google
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const signInWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
        await firebase.auth().signInWithPopup(provider);
        // User is signed in with Facebook
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const signInWithApple = async () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    try {
        await firebase.auth().signInWithPopup(provider);
        // User is signed in with Apple
    } catch (error) {
        console.error(error);
        // Handle Errors here.
    }
};

export const onAuthStateChanged = (userHandler) => {
    return firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            userHandler(user);
        } else {
            // User is signed out.
            userHandler(null);
        }
    });
};
