import React from "react";
import Modal from "../common/Modal";
import BudgetForm from "../forms/BudgetForm";
import type { BudgetData } from "../../types/Budget";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BudgetData) => void;
  budget?: BudgetData & { id?: string };
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  budget,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={budget?.id ? "Modifier le budget" : "Nouveau budget"}
    >
      <BudgetForm
        onSubmit={(data) => {
          onSubmit(data);
          onClose();
        }}
        initialData={
          budget
            ? {
                category: budget.category,
                limit: budget.limit,
                icon: budget.icon,
              }
            : undefined
        }
        onCancel={onClose}
      />
    </Modal>
  );
};

export default BudgetModal;
