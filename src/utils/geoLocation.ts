// Utility function to fetch and manage user geolocation data
// with rate limiting (max once per day)

import config from "./config";

export interface GeoLocationData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  continent_name: string;
  latitude: number;
  longitude: number;
  time_zone: {
    name: string;
    current_time: string;
  };
  flag: string;
  currency: {
    name: string;
    code: string;
    symbol: string;
  };
  threat?: {
    is_tor: boolean;
    is_proxy: boolean;
    is_anonymous: boolean;
    is_known_attacker: boolean;
    is_known_abuser: boolean;
    is_threat: boolean;
    is_bogon: boolean;
  };
  asn?: {
    asn: string;
    name: string;
    domain: string;
    route: string;
    type: string;
  };
  languages?: Array<{
    name: string;
    native: string;
    code: string;
  }>;
  // Add timestamp when the data was fetched
  timestamp: number;
}

const GEOLOCATION_DATA_KEY = "user_geolocation_data";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const API_ENDPOINT = `https://api.ipdata.co?api-key=${config.geolocationAPIKey}`;

/**
 * Fetch the user's geolocation data if it doesn't exist in localStorage
 * or if the existing data is older than 24 hours
 * @returns Promise<GeoLocationData>
 */
export const fetchGeoLocationData = async (): Promise<GeoLocationData> => {
  // Check if we have data in localStorage and if it's still valid
  const existingData = localStorage.getItem(GEOLOCATION_DATA_KEY);

  if (existingData) {
    const parsedData: GeoLocationData = JSON.parse(existingData);
    const currentTime = new Date().getTime();

    // If the data is less than 24 hours old, return it
    if (currentTime - parsedData.timestamp < ONE_DAY_IN_MS) {
      return parsedData;
    }
  }

  try {
    // Fetch new data
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) {
      throw new Error(
        `Error fetching geolocation data: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Add timestamp to the data
    const geoData: GeoLocationData = {
      ...data,
      timestamp: new Date().getTime(),
    };

    // Store in localStorage
    localStorage.setItem(GEOLOCATION_DATA_KEY, JSON.stringify(geoData));

    return geoData;
  } catch (error) {
    console.error("Failed to fetch geolocation data:", error);

    // If we have existing data (even if outdated), return it as fallback
    if (existingData) {
      return JSON.parse(existingData);
    }

    throw error;
  }
};

/**
 * Get the user's geolocation data from localStorage
 * @returns GeoLocationData | null
 */
export const getGeoLocationData = (): GeoLocationData | null => {
  const data = localStorage.getItem(GEOLOCATION_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * Force refresh the geolocation data regardless of when it was last updated
 * @returns Promise<GeoLocationData>
 */
export const refreshGeoLocationData = async (): Promise<GeoLocationData> => {
  try {
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) {
      throw new Error(
        `Error fetching geolocation data: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Add timestamp to the data
    const geoData: GeoLocationData = {
      ...data,
      timestamp: new Date().getTime(),
    };

    // Store in localStorage
    localStorage.setItem(GEOLOCATION_DATA_KEY, JSON.stringify(geoData));

    return geoData;
  } catch (error) {
    console.error("Failed to refresh geolocation data:", error);
    throw error;
  }
};
