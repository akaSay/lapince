import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
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
          <p className="text-gray-400">Réinitialisation du mot de passe</p>
        </div>

        {/* Carte principale */}
        <div className="p-6 space-y-6 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <div className="p-4 border rounded-lg bg-green-500/10 border-green-500/50">
                <h3 className="mb-2 text-lg font-medium text-green-400">
                  Email envoyé !
                </h3>
                <p className="text-gray-300">{t("auth.resetEmailSent")}</p>
              </div>

              <Link
                to="/login"
                className="block w-full px-4 py-3 font-medium text-center text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {t("auth.backToLogin")}
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-semibold text-white">
                  {t("auth.forgotPassword")}
                </h2>
                <p className="text-gray-400">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="p-4 text-sm text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
                  {error}
                </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="vous@exemple.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {t("auth.sendResetLink")}
                </button>
              </form>

              {/* Lien retour */}
              <div className="pt-4 text-center">
                <Link
                  to="/login"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  ← Retour à la connexion
                </Link>
              </div>
            </>
          )}
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

export default ForgotPassword;
