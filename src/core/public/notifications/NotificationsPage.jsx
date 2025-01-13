import React from "react";
import { useNotifications } from "../../../context/NotificationContext";

const NotificationsPage = () => {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">All Notifications</h2>
      <button
        onClick={markAllAsRead}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Mark all as read
      </button>
      <ul className="space-y-4">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className={`p-4 border rounded-md ${
              notification.isRead ? "bg-white" : "bg-gray-100"
            }`}
          >
            <p className="text-sm">{notification.message}</p>
            <small className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
