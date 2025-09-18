import baseConfig from "../../utils/config";

// Specific configuration for Demo 1 - Architectural Mode
const defaultConfig = {
  ...baseConfig,
  AppName: "CADViewer: Integrated with CADViewer Conversion Server",
  initFileName: "/content/drawings/dwg/1st_floor_electrical.dwg", //"/content/demo_user/1st floor architectural_01.dwg", //"/content/custom/bpretail/bpretail-splash-05.svg", // the initialization drawing when loading Visual Query, based on a server path
  DisplayCoordinatesMenu: true, // display the CADViewer coordinates menu
  displayTopNavigationBar: true, // display the layout /model space navigation menu
  setSpaceObjectsCustomMenu: true, // display the SpaceObject Navigation menu
  hideLeftHamburgerMenu: true, // hide the left hamburger menu
  BaseAttributes: {
    fill: "#ffd7f4", //'#D3D300', // '#ffd7f4', // '#FFF' , //  '#D3D300', // #D3D3D3  // #FFF   #ffd7f4
    "fill-opacity": 0.1, // 0.1
    stroke: "#CCC",
    "stroke-width": 0.1,
    "stroke-linejoin": "round",
    "stroke-opacity": 1.0,
  },
  HighlightAttributes: {
    fill: "#a4d7f4",
    "fill-opacity": 0.5,
    stroke: "#a4d7f4",
    "stroke-width": 0.2,
    "stroke-linejoin": "round",
    "stroke-opacity": 1.0,
  },
  SelectAttributes: {
    fill: "#5BBEF6",
    "fill-opacity": 0.5,
    stroke: "#5BBEF6",
    "stroke-width": 0.23,
    "stroke-linejoin": "round",
    "stroke-opacity": 1.0,
  },
  // Default property to Load
  defaultPropertyToLoad: {
    propertyNumber: undefined, //"2339", // set to undefined to disable default property
    planName: undefined, //"LP0", // set to undefined to disable default plan
  },

  topPaneScrollDownTitle: "Choose information plan/layer:", // set te title of the top pane scroll down menu
  displayTopPaneScrollDownButton: false, // display the top pane scroll down button, true to show the top pane scroll down menu
  topRowItem1: "Property Name:", // top row items
  topRowItem2: "Property Number:", // top row items
  topRowItem3: "Plan Name:", // top row items



  enableRightFileModalPanel: true,
  setCADViewerSkin: "dark-skin", //CADViewer Skin lightgray, black, deepblue, light-skin, dark-skin
  setBPLayerChange: false,
  ShowInformativeBottomPanel: false, // turn the the bottom panel on off



};

export default defaultConfig;
