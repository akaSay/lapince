import React from "react";
import { useTranslation } from "react-i18next";
import type { Transaction } from "../../types/Transaction";
import Modal from "../common/Modal";
import TransactionForm from "../forms/TransactionForm";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  initialData?: Transaction;
  initialCategory?: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  initialCategory,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? t("transactions.edit") : t("transactions.new")}
    >
      <TransactionForm
        onSubmit={(data) => {
          onSubmit(data);
          onClose();
        }}
        initialData={initialData}
        initialCategory={initialCategory}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default TransactionModal;
