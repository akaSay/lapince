import {
  Apple as AppleIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { login, error: authError, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        {/* Logo ou Titre */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">LaPince</h1>
          <p className="text-gray-400">Gérez votre budget simplement</p>
        </div>

        {/* Carte principale */}
        <div className="p-6 space-y-6 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
          <h2 className="text-2xl font-semibold text-center text-white">
            Connexion
          </h2>

          {/* Message d'erreur */}
          {(error || authError) && (
            <div className="p-4 text-sm text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
              {error || authError}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="vous@exemple.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <span className="text-sm text-gray-300">
                  Se souvenir de moi
                </span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-400 bg-gray-800">
                Ou continuer avec
              </span>
            </div>
          </div>

          {/* Boutons sociaux */}
          <div className="grid grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-3 transition-colors duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
              <GoogleIcon className="text-white" />
            </button>
            <button className="flex items-center justify-center p-3 transition-colors duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
              <FacebookIcon className="text-white" />
            </button>
            <button className="flex items-center justify-center p-3 transition-colors duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
              <AppleIcon className="text-white" />
            </button>
          </div>
        </div>

        {/* Lien d'inscription */}
        <p className="mt-6 text-center text-gray-400">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
