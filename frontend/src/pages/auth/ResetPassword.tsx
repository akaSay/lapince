import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ResetPassword = () => {
  const { t } = useTranslation();
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(t("errors.passwordsDoNotMatch"));
      return;
    }

    try {
      await resetPassword(resetToken!, formData.password);
      navigate("/login", { state: { message: t("success.passwordReset") } });
    } catch (err) {
      setError(t("errors.resetPassword"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        {/* Logo ou Titre */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">LaPince</h1>
          <p className="text-gray-400">
            Réinitialisation de votre mot de passe
          </p>
        </div>

        {/* Carte principale */}
        <div className="p-6 space-y-6 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-semibold text-white">
              {t("auth.resetPassword")}
            </h2>
            <p className="text-gray-400">
              Choisissez un nouveau mot de passe sécurisé
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="p-4 text-sm text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {t("common.newPassword")}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-400">
                Minimum 8 caractères, incluant lettres, chiffres et caractères
                spéciaux
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {t("common.confirmPassword")}
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 mt-6 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {t("auth.resetPassword")}
            </button>
          </form>

          {/* Indicateur de sécurité du mot de passe */}
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Force du mot de passe :</p>
            <div className="h-1 overflow-hidden bg-gray-700 rounded-full">
              <div
                className={`h-full transition-all duration-300 ${
                  formData.password.length > 12
                    ? "w-full bg-green-500"
                    : formData.password.length > 8
                    ? "w-2/3 bg-yellow-500"
                    : "w-1/3 bg-red-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Aide supplémentaire */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Besoin d'aide ?{" "}
          <a
            href="mailto:suppappbudget@gmail.com"
            className="text-blue-400 hover:text-blue-300"
          >
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
