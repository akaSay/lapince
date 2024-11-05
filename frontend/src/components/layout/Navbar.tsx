import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import NotificationModal from "../modals/NotificationModal";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Exemple de notifications
  const notifications = [
    {
      id: "1",
      title: "Dépassement de budget",
      message: "Votre budget 'Loisirs' a dépassé la limite fixée",
      type: "warning" as const,
      date: new Date(),
      isRead: false,
    },
    {
      id: "2",
      title: "Nouvelle fonctionnalité",
      message: "Découvrez notre nouvelle interface de statistiques",
      type: "info" as const,
      date: new Date(Date.now() - 86400000),
      isRead: true,
    },
    // ... autres notifications
  ];

  const handleMarkAsRead = (id: string) => {
    console.log("Marquer comme lu:", id);
    // Implémentez la logique ici
  };

  const handleMarkAllAsRead = () => {
    console.log("Tout marquer comme lu");
    // Implémentez la logique ici
  };

  const handleDeleteNotification = (id: string) => {
    console.log("Supprimer notification:", id);
    // Implémentez la logique ici
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Bouton menu mobile */}
          <button
            onClick={onMenuClick}
            className="text-gray-300 lg:hidden hover:text-white"
          >
            <i className="material-icons-outlined">menu</i>
          </button>

          <div className="flex items-center justify-between flex-1">
            {/* Barre de recherche */}
            <div className="w-full max-w-xs ml-4 lg:ml-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="text-gray-400 material-icons-outlined">
                    search
                  </i>
                </div>
                <input
                  className="w-full py-2 pl-10 pr-3 text-sm text-gray-300 bg-gray-700 border border-gray-700 rounded-md"
                  placeholder="Rechercher..."
                  type="search"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsNotificationModalOpen(true)}
                className="relative hidden text-gray-300 hover:text-white sm:block"
              >
                <i className="material-icons-outlined">notifications</i>
                {notifications.some((n) => !n.isRead) && (
                  <span className="absolute flex items-center justify-center w-4 h-4 text-xs bg-red-500 rounded-full -top-1 -right-1">
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                )}
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Avatar seed="John Doe" size="sm" />
                  <span className="hidden sm:block">John Doe</span>
                  <i className="material-icons-outlined">
                    {isProfileMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
                  </i>
                </button>

                {/* Menu déroulant avec animation */}
                <div
                  className={`absolute right-0 mt-2 w-48 py-2 bg-gray-700 rounded-lg shadow-xl z-50 transform transition-all duration-200 origin-top ${
                    isProfileMenuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <i className="text-sm material-icons-outlined">person</i>
                      <span>Mon profil</span>
                    </div>
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <i className="text-sm material-icons-outlined">
                        settings
                      </i>
                      <span>Paramètres</span>
                    </div>
                  </Link>
                  <div className="my-1 border-t border-gray-600"></div>
                  <button
                    className="block w-full px-4 py-2 text-sm text-left text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // Ajoutez ici la logique de déconnexion
                      console.log("Déconnexion");
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <i className="text-sm material-icons-outlined">logout</i>
                      <span>Déconnexion</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDeleteNotification}
      />
    </nav>
  );
};

export default Navbar;
