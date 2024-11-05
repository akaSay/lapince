import React from "react";
import Modal from "../common/Modal";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "danger";
  date: Date;
  isRead: boolean;
}

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
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "success":
        return "check_circle";
      case "danger":
        return "error";
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "success":
        return "text-green-400";
      case "danger":
        return "text-red-400";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-400">
          {notifications.filter((n) => !n.isRead).length} non lues
        </span>
        <button
          onClick={onMarkAllAsRead}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Tout marquer comme lu
        </button>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Aucune notification
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg bg-gray-700 ${
                !notification.isRead ? "border-l-4 border-blue-500" : ""
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
                    <h4 className="text-sm font-medium text-white">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {new Date(notification.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-gray-400 hover:text-blue-400"
                      title="Marquer comme lu"
                    >
                      <i className="material-icons-outlined text-sm">
                        check_circle
                      </i>
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(notification.id)}
                    className="text-gray-400 hover:text-red-400"
                    title="Supprimer"
                  >
                    <i className="material-icons-outlined text-sm">delete</i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default NotificationModal;
