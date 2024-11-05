import React from "react";
import Modal from "../common/Modal";
import BudgetForm from "../forms/BudgetForm";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (budget: { category: string; limit: number; icon: string }) => void;
  initialData?: {
    category: string;
    limit: number;
    icon: string;
  };
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Modifier le budget" : "Nouveau budget"}
    >
      <BudgetForm
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

export default BudgetModal;
