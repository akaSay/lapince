type EventName = "sign_up_clicked" | "demo_viewed" | "newsletter_subscribed";

type EventProperties = {
  location: string;
  [key: string]: any;
};

export const analytics = {
  track: (eventName: EventName, properties: EventProperties) => {
    // Intégrez ici votre solution d'analytics préférée
    console.log(`Event tracked: ${eventName}`, properties);
  },
};
