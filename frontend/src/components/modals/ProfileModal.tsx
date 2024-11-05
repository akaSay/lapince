import React from "react";
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifier le profil">
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
