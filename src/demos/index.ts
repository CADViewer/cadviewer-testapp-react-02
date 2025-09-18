import { Config } from "../utils/config";
import defaultConfig from "./default/config";

export type DemoType = "default";

export interface DemoInfo {
  id: DemoType;
  name: string;
  description: string;
  config: Config;
  route: string;
}

// Available demo definitions
export const DEMOS: Record<DemoType, DemoInfo> = {
  default: {
    id: "default",
    name: "CADViewer Visual Query",
    description:
      "CADViewer configuration with full feature set, linked against CADViewer Conversion Server",
    config: defaultConfig,
    route: "/",
  },
};

/**
 * Detects the active demo from the current route
 */
export function getActiveDemoFromRoute(): DemoType {
  const pathname = window.location.pathname;

  // Find which demo corresponds to the current route
  for (const demo of Object.values(DEMOS)) {
    if (demo.route === pathname) {
      return demo.id;
    }
  }

  return "default";
}

/**
 * Gets the active configuration based on the current route
 */
export function getActiveConfig() {
  const activeDemo = getActiveDemoFromRoute();
  return DEMOS[activeDemo].config;
}

/**
 * Gets the active demo information
 */
export function getActiveDemoInfo(): DemoInfo {
  const activeDemo = getActiveDemoFromRoute();
  return DEMOS[activeDemo];
}

/**
 * Gets the list of all available demos
 */
export function getAllDemos(): DemoInfo[] {
  return Object.values(DEMOS);
}

/**
 * Gets the route for a given demo
 */
export function getDemoRoute(demoType: DemoType): string {
  return DEMOS[demoType]?.route || "/";
}
