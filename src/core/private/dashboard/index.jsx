import { createColumnHelper } from "@tanstack/react-table";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { FaBook, FaEdit } from "react-icons/fa";
import {
  FaCartShopping,
  FaSackDollar,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import useFetchUsers from "../../../hooks/useFetchUsers";
import DataTable from "../../../shared/DataTable/DataTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for Summary Cards
  const summaryCards = [
    {
      id: 1,
      value: "Rs 25,875",
      label: "Total Sales",
      bgColor: "bg-red-100",
      icon: <FaSackDollar />,
      iconBgColor: "bg-red-500",
    },
    {
      id: 2,
      value: "300",
      label: "Total Listings",
      bgColor: "bg-yellow-100",
      icon: <FaCartShopping />,
      iconBgColor: "bg-yellow-500",
      link: "/admin/booklistings",
    },
    // {
    //   id: 3,
    //   value: "120",
    //   label: "Books Delivered",
    //   bgColor: "bg-blue-100",
    //   icon: <FaBox />,
    //   iconBgColor: "bg-blue-500",
    // },
    {
      id: 4,
      value: "45",
      label: "New Users",
      bgColor: "bg-purple-100",
      icon: <FaUserPlus />,
      iconBgColor: "bg-purple-500",
      link: "/admin/users",
    },
    {
      id: 5,
      value: 5, // This will dynamically be calculated
      label: "New Books Added",
      bgColor: "bg-green-100",
      icon: <FaBook />, // You can use any relevant icon here
      iconBgColor: "bg-green-500",
      link: "/admin/booklistings",
    },
  ];

  // Data for Charts
  const revenueData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Online Sales",
        data: [15000, 18000, 25000, 16000, 14000, 19000, 22000],
        backgroundColor: "#0095FF",
      },
      {
        label: "Offline Sales",
        data: [12000, 14000, 21000, 8000, 11000, 15000, 10000],
        backgroundColor: "#10B981",
      },
    ],
  };

  const customerSatisfactionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Last Month",
        data: [1000000, 1100000, 1050000, 1200000],
        borderColor: "#6366F1",
        fill: false,
      },
      {
        label: "This Month",
        data: [1100000, 1150000, 1120000, 1250000],
        borderColor: "#10B981",
        fill: false,
      },
    ],
  };

  const { users, loading } = useFetchUsers();
  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Define columns using TanStack ColumnHelper
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("avatar", {
      header: "User",
      cell: (info) => (
        <div className="flex items-center">
          <img
            src={`/api/product_images/${info.getValue()}`}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {info.row.original.name}
            </p>
            <p className="text-sm text-gray-500 -mt-1">
              {info.row.original.email}
            </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue() || "N/A",
    }),
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
    columnHelper.accessor("lastActivity", {
      header: "Last Activity",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <div className="px-4 py-1.5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <div className="bg-white rounded-xl px-6 pt-3 pb-6 mt-4">
            <h1 className=" font-bold text-lg">Sales summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-3">
              {summaryCards.map((card) => (
                <Link key={card.id} to={card.link}>
                  <div
                    className={`p-4 flex items-center gap-3 rounded-lg shadow cursor-pointer hover:shadow-lg ${card.bgColor}`}
                  >
                    <div
                      className={`text-lg text-white w-9 h-10 flex items-center justify-center rounded-lg ${card.iconBgColor}`}
                    >
                      {card.icon}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-sm font-gilroyMedium">
                        {card.label}
                      </p>
                      <h3 className="text-xl font-gilroySemiBold -mt-1">
                        {card.value}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white px-6 py-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
              <Bar data={revenueData} />
            </div>

            <div className="bg-white px-6 py-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">
                Customer Satisfaction
              </h2>
              <Line data={customerSatisfactionData} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mt-6">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Users
                </h3>
                <Link to={"/admin/users"}>
                  <button className="px-3 py-1.5 text-sm font-gilroyMedium text-custom bg-gray-700 bg-opacity-10 rounded-lg hover:bg-opacity-20 !rounded-button">
                    View All
                  </button>
                </Link>
              </div>
              <DataTable data={recentUsers} columns={columns} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
