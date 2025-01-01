import React from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetchUsers from "../../../hooks/useFetchUsers";

const UsersPage = () => {
  const { users, loading } = useFetchUsers();

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success("ID copied to clipboard!");
    });
  };

  return (
    <div className="px-4 py-1.5 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold">Users</h2>

      {loading ? (
        <div ></div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4 mt-4">
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Listings</th>
                  <th className="p-2">Purchases</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border-b">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-2 py-3">
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
                    <td className="px-2 py-3">
                      <div className="flex items-center">
                        <img
                          src={`http://localhost:5000/product_images/${user?.avatar}`}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-sm text-gray-500 -mt-1">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2">
                      <span className="text-sm text-gray-900">
                        {user?.phone || "N/A"}
                      </span>
                    </td>
                    <td className="px-3">
                      {user.book_listings.length}
                    </td>
                    <td className="px-3">{user.purchases.length}</td>
                    <td className="px-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-2 ">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700 mr-3">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Add User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
