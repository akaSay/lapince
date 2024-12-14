import { useEffect, useState } from "react";

export type CookieSettings = {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
};

const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  preferences: false,
};

export const useCookieConsent = () => {
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>(() => {
    const saved = localStorage.getItem("cookieConsent");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    const handleCookieUpdate = (event: CustomEvent<CookieSettings>) => {
      setCookieSettings(event.detail);
    };

    window.addEventListener(
      "cookieConsentUpdate",
      handleCookieUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "cookieConsentUpdate",
        handleCookieUpdate as EventListener
      );
    };
  }, []);

  useEffect(() => {
    // Gérer les cookies analytiques (Google Analytics par exemple)
    if (cookieSettings.analytics) {
      // Initialiser Google Analytics
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      // Désactiver Google Analytics
      // window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }

    // Gérer les cookies de préférences
    if (cookieSettings.preferences) {
      document.cookie = "preferences_allowed=true; path=/; max-age=31536000"; // 1 an
    } else {
      document.cookie = "preferences_allowed=false; path=/; max-age=0";
    }
  }, [cookieSettings]);

  return {
    isAnalyticsAllowed: cookieSettings.analytics,
    isPreferencesAllowed: cookieSettings.preferences,
    cookieSettings,
  };
};
