import { t } from "i18next";
import React, { useState } from "react";
import ProfileModal from "../components/modals/ProfileModal";
import ProfileCard from "../components/profile/ProfileCard";
import { useProfileContext } from "../contexts/ProfileContext";
import { useToast } from "../hooks/useToast";
import { ProfileUpdateData } from "../types/User";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, loading, error, fetchProfile, updateProfile } =
    useProfileContext();
  const { success, error: showError } = useToast();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!profile) return null;

  const [firstName = "", lastName = ""] = profile.name?.split(" ") || ["", ""];

  const userData = {
    firstName,
    lastName,
    email: profile.email,
  };

  const handleProfileSubmit = async (profileData: {
    firstName: string;
    lastName?: string;
    email: string;
  }) => {
    if (!profileData.firstName.trim()) {
      showError(t("profile.notifications.firstNameRequired"));
      return;
    }

    if (!profileData.email.trim()) {
      showError(t("profile.notifications.emailRequired"));
      return;
    }

    try {
      const fullName = profileData.lastName?.trim()
        ? `${profileData.firstName.trim()} ${profileData.lastName.trim()}`
        : profileData.firstName.trim();

      const updateData: ProfileUpdateData = {
        name: fullName,
        email: profileData.email.trim(),
      };

      await updateProfile(updateData);
      await fetchProfile();
      setIsModalOpen(false);
      success(t("profile.notifications.updateSuccess"));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      showError(t("profile.notifications.updateError"));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">{t("profile.title")}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileCard
          user={{
            name: profile.name || "",
            email: profile.email || "",
            membershipType: "Premium",
            avatar: "/avatars/avatar1.jpg",
            isEmailVerified: profile.verificationStatus?.email || false,
          }}
          onEdit={() => setIsModalOpen(true)}
        />

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
