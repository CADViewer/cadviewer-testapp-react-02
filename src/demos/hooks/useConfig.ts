import { useMemo } from "react";
import { getActiveConfig, getActiveDemoInfo } from "../index";

/**
 * Custom hook to access the active configuration
 * based on the current route (instead of URL parameters)
 */
export function useConfig() {
  const config = useMemo(() => {
    return getActiveConfig();
  }, []);

  const demoInfo = useMemo(() => {
    return getActiveDemoInfo();
  }, []);

  return {
    config,
    demoInfo,
    isDemoMode: demoInfo.id !== "default",
  };
}

/**
 * Hook to access a specific configuration property
 */
export function useConfigValue<
  T extends keyof ReturnType<typeof getActiveConfig>
>(key: T): ReturnType<typeof getActiveConfig>[T] {
  const { config } = useConfig();
  return config[key];
}

export default useConfig;
