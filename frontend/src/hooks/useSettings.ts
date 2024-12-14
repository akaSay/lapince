import { useEffect, useState } from "react";
import api from "../lib/api";
import { SettingsData } from "../types/settings";
import { useAuth } from "./useAuth";

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchSettings = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/settings");
      setSettings(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SettingsData>) => {
    try {
      const response = await api.patch("/settings", newSettings);
      setSettings(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [isAuthenticated]);

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettings,
  };
};
