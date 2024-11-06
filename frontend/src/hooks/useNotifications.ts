import { useState, useEffect } from "react";
import { Notification } from "../types/Notification";
import api from "../lib/api";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notifications");
      const notifs = response.data;
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n: Notification) => !n.isRead).length);
    } catch (err) {
      setError("Erreur lors de la récupération des notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Erreur lors du marquage comme lu:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Erreur lors du marquage de tout comme lu:", err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => {
        const filtered = prev.filter((n) => n.id !== id);
        setUnreadCount(filtered.filter((n) => !n.isRead).length);
        return filtered;
      });
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  // Vérifier les nouvelles notifications toutes les minutes
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
  };
};
