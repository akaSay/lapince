import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "../common/Modal";
import ProfileForm from "../forms/ProfileForm";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profileData: {
    name: string;
    email: string;
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budget: boolean;
    };
  }) => void;
  initialData?: {
    name: string;
    email: string;
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budget: boolean;
    };
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("profile.editProfile")}>
      <ProfileForm
        onSubmit={(data) => {
          onSubmit(data);
          onClose();
        }}
        initialData={initialData}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ProfileModal;
