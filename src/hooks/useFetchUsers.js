import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const response = await axios.get(
          "http://localhost:5000/user/get-all-users",
          config
        );
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users.");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useFetchUsers;
