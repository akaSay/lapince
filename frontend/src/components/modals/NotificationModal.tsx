import React from "react";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import type { Notification } from "../../types/Notification";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "success":
        return "check_circle";
      default:
        return "info";
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      case "success":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  const formatNotificationDate = (date: string | Date | null) => {
    if (!date) return "";

    try {
      const notifDate = typeof date === "string" ? new Date(date) : date;

      // Vérifier si la date est valide
      if (isNaN(notifDate.getTime())) {
        console.error("Date invalide:", date);
        return "Date invalide";
      }

      return formatDistance(notifDate, new Date(), {
        addSuffix: true,
        locale: fr,
      });
    } catch (error) {
      console.error("Erreur de formatage de date:", error, date);
      return "Date invalide";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {t("notifications.title")}
          </h2>
          <div className="flex space-x-2">
            {notifications.some((n) => !n.isRead) && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                {t("notifications.markAllAsRead")}
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <i className="material-icons-outlined">close</i>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96">
          {notifications.length === 0 ? (
            <div className="py-4 text-center text-gray-400">
              {t("notifications.noNotifications")}
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.isRead
                      ? "bg-gray-700"
                      : "bg-gray-700 border-l-4 border-blue-500"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <i
                        className={`material-icons-outlined ${getNotificationColor(
                          notification.type
                        )}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </i>
                      <div>
                        <h3 className="font-medium text-white">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {formatNotificationDate(notification.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <i className="material-icons-outlined">check</i>
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <i className="material-icons-outlined">delete</i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
