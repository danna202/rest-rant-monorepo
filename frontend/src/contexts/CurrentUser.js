import React, { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = await fetch('http://localhost:5000/authentication/profile', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        

        if (response.status !== 200) {
            throw new Error("User not logged in");
            }   
        let user = await response.json();
        setCurrentUser(user);
        setLoading(false);
        }
        catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }
    getLoggedInUser();
    }
    , []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser, loading, error }}>
            {children}
        </CurrentUser.Provider>
    )
}


export default CurrentUserProvider;