import React, { createContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  message: string;
  read?: boolean;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
  clearNotifications: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    setNotifications(prev => [
      { id: Date.now().toString(), message, read: false },
      ...prev,
    ]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
