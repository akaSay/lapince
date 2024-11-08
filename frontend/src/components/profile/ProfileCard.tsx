import { t } from "i18next";
import React from "react";
import Avatar from "../common/Avatar";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    membershipType: string;
    isEmailVerified: boolean;
    completionRate: number;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center mb-6 space-x-4">
        <Avatar seed={user.name} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">{user.email}</span>
            {user.isEmailVerified && (
              <i className="text-sm text-green-400 material-icons-outlined">
                verified
              </i>
            )}
          </div>
          <span className="inline-block px-2 py-1 mt-2 text-sm text-white bg-blue-600 rounded-full">
            {user.membershipType}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm text-gray-400">
          <span>{t("profile.stats.profileCompletion")}</span>
          <span>{user.completionRate}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${user.completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button className="flex items-center justify-center p-2 space-x-2 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600">
          <i className="material-icons-outlined">settings</i>
          <span>{t("layout.profile.settings")}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
