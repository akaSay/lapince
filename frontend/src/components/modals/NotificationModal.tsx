import React from "react";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import type { Notification } from "../../types/Notification";
import Modal from "../common/Modal";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between w-full pr-4">
          <span>{t("notifications.title")}</span>
          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAllAsRead();
              }}
              className="px-2 py-1 ml-4 text-sm text-blue-400 transition-colors rounded hover:text-blue-300 hover:bg-gray-700"
            >
              {t("notifications.markAllAsRead")}
            </button>
          )}
        </div>
      }
    >
      <div className="overflow-y-auto max-h-[60vh] -mx-4 px-4">
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-gray-400">
            {t("notifications.empty")}
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg transition-all ${
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
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-300 break-words">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatNotificationDate(notification.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex ml-2 space-x-2">
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
    </Modal>
  );
};

export default NotificationModal;
