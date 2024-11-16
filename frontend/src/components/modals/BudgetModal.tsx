import React from "react";
import { useTranslation } from "react-i18next";
import type { BudgetData } from "../../types/Budget";
import Modal from "../common/Modal";
import BudgetForm from "../forms/BudgetForm";

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
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={budget?.id ? t("budget.edit") : t("budget.new")}
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
