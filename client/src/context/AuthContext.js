// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logOut = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        setIsLoggedIn(false); // Update login state
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
