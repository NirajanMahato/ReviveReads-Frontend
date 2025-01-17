import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetchUsers from "../../../hooks/useFetchUsers";
import DataTable from "../../../shared/DataTable/DataTable";

const UsersPage = () => {
  const { users, loading } = useFetchUsers();
  
  const handleCopy = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success("ID copied to clipboard!");
    });
  };

  // Column definitions
  const columnHelper = createColumnHelper();

  const columns = [
    // ID column with copy functionality
    columnHelper.accessor("_id", {
      header: "ID",
      cell: (info) => (
        <div
          className="truncate max-w-xs cursor-pointer"
          style={{
            width: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={info.getValue()} // Tooltip for full ID
          onClick={() => handleCopy(info.getValue())} // Copy to clipboard
        >
          {info.getValue()}
        </div>
      ),
    }),

    // Name column with avatar
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => {
        const user = info.row.original;
        return (
          <div className="flex items-center">
            <img
              src={`/api/product_images/${user.avatar}`}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500 -mt-1">{user.email}</p>
            </div>
          </div>
        );
      },
    }),

    // Phone column
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue() || "N/A",
    }),

    // Listings count
    columnHelper.accessor("book_listings", {
      header: "Listings",
      cell: (info) => info.getValue().length,
    }),

    // Role
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),

    // Status
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              status === "Active"
                ? "text-green-700 bg-green-100"
                : status === "Away"
                ? "text-yellow-700 bg-yellow-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {status}
          </span>
        );
      },
    }),

    // Created At column
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => new Date(info.getValue()).toLocaleDateString() || "N/A",
    }),

    // Actions column
    // columnHelper.display({
    //   id: "actions",
    //   header: "Actions",
    //   cell: () => (
    //     <div className="flex space-x-2">
    //       <button className="text-blue-500 hover:text-blue-700 mr-3">
    //         <FaEdit />
    //       </button>
    //       <button className="text-red-500 hover:text-red-700">
    //         <FaTrash />
    //       </button>
    //     </div>
    //   ),
    // }),
  ];

  return (
    <div className="px-4 py-1.5 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold">Users</h2>

      {loading ? (
        <div></div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4 mt-4">
          <DataTable columns={columns} data={users} />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
