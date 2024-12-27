import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

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
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success("ID copied to clipboard!");
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Phone</th>
              <th className="p-2 border-b">Listings</th>
              <th className="p-2 border-b">Purchases</th>
              <th className="p-2 border-b">Created At</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border-b">
                  <div
                    className="truncate max-w-xs"
                    style={{
                      width: "50px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    title={user._id} // Tooltip showing full ID on hover
                    onClick={() => handleCopy(user._id)} // Copy to clipboard on click
                  >
                    {user._id}
                  </div>
                </td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.phone || "N/A"}</td>
                <td className="p-2 border-b">{user.book_listings.length}</td>
                <td className="p-2 border-b">{user.purchases.length}</td>
                <td className="p-2 border-b">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border-b">
                  <button className="text-blue-500 hover:text-blue-700 mr-3">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Button */}
      <div className="mt-6">
        <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Add User
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
