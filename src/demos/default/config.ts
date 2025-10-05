import baseConfig from "../../utils/config";

// Specific configuration for Demo 1 - Architectural Mode
const defaultConfig = {
  ...baseConfig,

  AppName: "CADViewer: Integrated with CADViewer Conversion Server",
  initFileName: "/content/drawings/dwg/1st_floor_electrical.dwg", //"/content/demo_user/1st floor architectural_01.dwg", //"/content/custom/bpretail/bpretail-splash-05.svg", // the initialization drawing when loading Visual Query, based on a server path




};

export default defaultConfig;
