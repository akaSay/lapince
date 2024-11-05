import React from "react";
import Modal from "../common/Modal";
import TransactionForm from "../forms/TransactionForm";
import { Transaction } from "../../types/Transaction";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  initialData?: Transaction;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Modifier la transaction" : "Nouvelle transaction"}
    >
      <TransactionForm
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

export default TransactionModal;
