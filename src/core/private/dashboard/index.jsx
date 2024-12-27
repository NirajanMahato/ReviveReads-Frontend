import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { FaBox, FaCartShopping, FaSackDollar, FaUserPlus } from "react-icons/fa6";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Data for Summary Cards
  const summaryCards = [
    { id: 1, value: '$1k', label: 'Total Sales', bgColor: 'bg-red-100', icon: <FaSackDollar />, iconBgColor: 'bg-red-500' },
    { id: 2, value: '300', label: 'Total Orders', bgColor: 'bg-yellow-100', icon: <FaCartShopping />, iconBgColor: 'bg-yellow-500'  },
    { id: 3, value: '120', label: 'Books Delivered', bgColor: 'bg-green-100', icon: <FaBox />, iconBgColor: 'bg-green-500'  },
    { id: 4, value: '45', label: 'New Customers', bgColor: 'bg-purple-100', icon: <FaUserPlus />, iconBgColor: 'bg-purple-500'  }
  ];

  // Data for Charts
  const revenueData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Online Sales',
        data: [15000, 18000, 25000, 16000, 14000, 19000, 22000],
        backgroundColor: '#6366F1'
      },
      {
        label: 'Offline Sales',
        data: [12000, 14000, 21000, 8000, 11000, 15000, 10000],
        backgroundColor: '#10B981'
      }
    ]
  };

  const customerSatisfactionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Last Month',
        data: [1000000, 1100000, 1050000, 1200000],
        borderColor: '#6366F1',
        fill: false
      },
      {
        label: 'This Month',
        data: [1100000, 1150000, 1120000, 1250000],
        borderColor: '#10B981',
        fill: false
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className='bg-white rounded-xl px-6 pt-3 pb-6 mb-6'>
        <h1 className=' font-bold text-lg'>Sales summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mt-4">
          {summaryCards.map((card) => (
            <div key={card.id} className={`p-4 rounded-lg shadow ${card.bgColor}`}>
              <div className={`text-sm text-white w-7 h-7 flex items-center justify-center rounded-full ${card.iconBgColor}`}>{card.icon}</div>
                <div className="flex flex-col mt-3">
                  <h3 className="text-2xl font-gilroySemiBold">{card.value}</h3>
                  <p className="text-gray-500 font-gilroyMedium">{card.label}</p>
               </div>
              </div>
            ))}
        </div>
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
          <Bar data={revenueData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Satisfaction</h2>
          <Line data={customerSatisfactionData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
