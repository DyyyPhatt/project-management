import React from "react";
import { AlertTriangle } from "lucide-react";

type ModalConfirmDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
}: ModalConfirmDeleteProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="dark:bg-dark-secondary relative w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl transition-all sm:w-full">
        {/* Icon + Title */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Confirm Delete
          </h2>
        </div>

        {/* Message */}
        <p className="mb-6 text-sm text-gray-700 dark:text-neutral-300">
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="dark:hover:bg-dark-primary rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
