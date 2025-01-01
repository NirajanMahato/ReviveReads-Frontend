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
import { FaEdit } from "react-icons/fa";
import {
  FaBox,
  FaCartShopping,
  FaSackDollar,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import useFetchUsers from "../../../hooks/useFetchUsers";

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
    },
    {
      id: 3,
      value: "120",
      label: "Books Delivered",
      bgColor: "bg-green-100",
      icon: <FaBox />,
      iconBgColor: "bg-green-500",
    },
    {
      id: 4,
      value: "45",
      label: "New Users",
      bgColor: "bg-purple-100",
      icon: <FaUserPlus />,
      iconBgColor: "bg-purple-500",
    },
  ];

  // Data for Charts
  const revenueData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Online Sales",
        data: [15000, 18000, 25000, 16000, 14000, 19000, 22000],
        backgroundColor: "#6366F1",
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
                <div
                  key={card.id}
                  className={`p-4 flex items-center gap-3 rounded-lg shadow ${card.bgColor}`}
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Users
                </h3>
                <Link to={"/admin/users"}>
                  <button className="px-3 py-1.5 text-sm font-gilroyMedium text-custom bg-gray-700 bg-opacity-10 rounded-lg hover:bg-opacity-20 !rounded-button">
                    View All
                  </button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full mt-3">
                  <thead>
                    <tr className="text-left text-xs font-gilroyMedium text-gray-500 uppercase tracking-wider">
                      <th className="px-5">User</th>
                      <th className="px-5">Phone</th>
                      <th className="px-5">Status</th>
                      <th className="px-5">Last Activity</th>
                      <th className="px-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-5 py-3">
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
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">
                            {user?.phone || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.status === "Active"
                                ? "text-green-700 bg-green-100"
                                : user.status === "Away"
                                ? "text-yellow-700 bg-yellow-100"
                                : "text-red-700 bg-red-100"
                            }`}
                          >
                            {/* {user.status} */}
                            Away
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {/* {user.lastActivity} */}1 hour ago
                          </span>
                        </td>
                        <td className="px-6 py-4">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
