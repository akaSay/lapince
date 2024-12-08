import { analytics } from "../lib/analytics";
import { useCallback } from "react";

export const useTracking = () => {
  const trackEvent = useCallback((eventName: string, properties: any) => {
    analytics.track(eventName as any, properties);
  }, []);

  return { trackEvent };
};
