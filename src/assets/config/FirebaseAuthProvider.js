import React, { useEffect, useState } from "react";
import firebaseAuth from "./firebaseAuth.js";
import { AuthContext } from '../../context/AuthContext';

export const FirebaseAuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        try {
            // Whenever the state of the authentication changes it will return a user, if not authenticated it will return a null user.
            firebaseAuth.auth().onAuthStateChanged(async (user) => {
                if (user) {

                    setCurrentUser(user)
                    sessionStorage.setItem("loggedInUser", true);
                } else {

                    setCurrentUser(user)
                    sessionStorage.removeItem("loggedInUser");
                }
            });
        } catch (error) {
            throw error;
        }

    }, []);

    // This provider will be wrapping the App.js, exposing the entire component tree with this currentUser obj.
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}; 