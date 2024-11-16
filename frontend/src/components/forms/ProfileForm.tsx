import React from "react";
import { useTranslation } from "react-i18next";

interface ProfileFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName?: string;
    email: string;
  }) => void;
  initialData: {
    firstName: string;
    lastName?: string;
    email: string;
  };
  onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("profile.form.firstName")}
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full p-2 text-white bg-gray-700 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("profile.form.lastName")}
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full p-2 text-white bg-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("profile.form.email")}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 text-white bg-gray-700 rounded"
            required
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
        >
          {t("common.save")}
        </button>
      </div>
    </form>
  );
};
