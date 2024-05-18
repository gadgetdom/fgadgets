import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
