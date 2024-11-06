import React, { useState } from "react";
import { User } from "../../types/User";

interface UserPreferencesFormProps {
  user: User;
  onSubmit: (preferences: User["preferences"]) => void;
}

const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({
  user,
  onSubmit,
}) => {
  const [preferences, setPreferences] = useState(user.preferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Devise
        </label>
        <select
          value={preferences.currency}
          onChange={(e) =>
            setPreferences({ ...preferences, currency: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Langue
        </label>
        <select
          value={preferences.language}
          onChange={(e) =>
            setPreferences({ ...preferences, language: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Thème</label>
        <select
          value={preferences.theme}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              theme: e.target.value as "light" | "dark",
            })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Enregistrer les modifications
      </button>
    </form>
  );
};

export default UserPreferencesForm;
