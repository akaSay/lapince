import { createContext, ReactNode, useContext } from "react";
import { useProfile } from "../hooks/useProfile";
import { User } from "../types/User";

interface ProfileContextType {
  profile: User | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { profile, loading, error, fetchProfile, updateProfile, clearProfile } =
    useProfile();

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
