import { useEffect, useState, useRef } from "react";
import api from "../lib/api";
import { User } from "../types/User";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef<number>(0);

  const fetchProfile = async () => {
    const now = Date.now();
    if (now - lastFetch.current < CACHE_DURATION && profile) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get("/auth/profile");
      setProfile(data);
      lastFetch.current = now;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (newData: Partial<User>) => {
    try {
      setLoading(true);
      const { data } = await api.put("/auth/profile", newData);
      setProfile(data);
      lastFetch.current = Date.now();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour du profil"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    lastFetch.current = 0;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProfile();
    }
  }, []);

  return { profile, loading, error, fetchProfile, updateProfile, clearProfile };
};
