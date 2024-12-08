import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../contexts/ProfileContext";
import api from "../lib/api";

interface LoginCredentials {
  rememberMe: any;
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { fetchProfile, clearProfile } = useProfileContext();
  const { t } = useTranslation();

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const isAuthenticated = () => {
    const token = getToken();
    return !!token;
  };

  const initAuth = async () => {
    const token = getToken();
    if (token) {
      try {
        await fetchProfile();
        return true;
      } catch (error) {
        logout();
        return false;
      }
    }
    return false;
  };

  const login = async (
    credentials: LoginCredentials & { rememberMe?: boolean }
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { rememberMe, ...loginCredentials } = credentials;

      const response = await api.post<AuthResponse>(
        "/auth/login",
        loginCredentials
      );
      const { access_token } = response.data;

      if (!access_token) {
        throw new Error("Token non reçu du serveur");
      }

      if (rememberMe) {
        localStorage.setItem("token", access_token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", access_token);
        localStorage.removeItem("token");
      }

      await fetchProfile();
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
      throw err;
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
      const { access_token } = response.data;

      if (!access_token) {
        throw new Error("Token non reçu du serveur");
      }

      localStorage.setItem("token", access_token);
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

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    clearProfile();
    navigate("/login");
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
    getToken,
    initAuth,
    requestPasswordReset,
    resetPassword,
  };
};
