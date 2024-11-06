import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useBudget } from "../../hooks/useBudget";
import { useNotifications } from "../../hooks/useNotifications";
import { useSearch } from "../../hooks/useSearch";
import { useTransaction } from "../../hooks/useTransaction";
import { highlightText } from "../../lib/highlightText";
import Avatar from "../common/Avatar";
import NotificationModal from "../modals/NotificationModal";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { transactions } = useTransaction();
  const { budgets } = useBudget();
  const { searchTerm, setSearchTerm, results } = useSearch(
    transactions,
    budgets
  );
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();
  const { profile } = useProfileContext();
  const { logout } = useAuth();

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <div className="absolute z-50 w-full mt-2 overflow-hidden bg-gray-700 rounded-lg shadow-lg">
                    {results.transactions.length === 0 &&
                    results.budgets.length === 0 ? (
                      <div className="px-4 py-2 text-sm text-gray-400">
                        Aucun résultat trouvé
                      </div>
                    ) : (
                      <>
                        {results.transactions.length > 0 && (
                          <div className="border-b border-gray-600">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                              Transactions
                            </div>
                            {results.transactions.slice(0, 3).map((t) => (
                              <Link
                                key={t.id}
                                to="/transactions"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                              >
                                <div>
                                  {highlightText(t.description, searchTerm)}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {highlightText(t.category, searchTerm)}
                                </div>
                              </Link>
                            ))}
                            {results.transactions.length > 3 && (
                              <div className="px-4 py-2 text-xs text-gray-400">
                                +{results.transactions.length - 3} autres
                                transactions
                              </div>
                            )}
                          </div>
                        )}
                        {results.budgets.length > 0 && (
                          <div>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                              Budgets
                            </div>
                            {results.budgets.slice(0, 3).map((b) => (
                              <Link
                                key={b.id}
                                to="/budget"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                              >
                                {highlightText(b.category, searchTerm)}
                              </Link>
                            ))}
                            {results.budgets.length > 3 && (
                              <div className="px-4 py-2 text-xs text-gray-400">
                                +{results.budgets.length - 3} autres budgets
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsNotificationModalOpen(true)}
                className="relative hidden text-gray-300 hover:text-white sm:block"
              >
                <i className="material-icons-outlined">notifications</i>
                {unreadCount > 0 && (
                  <span className="absolute flex items-center justify-center w-4 h-4 text-xs bg-red-500 rounded-full -top-1 -right-1">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Avatar seed={profile?.name || "Anonymous"} size="sm" />
                  <span className="hidden sm:block">
                    {profile?.name || "Chargement..."}
                  </span>
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
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-600">
                    {profile?.email}
                  </div>
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
                      logout();
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
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDelete={deleteNotification}
      />
    </nav>
  );
};

export default Navbar;
