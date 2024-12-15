import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#1A1F2E] p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-end mb-4">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="flex-1 text-xl font-semibold text-white"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 transition-colors rounded-lg hover:bg-blue-500/10 hover:text-blue-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
