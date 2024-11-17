import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useProfileContext } from "../../contexts/ProfileContext";
import Avatar from "../common/Avatar";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { profile } = useProfileContext();

  const menuItems = [
    {
      name: t("layout.sidebar.dashboard"),
      icon: "dashboard",
      path: "/dashboard",
    },
    {
      name: t("layout.sidebar.transactions"),
      icon: "receipt",
      path: "/transactions",
    },
    {
      name: t("layout.sidebar.budget"),
      icon: "account_balance_wallet",
      path: "/budget",
    },
    {
      name: t("layout.sidebar.reports"),
      icon: "analytics",
      path: "/reports",
    },
    {
      name: t("layout.sidebar.profile"),
      icon: "person",
      path: "/profile",
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 transition-opacity"
            >
              <img src="/LogoPince.png" alt="Logo" className="w-16 h-16 mt-3" />
              <span className="text-xl font-bold">
                {t("layout.sidebar.appName")}
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <i className="material-icons-outlined">close</i>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center p-3 space-x-3 bg-gray-700 rounded-lg">
              <Avatar seed={profile?.name || "John Doe"} size="md" />
              <div>
                <p className="text-sm font-medium">
                  {profile?.name || t("layout.profile.loading")}
                </p>
                <p className="text-xs text-gray-400">
                  {t("layout.profile.premium")}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <i className="material-icons-outlined text-[20px] min-w-[24px]">
                      {item.icon}
                    </i>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6">
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-400">
                {t("layout.sidebar.version")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
