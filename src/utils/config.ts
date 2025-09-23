import { Config } from "../types/config";

export type { Config };

const config: Config = {
  AppName: "CADViewer: Visual Query Demo  ", //"CADViewer: CADViewer Public Demo ", //"CADViewer: Visual Query  ", //"License Keys: CADViewer Conversion Server / TailorMade REST-API Conversion Server", //"Tenants Overview Plans - Current Floor-plan", //"Standard Visual Query encapsulation of CADViewer", //"Tenants Overview Plans - Current Floor-plan", //"Standard Visual Query encapsulation of CADViewer", // "Comparez les dessins d'infrastructures ferroviaires", // BPRetail "Tenants Overview Plans - Current Floor-plan",   //  "CADViewer: Visual Query ",     // Tenants Overview Plans  &nbsp;&nbsp;- &nbsp;&nbsp;Current Floor-plan:
  ContactEmailsFlag: false, // set to true to display contact emails in the about box
  ContactEmails: [
    "developer@tailormade.com",
    "internationalsales@tailormade.com",
  ],
  ZoomFactor: 25.0, // zoom factor for cvjs_zoomHere_ObjectId() in left panel click
  ServerBackEndUrl: "http://localhost:3000",           // This is the URL of the CADViewer back-end server
  ServerLocation: "", // leave blank  in most cases
  ServerUrl: "http://localhost:3001", // this is the URL of the front end server
  postFixServerToken: false, // true if the server shall be contatenated with a Toke, //n, kept on the Server, use a postfixed SAS token, when loading JSON content
  bearerToken: "", //"Bearer t-7614f875-8423-4f20-a674-d7cf3096290e", // "",   // security bearer token (if not applicable, set to "")

  debugMode: false, // enables CADViewer debug traces in the browser

  setCADViewerLanguage: "English", // Available languages:  "English" ; "French, "Korean", "Spanish", "Portuguese", "Chinese-Simplified", "Chinese-Traditional"

  // "initFileName":"/content/drawings/dwg/1st floor architectural.dwg",  // the initialization drawing when loading Visual Query, based on a server path
  initFileName: "", //"/content/demo_user/1st floor architectural_01.dwg", //, // the initialization drawing when loading Visual Query, based on a server path
  // "initFileName":"", // initial drawing to load, if empty, no drawing is loaded

  // "initFileName":"/content/drawings/dwg/1st floor architectural.dwg", // initial drawing to load, if empty, no drawing is loaded
  canvasMode: "SINGLE", // SINGLE || MULTIPLE

  UploadNewFile: "Upload new file(s) to MY FOLDER", //""Upload new file", // text for upload new file button

  activateCompareOnLoad: false,
  // false is default,  activate the compare tool on load  example call: http://localhost:3001/?compareFile=/nodejs/cadviewer-conversion-server/content/drawings/dwg_compare_drawings/hq17-1.dwg&compareWith=/nodejs/cadviewer-conversion-server/content/drawings/dwg_compare_drawings/hq17-2.dwg
  // false is default,  activate the compare tool on load  example call: http://localhost:3001/?compareFile=/nodejs/cadviewer-conversion-server/content/custom/SNCF/S0001A-0001-830014-VIP22%201.dwg&compareWith=/nodejs/cadviewer-conversion-server/content/custom/SNCF/S0001A-0001-830014-VIP22%202.dwg
  // cadviewer license key

  //    "cadviewerLicenseKey" : "00110010 00110010 00110000 00110001 00110010 00110000 00110110 00110001 00110100 00111000 00110001 00110100 00110101 00110001 00110101 00110111 00110001 00110101 00111001 00110001 00110100 00111000 00110001 00110101 00110010 00110001 00110100 00110101 00110001 00110100 00110001 00110001 00110100 00110000 00110001 00111001 00111000 00110010 00110000 00110110 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110000 00110011 00110010 00110001 00110001 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110001 00110001 00110010 00110000 00110110 00110010 00110000 00110000 00110001 00111001 00111000 00110001 00110100 00110001 00110001 00110100 00110100 00110001 00110101 00111001 00110001 00110101 00110111 00110001 00110101 00110101",
  cadviewerLicenseKey: "00110010 00110010 00110000 00110001 00110010 00110000 00110110 00110001 00110100 00111000 00110001 00110100 00110101 00110001 00110101 00110111 00110001 00110101 00111001 00110001 00110100 00111000 00110001 00110101 00110010 00110001 00110100 00110101 00110001 00110100 00110001 00110001 00110100 00110000 00110001 00111001 00111000 00110010 00110000 00110110 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110000 00110011 00110010 00110001 00110001 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110001 00110001 00110010 00110000 00110110 00110010 00110000 00110000 00110001 00111001 00111000 00110001 00110100 00110001 00110001 00110100 00110100 00110001 00110101 00111001 00110001 00110101 00110111 00110001 00110101 00110101",

  // conversion parameters - these can dynamically be change in the settings modal
  //    "conversionParameters" :[{"param":"model", "value": ""}, {"param":"extents", "value": ""}, {"param":"trace", "value": ""}, {"param":"strokeall", "value": ""}, {"param":"SVGTOL", "value": "0.001"}],
  //    "conversionParameters" :[{"param":"last", "value": ""},{"param":"ial", "value": ""}],

  //&    "conversionParameters" :[{"param":"last", "value": ""},{"param":"extents", "value": ""},{"param":"rl", "value": "SF-TENANT-PL;SF-TENANT-PL-ALT"},{"param":"tl", "value": "BI-TEXT;BI-TEXT-ALT"},{"param":"q", "value": ""}, {"param":"ial", "value": ""}, {"param":"lws", "value": "0.33"}],
  //    "conversionParameters" :[{"param":"last", "value": ""},{"param":"extents", "value": ""},{"param":"rl", "value": "SF-TENANT-PL;SF-TENANT-PL-ALT"},{"param":"tl", "value": "BI-TEXT;BI-TEXT-ALT"},{"param":"q", "value": ""}, {"param":"ial", "value": ""}, {"param":"lws", "value": "1.0"}],
  //    "conversionParameters" :[{"param":"layout", "value": "layout1"}, {"param":"extents", "value": ""}, {"param":"trace", "value": ""}, {"param":"hlall", "value": ""}],
  /*
  conversionParameters: [
    { param: "last", value: "" },
    { param: "extents", value: "" },
    { param: "rl", value: "SF-TENANT-PL;SF-TENANT-PL-ALT;PDF_Geometry" },
    { param: "tl", value: "BI-TEXT;BI-TEXT-ALT;PDF_Text" },
    { param: "q", value: "" },
    { param: "ial", value: "" },
    { param: "lws", value: "1.0" },
  ],
*/
  conversionParameters: [
    { param: "last", value: "" },
    /*    { param: "extents", value: "" },*/
    /*    { param: "rl", value: "VizQuery_Space" },
    { param: "tl", value: "VizQuery_ID" },
    { param: "nbe", value: "" },
    { param: "strokea", value: "" }, */
  ],

  // set layer colors on load  - mira
  //    "defaultLayerColorsOnLoad" :[{"layer":"0","color":"#000"},{"layer":"HIDDEN","color":"#000"},{"layer":"Border","color":"#000"},{"layer":"Title BLock","color":"#000"},{"layer":"TEXT","color":"#000"},{"layer":"PIPE2","color":"#000"},{"layer":"EQUIP","color":"#000"},{"layer":"PIPE","color":"#000"}, {"layer":"INST","color":"#000"},{"layer":"ELECT2","color":"#000"},{"layer":"HIDDEN","color":"#000"}],
  //  bp
  //     "defaultLayerColorsOnLoad" :[{"layer":"0","color":"#000"},{"layer":"ARCH-DOORS-EXTERIOR","color":"#000"},{"layer":"ARCH-DOORS-INTERIOR","color":"#000"},{"layer":"ARCH-FEATURES","color":"#000"},{"layer":"ARCH-OPENINGS-ABOVE","color":"#000"},{"layer":"ARCH-OPENINGS-BELOW","color":"#000"},{"layer":"ARCH-SITE-MISCELLANEOUS","color":"#000"},{"layer":"ARCH-SYMBOLS","color":"#000"},{"layer":"ARCH-WALLS-EXTERIOR","color":"#000"},{"layer":"ARCH-WALLS-INTERIOR","color":"#000"},{"layer":"BD-STORAGE","color":"#000"},{"layer":"TABLE-ACREAGE","color":"#000"},{"layer":"SITE-BUILDING","color":"#000"},{"layer":"SITE-CURB","color":"#000"},{"layer":"SITE-PARKING","color":"#000"},{"layer":"TABLE-PARKING-DATA","color":"#000"},{"layer":"SITE-PROPERTY-LINE","color":"#000"},{"layer":"SITE-SIDEWALK","color":"#000"},{"layer":"SITE-MISCELLANEOUS","color":"#000"},{"layer":"SITE-STRIPING","color":"#000"},{"layer":"SITE-TEXT","color":"#000"},{"layer":"DIMENSIONS-STRUCTURAL-GRID","color":"#000"},{"layer":"DIMENSIONS-TENANT","color":"#000"},{"layer":"STRUCTURAL-EXPANSION-JOINT","color":"#000"},{"layer":"KIOSK-SF","color":"#000"},{"layer":"TENANT-SPNO","color":"#000"},{"layer":"TENANT-SF","color":"#000"},{"layer":"KIOSK-NAME","color":"#000"},{"layer":"TENANT-OCCUPANCY-COST","color":"#000"},{"layer":"TENANT-R12-SALES","color":"#000"},{"layer":"TENANT-NAME","color":"#000"},{"layer":"STRUCTURAL-SHEAR-WALL","color":"#000"},{"layer":"STRUCTURAL-BRACING","color":"#000"},{"layer":"STRUCTURAL-COLUMNS","color":"#000"},{"layer":"STRUCTURAL-GRID-TAGS","color":"#000"},{"layer":"ARCH-WALLS-DEMISING","color":"#000"},{"layer":"TENANT-STOREFRONT-LEASELINE","color":"#000"},{"layer":"TEXT-GENERAL","color":"#000"},{"layer":"TEXT-MISCELLANOUS","color":"#000"},{"layer":"TEXT-NOTES","color":"#000"},{"layer":"TITLEBLOCK","color":"#000"},{"layer":"UTILITIES-ELECTRICAL","color":"#000"},{"layer":"UTILITIES-EQUIPMENT","color":"#000"},{"layer":"UTILITIES-HVAC","color":"#000"},{"layer":"UTILITIES-PLUMBING","color":"#000"},{"layer":"KIOSK-SPNO","color":"#000"},{"layer":"XREF","color":"#000"}],
  // bp - new
  setBPLayerChange: true, // SET custom HEADER for BP Retail Layer Change  - 10.55.2

  defaultLayerColorsOnLoad: [
    // set the layer colors for BP Retail
    { layer: "0", color: "#000" },
    { layer: "ARCH-DOORS-EXTERIOR", color: "#000" },
    { layer: "ARCH-DOORS-INTERIOR", color: "#000" },
    { layer: "ARCH-FEATURES", color: "#000" },
    { layer: "ARCH-OPENINGS-ABOVE", color: "#000" },
    { layer: "ARCH-OPENINGS-BELOW", color: "#000" },
    { layer: "ARCH-SITE-MISCELLANEOUS", color: "#000" },
    { layer: "ARCH-SYMBOLS", color: "#000" },
    { layer: "ARCH-WALLS-EXTERIOR", color: "#000" },
    { layer: "ARCH-WALLS-INTERIOR", color: "#000" },
    { layer: "BD-STORAGE", color: "#000" },
    { layer: "TABLE-ACREAGE", color: "#000" },
    { layer: "SITE-BUILDING", color: "#000" },
    { layer: "SITE-CURB", color: "#000" },
    { layer: "SITE-PARKING", color: "#000" },
    { layer: "TABLE-PARKING-DATA", color: "#000" },
    { layer: "SITE-PROPERTY-LINE", color: "#000" },
    { layer: "SITE-SIDEWALK", color: "#000" },
    { layer: "SITE-MISCELLANEOUS", color: "#000" },
    { layer: "SITE-STRIPING", color: "#000" },
    { layer: "SITE-TEXT", color: "#000" },
    { layer: "DIMENSIONS-STRUCTURAL-GRID", color: "#000" },
    { layer: "DIMENSIONS-TENANT", color: "#000" },
    { layer: "STRUCTURAL-EXPANSION-JOINT", color: "#000" },
    { layer: "KIOSK-SF", color: "#000" },
    { layer: "TENANT-SPNO", color: "#000" },
    { layer: "TENANT-SF", color: "#000" },
    { layer: "KIOSK-NAME", color: "#000" },
    { layer: "TENANT-OCCUPANCY-COST", color: "#000" },
    { layer: "TENANT-R12-SALES", color: "#000" },
    { layer: "TENANT-NAME", color: "#000" },
    { layer: "STRUCTURAL-SHEAR-WALL", color: "#000" },
    { layer: "STRUCTURAL-BRACING", color: "#000" },
    { layer: "STRUCTURAL-COLUMNS", color: "#000" },
    { layer: "STRUCTURAL-GRID-TAGS", color: "#000" },
    { layer: "ARCH-WALLS-DEMISING", color: "#000" },
    { layer: "TENANT-STOREFRONT-LEASELINE", color: "#000" },
    { layer: "TEXT-GENERAL", color: "#000" },
    { layer: "TEXT-MISCELLANOUS", color: "#000" },
    { layer: "TEXT-NOTES", color: "#000" },
    { layer: "TITLEBLOCK", color: "#000" },
    { layer: "UTILITIES-ELECTRICAL", color: "#000" },
    { layer: "UTILITIES-EQUIPMENT", color: "#000" },
    { layer: "UTILITIES-HVAC", color: "#000" },
    { layer: "UTILITIES-PLUMBING", color: "#000" },
    { layer: "KIOSK-SPNO", color: "#000" },
    { layer: "XREF", color: "#000" },
    { layer: "ARCH-CORPORATE-OFFICE-EQUIPMENT", color: "#000" },
    { layer: "ARCH-CORPORATE-OFFICE-GLAZING", color: "#000" },
    { layer: "FURNITURE-CORPORATE-OFFICE-BLACK", color: "#000" },
    { layer: "SF-CORPORATE-OFFICE-CONFERENCE-ROOM-PL", color: "#000" },
    { layer: "SF-CORPORATE-OFFICE-ENCLAVE-PL", color: "#000" },
    { layer: "SF-CORPORATE-OFFICE-STORAGE-PL", color: "#000" },
    { layer: "TEXT-CORPORATE-OFFICE-FLOOR-IDENTIFICATION", color: "#000" },
  ],

  defaultLayerSetTimeout: 50, // in milliseconds
  currentView: [], // placeholder for the current view, set by the view menu

  // VISUAL QUERY PANEL CONTROLS
  ShowInformativeBottomPanel: false, // turn the the bottom panel on off
  ShowInformativeBottomPanelWhenClickInLeftPanel: false,
  ShowInformativeLeftPanel: false, // initia show the left side panel
  bottomPaneSliderMode: "withCADViewer", // withCADViewer, aboveCADViewer,
  bottomPaneDefaultHeight: 15, // (15)   percentage of screen height (2) min
  rightPanelDefaultWidth: 36, // (40) percentage of screen height
  leftPaneDefaultWidth: 17, // (17) percentage of screen height

  // measurement controls
  setCallbackMeasurement: true, // set the callback measurement function

  // print pdf controls
  printPDFflag: false, // add/remove checkbox for print as pdf
  printAsPDF: false, // force server side conversion to pdf
  setPaperSize: "letter", // "A4"  , "letter"    set the papersize on the print modal
  // printer controls
  printMargins_nonprint_h: 10, // non print margin region vertical, default 10mm
  printMargins_nonprint_w: 10, // non print margin region horizontal, default 10mm
  printMargins_standard_h: 18, // non print margin region horizontal, default 18mm
  printMargins_standard_w: 8, // non print margin region vertical, default 8mm
  printMargins_tiny_h: 10, // non print margin region horizontal, default 6mm
  printMargins_tiny_w: 6, // non print margin region vertical, default 6mm
  printMargins_none_h: 0, // no margins, default 0mm
  printMargins_none_w: 0, // no margins, default 0mm
  // "printMargins_custom_h": "10mm", // custom margin region horizontal

  // CADVIEWER MENU CONTROLS
  DisplayCoordinatesMenu: false, // display the CADViewer coordinates menu
  displayTopNavigationBar: true, // display the layout /model space navigation menu
  setSpaceObjectsCustomMenu: true, // display the SpaceObject Navigation menu
  hideLeftHamburgerMenu: false, // hide the left hamburger menu

  // Floating Toolbar Configuration
  floatingToolbar: true, // display the floating toolbar
  floatingToolbarOrientation: "horizontal", // "vertical" or "horizontal"
  floatingToolbarIconSize: "medium", // "small" (w-5 h-5), "medium" (w-6 h-6), "large" (w-7 h-7)

  // TOP NAVIGATION BAR CONTROLS
  displayTopMenuIconBar: true, // display the top menu icon bar
  setTopMenuXMLDirect: true, //true          // determines if XML menu is loaded from file or passed over from sting expression
  // controls for loading top icon menu from server
  topMenuXML: "cadviewer_full_commands_01.xml", //"cadviewer_no_loading_02.xml", //"cadviewer_full_commands_01.xml", //,        // menu configuration file used  - default is: cadviewer_full_commands_01.xml   cadviewer_viewonly_nofileload_01.xml
  topMenuXMLpath: "/cadviewer/app/cv/cv-pro/menu_config/", //  the path for XML config files on nodejs conversion server           "/cadviewer/app/cv/cv-pro/menu_config/"
  // top xml icon menu config file for direct insertion

  // zoom controls for bitmap wallpaper
  setZoomImageWallpaper: false, // set the zoom image wallpaper
  setZoomImageWallpaper_scalefactor: 1.0, // set the zoom image wallpaper scale factor , fixed at 1.0
  setZoomImageWallpaper_scalebreakpoint: 0.3, // set the zoom image wallpaper switch breakpoint

  // control og mouse wheel operations
  setScrollWheelThrottleDelay: 75, // millisec scroll throttle delta
  setScrollWheelZoomSteps: 0, // zoom steps, omit zoom wheel interaction,
  setScrollWheelDefaultZoomFactor: 1.4, // default zoom factor for scroll wheel

  // fixed line weight controls
  setNormalizeFixedLineWeights: false, // adjust fixed line weights
  setNormalizeFixedLineWeightsFactor: 2, // global scale factor for fixed line weights

  //                 <command>cvjs_compareDrawings_LoadSecondDrawing</command>

  // page 1   <command>cvjs_interactiveLayerOff</command>  removed from interface
  // page 2                  <command>cvjs_mergeDXFDWG</command>    <command>cvjs_mergeQR</command> removed from interface

  //* FOR DEMO MODE WE PREVENT SAVE OF REDLINES, SPACE OBJECTS AND IMAGE LINKS

  topMenuXML_config_file: `
    <cvjs>
    <iconmenu>
        <totalpages>3</totalpages>
        <startpage>1</startpage>
        <pages>
            <page>
                <command>cvjs_customCommand_19</command>
                <command>cvjs_Print</command>
                <command>cvjs_LayerList</command>
                <command>cvjs_interactiveLayerOff</command>
                <command>cvjs_swapLayersInDrawing</command>
                <command>cvjs_allLayersInDrawingOn</command>
                <command>cvjs_toggleBlackWhite</command>
                <command>cvjs_setBackgroundColor</command>
                <command>cvjs_interactiveSearchText</command>
                <command>cvjs_Measurement</command>
                <command>cvjs_calibrateMeasurement</command>
                <command>cvjs_displayMagnifyingGlass</command>
                <command>cvjs_activateLineThicknessModal</command>
                <command>cvjs_compareDrawings_LoadSecondDrawing</command>
                <command>cvjs_About</command>
                <command>cvjs_Settings</command>
                <command>cvjs_Help</command>
                </page>
            <page>
                <command>cvjs_loadStickyNotesRedlinesUser</command>
                <command>cvjs_customCommand_10</command>
                <command>cvjs_publishPDF</command>
                <command>cvjs_saveAsSVGOnServer</command>
                <command>cvjs_setRedlineColor</command>
                <command>cvjs_setRedlineThickness</command>
                <command>cvjs_drawStickyNote</command>
                <command>cvjs_drawRedlineText</command>
                <command>cvjs_drawRedline_Freehand</command>
                <command>cvjs_drawRedlineSingleLine</command>
                <command>cvjs_drawRedlineEllipseCloud</command>
                <command>cvjs_drawRedlineFilledPolygon</command>
                <command>cvjs_drawRedlinePolyline</command>
                <command>cvjs_drawRedlineFilledRectangle</command>
                <command>cvjs_drawRedlineRectangle</command>
                <command>cvjs_drawRedlineTriangle</command>
                <command>cvjs_drawRedlineArrow</command>
                <command>cvjs_moveRedline</command>
                <command>cvjs_resizeRedline</command>
                <command>cvjs_rotateRedline</command>
                <command>cvjs_deleteSingleRedline</command>
                <command>cvjs_deleteLastRedline</command>
                <command>cvjs_undoDeleteLastRedline</command>
                <command>cvjs_clearCurrentRedline</command>
                <command>cvjs_About</command>
                <command>cvjs_Settings</command>
                <command>cvjs_Help</command>
            </page>
            <page>
                <command>cvjs_customCommand_19</command>
                <command>cvjs_loadSpaceObjectsUser</command>
                <command>cvjs_customCommand_12</command>
                <command>cvjs_saveAsSVGOnServer</command>
                <command>cvjs_changeSpaceObjectDisplayMode</command>
                <command>cvjs_setSpaceObjectColor</command>
                <command>cvjs_addPolygonSpaceObject</command>
                <command>cvjs_addRectangleSpaceObject</command>
                <command>cvjs_addCircleSpaceObject</command>
                <command>cvjs_copyCircleSpaceObject</command>
                <command>cvjs_resizeSpaceObject</command>
                <command>cvjs_moveSpaceObject</command>
                <command>cvjs_rotateSpaceObject</command>
                <command>cvjs_deleteSpaceObject</command>
                <command>cvjs_clearSpaceObjects</command>
                <command>cvjs_bringToFront</command>
                <command>cvjs_sendToBack</command>
                <command>cvjs_bringForward</command>
                <command>cvjs_sendBackward</command>
                <command>cvjs_insertImageLink</command>
                <command>cvjs_loadAllImageLinks</command>
                <command>cvjs_customCommand_11</command>
                <command>cvjs_clearAllImageLinks</command>
                <command>cvjs_setQuickCountColor</command>
                <command>cvjs_quickCount</command>
                <command>cvjs_showMeCounts</command>
                <command>cvjs_clearQuickCounts</command>
                <command>cvjs_LayerListSpace</command>
                <command>cvjs_swapLayersInDrawing</command>
                <command>cvjs_allLayersInDrawingOn</command>
                <command>cvjs_About</command>
                <command>cvjs_Settings</command>
                <command>cvjs_Help</command>
                </page>
        </pages>
        <icons_per_row>0</icons_per_row>
        <icon_page_left_x>0</icon_page_left_x>
        <icon_page_left_y>0</icon_page_left_y>
        <customcommand>
                <tooltip>Command tooltip 1</tooltip>
                <tooltip>Command tooltip 2</tooltip>
                <tooltip>Command tooltip 3</tooltip>
                <tooltip>Command tooltip 4</tooltip>
                <tooltip>Command tooltip 5</tooltip>
                <tooltip>Command tooltip 6</tooltip>
                <tooltip>Command tooltip 7</tooltip>
                <tooltip>Command tooltip 8</tooltip>
                <tooltip>Command tooltip 9</tooltip>
                <tooltip>Save Redline and Stickynotes</tooltip>
                <tooltip>Save Inserted Images</tooltip>
                <tooltip>Save Space Objects and Icon Objects</tooltip>
                <tooltip>Command tooltip 13</tooltip>
                <tooltip>Command tooltip 14</tooltip>
                <tooltip>Command tooltip 15</tooltip>
                <tooltip>Command tooltip 16</tooltip>
                <tooltip>Command tooltip 17</tooltip>
                <tooltip>Command tooltip 18</tooltip>
                <tooltip>Browse Folder Structure</tooltip>
                <tooltip>Select Property</tooltip>
        </customcommand>	
    </iconmenu>
    <zoommenu>
        <location_left_x>2</location_left_x>
        <location_left_y>40</location_left_y>
    </zoommenu>
    </cvjs>
    `,

  /*  Full CADViewer Menu for Viz Query  * /
  topMenuXML_config_file: `
    <cvjs>
    <iconmenu>
        <totalpages>3</totalpages>
        <startpage>1</startpage>
        <pages>
            <page>
                <command>cvjs_customCommand_19</command>
                <command>cvjs_Print</command>
                <command>cvjs_LayerList</command>
                <command>cvjs_interactiveLayerOff</command>
                <command>cvjs_swapLayersInDrawing</command>
                <command>cvjs_allLayersInDrawingOn</command>
                <command>cvjs_toggleBlackWhite</command>
                <command>cvjs_setBackgroundColor</command>
                <command>cvjs_interactiveSearchText</command>
                <command>cvjs_Measurement</command>
                <command>cvjs_calibrateMeasurement</command>
                <command>cvjs_displayMagnifyingGlass</command>
                <command>cvjs_activateLineThicknessModal</command>
                <command>cvjs_compareDrawings_LoadSecondDrawing</command>
                <command>cvjs_About</command>
                <command>cvjs_Settings</command>
                <command>cvjs_Help</command>
                </page>
            <page>
                <command>cvjs_loadStickyNotesRedlinesUser</command>
                <command>cvjs_saveStickyNotesRedlinesUser</command>
                <command>cvjs_publishPDF</command>
                <command>cvjs_saveAsSVGOnServer</command>
                <command>cvjs_setRedlineColor</command>
                <command>cvjs_setRedlineThickness</command>
                <command>cvjs_drawStickyNote</command>
                <command>cvjs_drawRedlineText</command>
                <command>cvjs_drawRedline_Freehand</command>
                <command>cvjs_drawRedlineSingleLine</command>
                <command>cvjs_drawRedlineEllipseCloud</command>
                <command>cvjs_drawRedlineFilledPolygon</command>
                <command>cvjs_drawRedlinePolyline</command>
                <command>cvjs_drawRedlineFilledRectangle</command>
                <command>cvjs_drawRedlineRectangle</command>
                <command>cvjs_drawRedlineTriangle</command>
                <command>cvjs_drawRedlineArrow</command>
                <command>cvjs_moveRedline</command>
                <command>cvjs_resizeRedline</command>
                <command>cvjs_rotateRedline</command>
                <command>cvjs_deleteSingleRedline</command>
                <command>cvjs_deleteLastRedline</command>
                <command>cvjs_undoDeleteLastRedline</command>
                <command>cvjs_clearCurrentRedline</command>
                <command>cvjs_About</command>
                <command>cvjs_Settings</command>
                <command>cvjs_Help</command>
            </page>
            <page>
                <command>cvjs_customCommand_19</command>
                <command>cvjs_loadSpaceObjectsUser</command>
                <command>cvjs_saveSpaceObjectsUser</command>
                <command>cvjs_saveAsSVGOnServer</command>
                <command>cvjs_changeSpaceObjectDisplayMode</command>
                <command>cvjs_addPolygonSpaceObject</command>
                <command>cvjs_addRectangleSpaceObject</command>
                <command>cvjs_addCircleSpaceObject</command>
                <command>cvjs_copyCircleSpaceObject</command>
                <command>cvjs_resizeSpaceObject</command>
                <command>cvjs_moveSpaceObject</command>
                <command>cvjs_rotateSpaceObject</command>
                <command>cvjs_deleteSpaceObject</command>
                <command>cvjs_clearSpaceObjects</command>
                <command>cvjs_bringToFront</command>
                <command>cvjs_sendToBack</command>
                <command>cvjs_bringForward</command>
                <command>cvjs_sendBackward</command>
                <command>cvjs_insertImageLink</command>
                <command>cvjs_loadAllImageLinks</command>
                <command>cvjs_saveAllImageLinks</command>
                <command>cvjs_clearAllImageLinks</command>
                <command>cvjs_quickCount</command>
                <command>cvjs_showMeCounts</command>
                <command>cvjs_clearQuickCounts</command>
                <command>cvjs_LayerListSpace</command>
                <command>cvjs_swapLayersInDrawing</command>
                <command>cvjs_allLayersInDrawingOn</command>
                <command>cvjs_About</command>
                <command>cvjs_Settings</command>
                <command>cvjs_Help</command>
                </page>
        </pages>
        <icons_per_row>0</icons_per_row>
        <icon_page_left_x>0</icon_page_left_x>
        <icon_page_left_y>0</icon_page_left_y>
        <customcommand>
                <tooltip>Command tooltip 1</tooltip>
                <tooltip>Command tooltip 2</tooltip>
                <tooltip>Command tooltip 3</tooltip>
                <tooltip>Command tooltip 4</tooltip>
                <tooltip>Command tooltip 5</tooltip>
                <tooltip>Command tooltip 6</tooltip>
                <tooltip>Command tooltip 7</tooltip>
                <tooltip>Command tooltip 8</tooltip>
                <tooltip>Command tooltip 9</tooltip>
                <tooltip>Command tooltip 10</tooltip>
                <tooltip>Command tooltip 11</tooltip>
                <tooltip>Command tooltip 12</tooltip>
                <tooltip>Command tooltip 13</tooltip>
                <tooltip>Command tooltip 14</tooltip>
                <tooltip>Command tooltip 15</tooltip>
                <tooltip>Command tooltip 16</tooltip>
                <tooltip>Command tooltip 17</tooltip>
                <tooltip>Command tooltip 18</tooltip>
                <tooltip>Browse Folder Structure</tooltip>
                <tooltip>Select Property</tooltip>
        </customcommand>	
    </iconmenu>
    <zoommenu>
        <location_left_x>2</location_left_x>
        <location_left_y>40</location_left_y>
    </zoommenu>
    </cvjs>
    `,

  //*/

  setUnitForCalibrate: "m", // set base unit for calibrate modal
  // DRAWING BASE LINE WEIGHT
  adjustMinimumLineThickness: 200, // Line minimum thickness, in percentage of the minimum line weight in the loaded drawing

  setNoModalMode: false, // set no highlight modal mode to true or false
  /*
    // CONTROL OF POPUP MODAL
    "popupCustomMenu1" : "Custom<br>Menu 1<br>",               // custom menu 1   -  my_own_clickmenu1 in CADViewer.js
    "popupCustomFontAwesomeIcon1" : "fa fa-info-circle",               // custom menu 1 - icon 1 
    "popupCustomMenu2" : "Custom<br>Menu 2<br>",               // custom menu 2 - my_own_clickmenu2 in CADViewer.js
    "popupCustomFontAwesomeIcon2" : "fa fa-undo",               // custom menu 2  - icon 2
    // */

  //* change in property section

  CADViewerPublicDemo: true, // set the CADViewerPublicDemo to true or false

  //* SETTINGS OF THE COLORS OF SPACES  - blue base colors

  BaseAttributes: {
    fill: "#ffd7f4", //'#D3D300', // '#ffd7f4', // '#FFF' , //  '#D3D300', // #D3D3D3  // #FFF   #ffd7f4
    "fill-opacity": 0.1, //"0.1",   // 0.1
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
    "fill-opacity": "0.5",
    stroke: "#5BBEF6",
    "stroke-width": 0.23,
    "stroke-linejoin": "round",
    "stroke-opacity": 1.0,
  },
//*/

  setSpaceNameAsTypeInPopup: false, // set space name as type in popup to true or false

  //            */

  /* /  COLOR OBJECTS FOR HIGHLIGHTS 
    // Base attributes of Space Object   - red/pink
    "BaseAttributes" : {
        "fill": "#d8e1e3", //'#d8e1e3', // '#ffd7f4', //'#D3D3D3',   // #FFF   #ffd7f4
        "fill-opacity": "0.1",
        "stroke": "#CCC", //  #CCC
        "stroke-width": 0.5,
        "stroke-opacity": "0.1",
        "stroke-linejoin": "round",
    },
    // Mouse over highlight attributes of Space Object
    "HighlightAttributes" : {
        "fill": "#ffd7f4", //"#a4d7f4",  // '#ffd7f4'
        "fill-opacity": "0.6",
        "stroke": "#ffd7f4", // "#a4d7f4",
        "stroke-width": 1,
        "stroke-opacity": "0.8",
    },
    // Mouse click highlight attributes of Space Object
    "SelectAttributes" : {
        "fill": "#ed39a5", //"#5BBEF6",   //#ed39a5
        "fill-opacity": "0.6",
        "stroke": "#ed39a5", //"#5BBEF6",  // #ed39a5
        "stroke-width": 1,
        "stroke-opacity": "0.8",
    },
    // */

  //  COLOR OBJECTS FOR HIGHLIGHTS   - make fully transparent
  // Base attributes of Space Object
  /*
  BaseAttributes: {
    fill: "#ffffff", //'#d8e1e3', // '#ffd7f4', //'#D3D3D3',   // #FFF   #ffd7f4
    "fill-opacity": 0.0,
    stroke: "#CCC", //  #CCC
    "stroke-width": 0.0,
    "stroke-opacity": 0.0,
    "stroke-linejoin": "round",
  },

  // Mouse over highlight attributes of Space Object

  HighlightAttributes: {
    fill: "ffffff", //"#ffd7f4", //"#a4d7f4",  // '#ffd7f4'
    "fill-opacity": 0.0,
    stroke: "#ffd7f4", // "#a4d7f4",
    "stroke-width": 0.0,
    "stroke-opacity": 0.0,
  },

  // Mouse click highlight attributes of Space Object

  SelectAttributes: {
    fill: "#ffffff", //"#ed39a5", //"#5BBEF6",   //#ed39a5
    "fill-opacity": 0.0,
    stroke: "#3E20E7", //"#ed39a5", //"#5BBEF6",  // #ed39a5   //rgb(62, 32, 231)
    "stroke-width": 1,
    "stroke-linejoin": "round",
    "stroke-opacity": 0.8,
  },
  // */

  setRedlineModeInfo: false, // set redline mode info to true or false
  setRedlineDynamicPath: true, // set redline dynamic path to true or false , this will ensure one redline location per drawing
  setSpaceObjectDynamicPath: true, // set space object dynamic path to true or false , this will ensure one space object location per drawing
  setImageObjectDynamicPath: true, // set imageobject dynamic path to true or false , this will ensure one image object location per drawing

  setCADViewerSkin: "light-skin", //CADViewer Skin lightgray, black, deepblue, light-skin, dark-skin

  // enable or disable features in ... right side icon
  rightMenuMode: "Inline", // Popup, Inline
  rightMenuPopupText: "Open Menu",
  enableRightMenuIcon: true,
  enableRightFileModalPanel: true,
  enableRightFileModalPanelText: "Open Files", //"Dateiordnerstruktur", //"Structure des dossiers", //"Folder Structure",   //
  rightFileModalPanelTitle: "Folder Structure", //"Dateiordnerstruktur", //"Structure des dossiers", //"Folder Structure",   //
  rightFileModalPanelSubTitle: "Drill down to select file", //"Explorez pour sélectionner le fichier", //"Drill down to select file",

  enableRightEmployeePanel: false,
  enableRightEmployeePanelText: "Employees",
  enableRightArchivePanel: false,
  enableRightArchivePanelText: "Archive",

  layerOptionWidth: 460, // in pixels
  rightActionPanelWidth: 600, //Todo in pixels
  planFile: "plan.json",
  planTypeText: "Plan",
  planSubTypeText: "Type",

  // controls for redline text
  setforeignObjectInRedlineText: true, // set foreign object in redline text to true or false

  // Tooltip text
  hambugerMenuTooltip: "Open/Close Left Panel",
  rightActionPanelTooltip: "Open Options Panel",
  leaseStartDate: "Lease Start Date",
  leaseEndDate: "Lease End Date",

  // Left Panel
  defaultLeftPanelOpen: false,

  // 1900-01-01T00:00:00 or 1900-01-01    - search of date-types for modification
  dateRegex: [
    "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$",
    "^\\d{4}-\\d{2}-\\d{2}$",
  ],

  // Action panel side settings
  actionPanelSide: "left", // left, right,   settings of the action panel side

  // Upload files features
  maxUploadSize: "10", // maximun size in mb

  // Top Bar Logo
  topBarLogo: "", //"SNCF_reseau_01.png", // "",//"B-prop_logo_rgb.png", //"", //"SNCF_reseau_01.png" , // "SNCF Reseau    //  BPRetail "B-prop_logo_rgb.png", // "https://cadviewer.com/images/cadviewer/cv-logo.gif"
  cadViewerBrandLogoPosition: "right_center", // bottom_center right_center
  cadViewerBrandLogoSize: "small", // small large
  // Compare tool for JSON input files with structured content
  showCompareTool: true,
  // todo Configuration for display logo in toolbar and also position and which one is hide when left pane is open or close

  enablePolygonControlPoints: true, // enable or disable polygon control points

  // HELPER SECTION - CUSTOM COMPONENTS

  // helpers components   - NOTE: add your helper components in the CADViewerHelperMthods folder structure
  enableHelperMethods: false,
  enableHelpersMethodsGroup_Highlight: false,
  enableHelpersMethodsGroup_Group: false,
  enableHelpersMethodsGroup_Manipulate: false,
  enableHelpersMethodsGroup_Insert: false,
  enableHelpersMethodsGroup_CustomCanvas: false,
  enableHelpersMethodsGroup_SpaceArea: false,
  enableHelpersMethodsGroup_RedlineArea: false,
  enableHelpersMethodsGroup_VizQueryDemo: false,
  helperMethodsActionSize: "small", // small, normal, large
  // add your own group of helper methods on the top toolbar

  // SECTION FOR PROPERTY MANAGEMENT

  topPaneScrollDownTitle: "Choose information plan/layer:", // set te title of the top pane scroll down menu
  displayTopPaneScrollDownButton: true, // display the top pane scroll down button, true to show the top pane scroll down menu
  topRowItem1: "Property Name:", // top row items
  topRowItem2: "Property Number:", // top row items
  topRowItem3: "Plan Name:", // top row items

  //
  customOnLoadEndContent: false, // custom OnLoadEnd content -processing of custom content in CADViewer.js
  //

  // CONTROL OF POPUP MODAL   - UNCOMMENT CONTROL OF POPUP MODAL ABOVE WHEN ACTIVATING BELOW
  
  popupCustomMenu1: "Custom<br>Action 1<br>", // custom menu 1   -  my_own_clickmenu1 in CADViewer.js
  popupCustomFontAwesomeIcon1: "fa fa-info-circle", // custom menu 1 - icon 1
  popupCustomMenu2: "Custom <br>Action 2<br>", // custom menu 2 - my_own_clickmenu2 in CADViewer.js
  popupCustomFontAwesomeIcon2: "fa fa-undo", // custom menu 2  - icon 2

  /*
  // popup menu settings for tenant info and future tenant
  popupCustomMenu1: "Tenant Info", // custom menu 1   -  my_own_clickmenu1 in CADViewer.js
  popupCustomFontAwesomeIcon1: "fa fa-folder-open", // custom menu 1 - icon 1
  popupCustomMenu2: "Future Tenant", // custom menu 2 - my_own_clickmenu2 in CADViewer.js
  popupCustomFontAwesomeIcon2: "fa fa-folder-open", // custom menu 2  - icon 2
  */

  // popup styling
  style_popup: true, // set the popup styling to true or false
  cvjs_styleQTip_color_flag: true, // set the color flag to true or false
  cvjs_styleQTip_color_v1: "#FFF", // set the color v1 to #FFF
  cvjs_styleQTip_color_v2: "#FFF", // set the color v1 to #FFF
  cvjs_styleQTip_color_v3: "#000", // set the color v1 to #FFF
  cvjs_styleQTip_color_v4: "#000", // set the color v1 to #FFF
  cvjs_styleQTip_color_v5: "#000", // set the color v1 to #FFF
  cvjs_styleQTip_fontsize_flag: true, // set the fontsize flag to true or false
  cvjs_styleQTip_fontsize_v1: "14pt", // set the fontsize v1 to 16pt
  cvjs_styleQTip_fontsize_v2: "12pt", // set the fontsize v1 to 16pt
  cvjs_styleQTip_fontsize_v3: "12pt", // set the fontsize v1 to 16pt
  cvjs_styleQTip_fontsize_v4: "5px", // set the fontsize v1 to 16pt
  cvjs_styleQTip_fontsize_v5: "11pt", // set the fontsize v1 to 16pt
  cvjs_styleQTip_fontsize_v6: "Arial, Helvetica, sans-serif", // set the fontsize v1 to 16pt
  cvjs_styleQTip_processbody_flag: false,
  cvjs_styleQTip_width: "220px", // set the width of the popup

  //   */
  //                  <command>cvjs_customCommand_20</command>   Select Property
  /* UNCOMMENT topMenuXML_config_file ABOVE WHEN ACTIVATING BELOW
  topMenuXML_config_file: `
    <cvjs>
    <iconmenu>
        <totalpages>1</totalpages>
        <startpage>1</startpage>
        <pages>
            <page>
                <command>cvjs_Print</command>
                <command>cvjs_LayerList</command>
                <command>cvjs_toggleBlackWhite</command>
                <command>cvjs_setBackgroundColor</command>
                <command>cvjs_interactiveSearchText</command>
                <command>cvjs_Measurement</command>
                <command>cvjs_calibrateMeasurement</command>
                <command>cvjs_displayMagnifyingGlass</command>
                <command>cvjs_activateLineThicknessModal</command>
                <command>cvjs_setRedlineColor</command>
                <command>cvjs_setRedlineThickness</command>
                <command>cvjs_drawStickyNote</command>
                <command>cvjs_drawRedlineText</command>
                <command>cvjs_drawRedline_Freehand</command>
                <command>cvjs_drawRedlineEllipseCloud</command>
                <command>cvjs_drawRedlineFilledPolygon</command>
                <command>cvjs_drawRedlinePolyline</command>
                <command>cvjs_drawRedlineFilledRectangle</command>
                <command>cvjs_drawRedlineRectangle</command>
                <command>cvjs_drawRedlineArrow</command>
                <command>cvjs_deleteSingleRedline</command>
                <command>cvjs_deleteLastRedline</command>
                <command>cvjs_clearCurrentRedline</command>
                <command>cvjs_Help</command>
            </page>
            </pages>
            <icons_per_row>0</icons_per_row>
            <icon_page_left_x>0</icon_page_left_x>
            <icon_page_left_y>0</icon_page_left_y>
            <customcommand>
                <tooltip>Command tooltip 1</tooltip>
                <tooltip>Command tooltip 2</tooltip>
                <tooltip>Command tooltip 3</tooltip>
                <tooltip>Command tooltip 4</tooltip>
                <tooltip>Command tooltip 5</tooltip>
                <tooltip>Command tooltip 6</tooltip>
                <tooltip>Command tooltip 7</tooltip>
                <tooltip>Command tooltip 8</tooltip>
                <tooltip>Command tooltip 9</tooltip>
                <tooltip>Command tooltip 10</tooltip>
                <tooltip>Command tooltip 11</tooltip>
                <tooltip>Command tooltip 12</tooltip>
                <tooltip>Command tooltip 13</tooltip>
                <tooltip>Command tooltip 14</tooltip>
                <tooltip>Command tooltip 15</tooltip>
                <tooltip>Command tooltip 16</tooltip>
                <tooltip>Command tooltip 17</tooltip>
                <tooltip>Command tooltip 18</tooltip>
                <tooltip>Command tooltip 19</tooltip>
                <tooltip>Select Property</tooltip>
            </customcommand>	
        </iconmenu>
        <zoommenu>
            <location_left_x>2</location_left_x>
            <location_left_y>40</location_left_y>
        </zoommenu>
        </cvjs>
        `,

  //    */

  //*
  //  COLOR OBJECTS FOR HIGHLIGHTS   - make fully transparent

  // Base attributes of Space Object
  /*
  BaseAttributes: {
    fill: "#ffffff", //'#d8e1e3', // '#ffd7f4', //'#D3D3D3',   // #FFF   #ffd7f4
    "fill-opacity": "0.0",
    stroke: "#CCC", //  #CCC
    "stroke-width": 0.0,
    "stroke-opacity": "0.0",
    "stroke-linejoin": "round",
  },

  // Mouse over highlight attributes of Space Object

  HighlightAttributes: {
    fill: "ffffff", //"#ffd7f4", //"#a4d7f4",  // '#ffd7f4'
    "fill-opacity": "0.0",
    stroke: "#ffd7f4", // "#a4d7f4",
    "stroke-width": 0.0,
    "stroke-opacity": "0.0",
  },

  // Mouse click highlight attributes of Space Object

  SelectAttributes: {
    fill: "#ffffff", //"#ed39a5", //"#5BBEF6",   //#ed39a5
    "fill-opacity": "0.0",
    stroke: "#ed39a5", //"#5BBEF6",  // #ed39a5
    "stroke-width": 1,
    "stroke-opacity": "0.8",
  },
*/
  //*/
  settingsGoHomepageButtonText: "Go Home",

  // enable or disable space objects extraction for left drawer menu (when json it's not available)
  enableSpaceObjectsExtraction: false,
  showTourInformationDialog: true,
  enableHelpButton1: true,
  helpbutton1: "Tech Docs",
  helpbutton1link: "https://cadviewer.com/cadviewertechdocs/",
  enableHelpButton2: true,
  helpbutton2: "User Manual",
  helpbutton2link: "https://cadviewer.com/cadviewerusermanual/",
  customHtmlHeaderContent: `
    <meta name="viewport" content="width=device-width, initial-scale=1">`,
  enableGeoLocation: true,
  geolocationAPIKey: "",
  recaptchaSiteKey: "",

  enableBasicAuth: false,
  basicAuthUsername: "admin",
  basicAuthPassword: "admin",

  // Disabled all features if not logged in
  disableAllFeaturesIfNotLoggedIn: false,

  // Default property to Load
  defautlPropertyToLoad: {
    propertyNumber: undefined, // "4279", //"2339", // set to undefined to disable default property
    planName: undefined, //"LP1", //"LP0", // set to undefined to disable default plan
  },

  // Demo Navigation Configuration
  enableDemoNavigation: false, // Set to true to display the demo navigation buttons

  showLogoOnSideBarLeftPanel: true, // Set to true to display the logo on the side bar left panel
  cadViewerBrandLogoOpacity: 100, // 0 (invisible) to 100 (visible)

  // Server Sub Folder to open by default
  serverSubFolder: undefined,
  showOnlySubFolder: false,
  propertySVGFilesLocation: "/content/drawings/",
};
export default config;
