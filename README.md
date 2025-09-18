# CADViewer Visual Query - React

ReactJS CADViewer Visual Query Front-End.

The repository contains a full setup of CADViewer Visual Query encapsulation with React.

## This package contains

1: [CADViewer script library](https://www.npmjs.com/package/cadviewer) - [npm](https://www.npmjs.com/package/cadviewer) installed into ClientApp as part of the React JS front-end.

2: A **_LOT_** of cool encapsulations, file browser, dynamic panes, examples usage of the CADViewer Space Object API and the back-end AutoXchange AX2024 hotspot creation capabilities.

3: Settings of user controlled functionality of panes are done through the file:

```
config.ts
```

, see details below under **_Configuration file - config.ts_**.

## Installing CADViewer Server

Install the repository [CADViewer Conversion Server](https://github.com/CADViewer/cadviewer-conversion-server). This repository handle server side conversion and loading of floorplans, redlines and any content related to the CADViewer instance in Visual Query that is not installed under the **_assets_** tree in Visual Query. The CADViewer conversion server typically runs on port 3000.

If you have any issues during installation, remove any .lock files, and node_modules folder and rebuild the project. Depending on your setup, use either npm or yarn to build the project.

## Configuration file - config.ts

This is the configuration file that users can modify to change menu appearances, styling of menus and settings of file-load related content. Each configuration item is described either above, below or to the right of the item as comments, specifically for the CADViewer settings, refere to the [CADViewer Front-End API](https://cadviewer.com/cadviewerproapi/global.html).

```
const config = {
"AppName": "Generic Visual Query Sample Inplementation",   //  "CADViewer: Visual Query ",     // Tenants Overview Plans  &nbsp;&nbsp;- &nbsp;&nbsp;Current Floor-plan:
"ContactEmails": ["developer@tailormade.com", "internationalsales@tailormade.com"],
"ZoomFactor": 20.0,                                     // zoom factor for cvjs_zoomHere_ObjectId() in left panel click
"ServerBackEndUrl": "http://localhost:3000/",          // This is the URL of the CADViewer back-end server
"ServerLocation": "",                                  // leave blank  in most cases
"ServerUrl": "http://localhost:3001/",                 // this is the URL of the front end server
"setPostFixServerToken" : true,                       // set if the server shall be contatenated with a Token, kept on the Server, use a postfixed SAS token, when loading JSON content
"debugMode": false,    // enables CADViewer debug traces in the browser

//  "initFileName":"/content/drawings/dwg/AH001_lo.dwg",  // the initialization drawing when loading Visual Query, based on a server path
"initFileName":"/content/drawings/svg/init1.svg",  // the initialization drawing when loading Visual Query, based on a server path

// cadviewer license key
"cadviewerLicenseKey" : "00110010 00110010 00110000 00110001 00110010 00110000 00110110 00110001 00110100 00111000 00110001 00110100 00110101 00110001 00110101 00110111 00110001 00110101 00111001 00110001 00110100 00111000 00110001 00110101 00110010 00110001 00110100 00110101 00110001 00110100 00110001 00110001 00110100 00110000 00110001 00111001 00111000 00110010 00110000 00110110 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110000 00110011 00110010 00110001 00110001 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110001 00110001 00110010 00110000 00110110 00110010 00110000 00110000 00110001 00111001 00111000 00110001 00110100 00110001 00110001 00110100 00110100 00110001 00110101 00111001 00110001 00110101 00110111 00110001 00110101 00110101",

// VISUAL QUERY PANEL CONTROLS
"ShowInformativeBottomPanel": true,                    // initial show the bottom panel
"ShowInformativeLeftPanel": false,                     // initia show the left side panel

//    Global Application Files
//   Global location for property / plans navigation:
"globalApplicationFilesLocation" :"https://bpybipowerbi.z19.web.core.windows.net/cadviewer/json/application/",
"globalApplicationPlans" :"plans.json",
"globalApplicationViews" :"views.json",
//    Property Specific Files
"propertySVGFilesLocation" :"https://bpybipowerbi.z19.web.core.windows.net/cadviewer/svg/",  // + property.svg
"propertyJSONFilesLocation" :"https://bpybipowerbi.z19.web.core.windows.net/cadviewer/json/property/", // + property.json

// SAMPLE TEST FILES!!!
//https://bpybipowerbi.z19.web.core.windows.net/cadviewer/svg/3442-LP2.svg
//https://bpybipowerbi.z19.web.core.windows.net/cadviewer/json/property/3442-LP2.json

// CADVIEWER MENU CONTROLS
"DisplayCoordinatesMenu": false,                       // display the CADViewer coordinates menu
"setSpaceObjectsCustomMenu" : false,                   // display the SpaceObject Navigation menu
"displayTopNavigationBar" : false,                      // display the layout /model space navigation menu

// TOP NAVIGATION BAR CONTROLS
"displayTopMenuIconBar" : true,                        // display the top menu icon bar
"setTopMenuXMLDirect" : true,                           // determines if XML menu is loaded from file or passed over from sting expression
// controls for loading top icon menu from server
"topMenuXML" : "cadviewer_minimum_viewonly_svg_02.xml",        // menu configuration file used  - default is: cadviewer_full_commands_01.xml   cadviewer_viewonly_nofileload_01.xml
"topMenuXMLpath" :  "/cadviewer/app/cv/cv-pro/menu_config/",  //  the path for XML config files no nodejs conversion server           "/cadviewer/app/cv/cv-pro/menu_config/"
// top xml icon menu config file for direct insertion

"topMenuXML_config_file" :  `
<cvjs>
<iconmenu>
    <totalpages>1</totalpages>
    <startpage>1</startpage>
    <pages>
        <page>
            <command>cvjs_customCommand_20</command>
            <command>cvjs_Print</command>
            <command>cvjs_publishPDF</command>
            <command>cvjs_saveAsSVGOnServer</command>
            <command>cvjs_LayerList</command>
            <command>cvjs_setBackgroundColor</command>
            <command>cvjs_interactiveSearchText</command>
            <command>cvjs_calibrateMeasurement</command>
            <command>cvjs_Measurement</command>
            <command>cvjs_activateLineThicknessModal</command>
            <command>cvjs_displayMagnifyingGlass</command>
            <command>cvjs_About</command>
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

//
"customOnLoadEndContent" : true,                        // custom OnLoadEnd content for population
//
"setUnitForCalibrate" : "feet",                         // set base unit for calibrate modal
// DRAWING BASE LINE WEIGHT
"adjustMinimumLineThickness" : 200,                    // Line minimum thickness, in percentage of the minimum line weight in the loaded drawing

// CONTROL OF POPUP MODAL
"setNoModalMode" : false,                                // set no highlight modal mode to true or false
//    "popupCustomMenu1" : "Custom<br>Menu 1<br>",               // custom menu 1   -  my_own_clickmenu1 in CADViewer.js
//    "popupCustomFontAwesomeIcon1" : "fa fa-info-circle",               // custom menu 1 - icon 1
//    "popupCustomMenu2" : "Custom<br>Menu 2<br>",               // custom menu 2 - my_own_clickmenu2 in CADViewer.js
//    "popupCustomFontAwesomeIcon2" : "fa fa-undo",               // custom menu 2  - icon 2
"popupCustomMenu1" : "Tenant<br>Info<br>",               // custom menu 1   -  my_own_clickmenu1 in CADViewer.js
"popupCustomFontAwesomeIcon1" : "fa fa-info-circle",               // custom menu 1 - icon 1
"popupCustomMenu2" : "Future Tenant<br>Info<br>",               // custom menu 2 - my_own_clickmenu2 in CADViewer.js
"popupCustomFontAwesomeIcon2" : "fa fa-undo",               // custom menu 2  - icon 2

//  COLOR OBJECTS FOR HIGHLIGHTS
// Base attributes of Space Object
"BaseAttributes" : {
    "fill": "#d8e1e3", //'#d8e1e3', // '#ffd7f4', //'#D3D3D3',   // #FFF   #ffd7f4
    "fill-opacity": "0.1",
    "stroke": "#CCC", //  #CCC
    "stroke-width": 0.5,
    "stroke-opacity": "0.7",
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

"setCADViewerSkin": "black", //CADViewer Skin lightgray, black, deepblue
"bottomPaneSliderMode": "withCADViewer", // withCADViewer, aboveCADViewer,
"bottomPaneDefaultHeight": 15, // percentage of screen height
"rightPanelDefaultWidth": 40, // percentage of screen height
"leftPaneDefaultWidth": 17, // percentage of screen height

// enable or disable top bar features
"enableHelperMethods": false,
// enable or disable features in ... right side icon
"enableRightFileModalPanel" : false,
"enableRightFileModalPanelText" : "Folder Structure",
"enableRightEmployeePanel" : false,
"enableRightEmployeePanelText" : "Employees",
"enableRightArchivePanel" : false,
"enableRightArchivePanelText" : "Archive",
"enableRightJSONModalPanel" : true,      // enabling JSON load right side pane
"enableRightJSONModalPanelText" : "Select Property",    // test for JSON load right side pane
"enableRightJSONModalPanelText2": "Select a property level to display it's floor-plan and associated lease content.", // the second text line appearing on the Property Pane

"layerOptionWidth": 460, // in pixels
"rightActionPanelWidth": 600, //Todo in pixels
"planFile": "plan.json",
}
export default config
```

# Getting Started with Visual Query React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
