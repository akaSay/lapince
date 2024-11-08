import { t } from "i18next";
import React, { useState } from "react";
import ProfileModal from "../components/modals/ProfileModal";
import ProfileCard from "../components/profile/ProfileCard";
import { useProfileContext } from "../contexts/ProfileContext";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, loading, error, fetchProfile, updateProfile } =
    useProfileContext();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  const userData = {
    name: profile.name,
    email: profile.email,
    membershipType: "Premium",
    avatar: "/avatars/avatar1.jpg",
    isEmailVerified: true,
    completionRate: 85,
    language: "fr",
    currency: "EUR",
    notifications: {
      email: true,
      push: true,
      budget: true,
    },
  };

  const handleProfileSubmit = async (profileData: {
    name: string;
    email: string;
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budget: boolean;
    };
  }) => {
    try {
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
        // autres champs...
      });

      await fetchProfile();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{t("profile.title")}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {t("profile.editProfile")}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileCard user={userData} />

        <div className="space-y-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-white">
              {t("profile.notificationPreferences")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">
                  {t("profile.budgetAlert")}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {/* Ajoutez d'autres options de notification */}
            </div>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-white">
              {t("profile.linkedAccounts")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="text-gray-400 material-icons-outlined">
                    account_balance
                  </i>
                  <span className="text-gray-300">
                    {t("profile.mainBankAccount")}
                  </span>
                </div>
                <button className="text-blue-400 hover:text-blue-300">
                  {t("profile.configure")}
                </button>
              </div>
              {/* Ajoutez d'autres comptes liés */}
            </div>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProfileSubmit}
        initialData={userData}
      />
    </div>
  );
};

export default Profile;
