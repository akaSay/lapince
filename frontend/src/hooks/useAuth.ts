import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../contexts/ProfileContext";
import api from "../lib/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { fetchProfile, clearProfile } = useProfileContext();
  const { t } = useTranslation();

  const isAuthenticated = async () => {
    try {
      await api.get("/auth/profile");
      return true;
    } catch {
      return false;
    }
  };

  const initAuth = async () => {
    try {
      await fetchProfile();
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      await api.post<AuthResponse>("/auth/login", credentials);
      await fetchProfile();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        if (errorData && typeof errorData === "object") {
          setError(errorData.message);
        } else {
          setError("Une erreur est survenue lors de la connexion");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post<AuthResponse>(
        "/auth/register",
        credentials
      );

      if (response.data.message !== "Registration successful") {
        throw new Error("Échec de l'inscription");
      }

      await fetchProfile();
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        switch (err.response.status) {
          case 409:
            throw new Error("Cet email est déjà utilisé");
          case 400:
            throw new Error("Données invalides");
          default:
            throw new Error("Erreur lors de l'inscription");
        }
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      clearProfile();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await api.post("/auth/forgot-password", { email });
    } catch (err) {
      throw new Error(t("errors.resetPassword"));
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await api.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
    } catch (err) {
      throw new Error(t("errors.resetPassword"));
    }
  };

  return {
    login,
    register,
    logout,
    error,
    loading,
    isAuthenticated,
    initAuth,
    requestPasswordReset,
    resetPassword,
  };
};
