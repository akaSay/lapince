import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAuth } from "../../hooks/useAuth";
import { useBudget } from "../../hooks/useBudget";
import { useNotifications } from "../../hooks/useNotifications";
import { useSearch } from "../../hooks/useSearch";
import { useTransaction } from "../../hooks/useTransaction";
import { highlightText } from "../../lib/highlightText";
import Avatar from "../common/Avatar";
import NotificationModal from "../modals/NotificationModal";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
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
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchFocus = (e: React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setIsSearchFocused(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-gray-800 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bouton menu mobile et logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="text-gray-300 lg:hidden hover:text-white"
              aria-label="Menu"
            >
              <i className="material-icons-outlined">menu</i>
            </button>
            <span className="hidden ml-3 text-xl font-bold text-white lg:block">
              BudgetApp
            </span>
          </div>

          {/* Actions avec barre de recherche mobile intégrée */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Conteneur de recherche mobile */}
            <div className="relative lg:hidden">
              <div
                className={`flex items-center transition-all duration-200 ${
                  isSearchFocused
                    ? "w-[calc(100vw-180px)] -ml-[calc(100vw-220px)]"
                    : "w-10"
                }`}
              >
                <input
                  className={`w-full h-10 pl-10 pr-3 text-sm text-gray-300 bg-gray-700 border border-gray-700 rounded-lg transition-all duration-200 ${
                    isSearchFocused ? "opacity-100" : "opacity-0 w-0"
                  }`}
                  placeholder={t("layout.search.placeholder")}
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleSearchFocus}
                  onClick={handleSearchFocus}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSearchFocused && searchTerm) {
                      setSearchTerm("");
                    } else {
                      setIsSearchFocused(!isSearchFocused);
                    }
                  }}
                  className={`absolute left-0 flex items-center justify-center w-10 h-10 text-gray-400 transition-colors hover:text-white ${
                    isSearchFocused ? "bg-gray-700 rounded-l-lg" : ""
                  }`}
                  aria-label="Recherche"
                >
                  <i className="material-icons-outlined">
                    {isSearchFocused
                      ? searchTerm
                        ? "close"
                        : "arrow_back"
                      : "search"}
                  </i>
                </button>
              </div>
              {/* Résultats de recherche mobile */}
              {searchTerm && isSearchFocused && (
                <div className="absolute left-0 right-0 z-50 mt-2 -ml-[calc(100vw-220px)] w-[calc(100vw-180px)] overflow-hidden bg-gray-700 rounded-lg shadow-lg">
                  {results.transactions.length === 0 &&
                  results.budgets.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      {t("layout.search.noResults")}
                    </div>
                  ) : (
                    <>
                      {results.transactions.length > 0 && (
                        <div className="border-b border-gray-600">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                            {t("layout.search.transactions")}
                          </div>
                          {results.transactions
                            .slice(0, 3)
                            .map((transaction) => (
                              <Link
                                key={transaction.id}
                                to="/transactions"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                              >
                                <div>
                                  {highlightText(
                                    transaction.description,
                                    searchTerm
                                  )}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {highlightText(
                                    t(
                                      `categories.${transaction.type}.${transaction.category}`
                                    ),
                                    searchTerm
                                  )}
                                </div>
                              </Link>
                            ))}
                          {results.transactions.length > 3 && (
                            <div className="px-4 py-2 text-xs text-gray-400">
                              +{results.transactions.length - 3}{" "}
                              {t("layout.search.moreTransactions")}
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
                              {highlightText(
                                t(`categories.expense.${b.category}`),
                                searchTerm
                              )}
                            </Link>
                          ))}
                          {results.budgets.length > 3 && (
                            <div className="px-4 py-2 text-xs text-gray-400">
                              +{results.budgets.length - 3}{" "}
                              {t("layout.search.moreBudgets")}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Barre de recherche desktop */}
            <div
              ref={searchRef}
              className="hidden lg:block lg:flex-1 lg:mx-4 lg:ml-64"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="text-gray-400 material-icons-outlined">
                    search
                  </i>
                </div>
                <input
                  className="w-full py-2 pl-10 pr-3 text-sm text-gray-300 bg-gray-700 border border-gray-700 rounded-lg"
                  placeholder={t("layout.search.placeholder")}
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Résultats de recherche desktop */}
                {searchTerm && (
                  <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-gray-700 rounded-lg shadow-lg">
                    {results.transactions.length === 0 &&
                    results.budgets.length === 0 ? (
                      <div className="px-4 py-2 text-sm text-gray-400">
                        {t("layout.search.noResults")}
                      </div>
                    ) : (
                      <>
                        {results.transactions.length > 0 && (
                          <div className="border-b border-gray-600">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                              {t("layout.search.transactions")}
                            </div>
                            {results.transactions
                              .slice(0, 3)
                              .map((transaction) => (
                                <Link
                                  key={transaction.id}
                                  to="/transactions"
                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                                >
                                  <div>
                                    {highlightText(
                                      transaction.description,
                                      searchTerm
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {highlightText(
                                      t(
                                        `categories.${transaction.type}.${transaction.category}`
                                      ),
                                      searchTerm
                                    )}
                                  </div>
                                </Link>
                              ))}
                            {results.transactions.length > 3 && (
                              <div className="px-4 py-2 text-xs text-gray-400">
                                +{results.transactions.length - 3}{" "}
                                {t("layout.search.moreTransactions")}
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
                                {highlightText(
                                  t(`categories.expense.${b.category}`),
                                  searchTerm
                                )}
                              </Link>
                            ))}
                            {results.budgets.length > 3 && (
                              <div className="px-4 py-2 text-xs text-gray-400">
                                +{results.budgets.length - 3}{" "}
                                {t("layout.search.moreBudgets")}
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

            {/* Bouton notification */}
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700"
              aria-label="Notifications"
            >
              <i className="material-icons-outlined">notifications</i>
              {unreadCount > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Menu profil */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center h-10 space-x-2 text-gray-300 hover:text-white"
              >
                <Avatar seed={profile?.name || "Anonymous"} size="sm" />
                <span className="hidden text-sm sm:block">
                  {profile?.name || t("layout.profile.loading")}
                </span>
                <i className="hidden material-icons-outlined sm:block">
                  {isProfileMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
                </i>
              </button>

              {/* Menu déroulant */}
              <div
                className={`absolute right-0 mt-2 w-60 py-2 bg-gray-700 rounded-lg shadow-xl z-50 transform transition-all duration-200 origin-top ${
                  isProfileMenuOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-4 py-2 text-sm text-gray-400 truncate border-b border-gray-600">
                  {profile?.email}
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <i className="text-sm material-icons-outlined">person</i>
                    <span>{t("layout.profile.myProfile")}</span>
                  </div>
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <i className="text-sm material-icons-outlined">settings</i>
                    <span>{t("layout.profile.settings")}</span>
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
                    <span>{t("layout.profile.logout")}</span>
                  </div>
                </button>
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
