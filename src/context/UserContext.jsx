// src/context/UserContext.js
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access token and user ID from localStorage
  const authenticateToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId && authenticateToken) {
        try {
          const response = await axios.get(
            "http://localhost:5000/user/get-user-info",
            {
              headers: {
                id: userId,
                Authorization: `Bearer ${authenticateToken}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId, authenticateToken]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};
