import Modal from "../common/Modal";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileForm } from "../forms/ProfileForm";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName?: string;
    email: string;
  }) => void;
  initialData: {
    firstName: string;
    lastName?: string;
    email: string;
  };
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("profile.editProfile")}>
      <ProfileForm
        onSubmit={onSubmit}
        initialData={initialData}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ProfileModal;
