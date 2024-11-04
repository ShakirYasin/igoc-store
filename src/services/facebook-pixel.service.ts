import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export type FacebookPixelEventData = {
  content_name?: string;
  content_ids?: string[];
  content_type: string;
  value: number;
  currency: string;
  package?: string;
  payment_method?: string;
};

const BASE_URL = "https://graph.facebook.com";
const API_VERSION = "v18.0";

const getUserData = () => {
  return {
    client_ip_address: null, // Collected server-side
    client_user_agent: window.navigator.userAgent,
    fbp: getFbp(),
    fbc: getFbc(),
  };
};

const getFbp = (): string | null => {
  const fbp = document.cookie.match(/_fbp=([^;]+)/);
  return fbp ? fbp[1] : null;
};

const getFbc = (): string | null => {
  const fbc = document.cookie.match(/_fbc=([^;]+)/);
  return fbc ? fbc[1] : null;
};

export const trackServerEvent = async (
  pixelId: string,
  accessToken: string,
  eventName: string,
  eventData: FacebookPixelEventData
) => {
  try {
    const url = `${BASE_URL}/${API_VERSION}/${pixelId}/events`;
    
    const event = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: uuidv4(),
          event_source_url: window.location.href,
          user_data: getUserData(),
          custom_data: {
            ...eventData,
            currency: eventData.currency || "MYR",
          },
          action_source: "website",
        },
      ],
      access_token: accessToken,
    };

    const response = await axios.post(url, event);
    console.log(`Facebook Pixel event ${eventName} tracked:`, response.data);
    return response.data;
  } catch (error) {
    console.error("Error tracking Facebook Pixel event:", error);
    throw error;
  }
}; 