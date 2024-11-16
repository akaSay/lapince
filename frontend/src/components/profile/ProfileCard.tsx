import { t } from "i18next";
import React from "react";
import Avatar from "../common/Avatar";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    membershipType: string;
    isEmailVerified: boolean;
  };
  onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEdit }) => {
  const navigate = useNavigate();

  // Calcul du taux de complétion du profil
  const calculateCompletionRate = () => {
    // Champs requis (prénom + email) = 85%
    let completionRate = 0;

    // Vérifie si au moins le prénom est présent (première partie du nom)
    const firstName = user.name?.split(" ")[0];
    if (firstName && firstName.trim().length > 0) {
      completionRate += 42.5; // 50% du total pour le prénom
    }

    if (user.email && user.email.trim().length > 0) {
      completionRate += 42.5; // 50% du total pour l'email
    }

    // Bonus de 15% si le nom de famille est présent
    const lastName = user.name?.split(" ")[1];
    if (lastName && lastName.trim().length > 0) {
      completionRate += 15;
    }

    return Math.round(completionRate);
  };

  const completionRate = calculateCompletionRate();

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
          <span>{completionRate}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{
              width: `${completionRate}%`,
              backgroundColor:
                completionRate < 50
                  ? "#ef4444"
                  : completionRate < 86
                  ? "#f59e0b"
                  : "#3b82f6",
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center justify-center p-2 space-x-2 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          <i className="material-icons-outlined">settings</i>
          <span>{t("layout.profile.settings")}</span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center justify-center p-2 space-x-2 transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <i className="material-icons-outlined">edit</i>
          <span>{t("profile.editProfile")}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
