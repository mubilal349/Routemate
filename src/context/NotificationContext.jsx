import { createContext, useContext, useEffect, useMemo, useState } from "react";

const NOTIFICATIONS_STORAGE_KEY = "routemate-notifications";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(notifications),
    );
  }, [notifications]);

  const addNotification = ({ title, message, type = "info", link = null }) => {
    const notification = {
      id: `notification-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      title,
      message,
      type,
      link,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((current) => [notification, ...current]);

    return notification;
  };

  const markAsRead = (notificationId) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  };

  const removeNotification = (notificationId) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== notificationId),
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }

  return context;
}
