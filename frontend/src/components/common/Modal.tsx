import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose}>
        <div className="fixed inset-0 z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Fond sombre */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden bg-gray-800 rounded-lg shadow-xl">
                  {title && (
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                      <Dialog.Title className="text-lg font-medium text-white">
                        {title}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                        aria-label="Fermer"
                      >
                        <i className="material-icons-outlined">close</i>
                      </button>
                    </div>
                  )}
                  <div className="px-4 py-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
