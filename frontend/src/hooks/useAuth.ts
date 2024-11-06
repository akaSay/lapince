import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../lib/api";
import { useProfileContext } from "../contexts/ProfileContext";

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

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post<AuthResponse>("/auth/login", credentials);
      const { access_token } = response.data;

      if (!access_token) {
        throw new Error("Token non reçu du serveur");
      }

      localStorage.setItem("token", access_token);
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
    clearProfile();
    navigate("/login");
  };

  return { login, register, logout, error, loading };
};
