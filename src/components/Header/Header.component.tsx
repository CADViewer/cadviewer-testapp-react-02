import cadviewer from "cadviewer";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { CadviewerContext } from "../../context/Cadviewer.Context";
import { getAllDemos } from "../../demos";
import useConfig from "../../demos/hooks/useConfig";
import { View } from "../../types";
import { CADViewerHelperMethods, RightAction, Tooltip } from "../index";
//import { Text } from "react-native";

interface HeaderProps {
  leftPanelOpen: boolean;
  setLeftPanelOpen: any;
}

const Header = ({ leftPanelOpen, setLeftPanelOpen }: HeaderProps) => {
  const location = useLocation();
  const { config } = useConfig();

  if (config.debugMode)
    console.log(
      "Header component - config:",
      config.displayTopPaneScrollDownButton
    );

  const { setLayerColorsOnLoad, layerColorsOnLoad, currentCanvasInstance } =
    useContext(CadviewerContext);

  if (config.debugMode) console.log({ layerColorsOnLoad });

  const cvjs_brookfield_layerchange = (layer: View) => {
    if (config.debugMode)
      console.log("cvjs_brookfield_layerchange: " + layer.initialLayerState);

    if (layer.view === "Choose information plan/layer") {
      return;
    }

    if (config.debugMode) {
      if (config.debugMode)
        console.log(
          "Header.component - AllLayersOFF:" + layer.initialLayerState
        );
    }

    setLayerColorsOnLoad(
      layer.layers.map((layer) => ({
        layer: layer.layer,
        color:
          layer.colorOverride === undefined || layer.colorOverride === "none"
            ? "originalColor"
            : layer.colorOverride,
      }))
    );

    /*
        // 10.43.1
        console.log("Header.component-tsx - cvjs_colorSingleLayer:  number of layers:"+layerColorsOnLoad.length);

        for (var i=0; i< layerColorsOnLoad.length; i++){
            var thislayer = layerColorsOnLoad[i];
//            cadviewer.cvjs_colorSingleLayer(currentCanvasInstance ?? "floorPlan", thislayer.color, thislayer.layer);
            cadviewer.cvjs_colorSingleLayer(currentCanvasInstance ?? "floorPlan", thislayer.color, thislayer.layer);

        }
*/

    if (layer.initialLayerState === "AllOff") {
      // optimization test
      //            cadviewer.cvjs_AllLayersOff(currentCanvasInstance ?? "floorPlan")

      try {
        if (config.debugMode) console.log("1");

        let layerTable = cadviewer.cvjs_getLayerTable(
          currentCanvasInstance ?? "floorPlan"
        );
        let newLayerTable = [];
        if (config.debugMode) console.log("2");
        for (let i = 0; i < layerTable.numberOfLayers; i++) {
          if (config.debugMode)
            if (config.debugMode)
              console.log(i + " " + layerTable.layers[i].layerName);
          newLayerTable[i] = {
            name: layerTable.layers[i].layerName,
            newStatus: "OFF",
          };
        }

        if (config.debugMode)
          console.log(
            "Header component - AllOff - cvjs_brookfield_layerchange, number of layers: " +
              layer.layers.length
          );

        if (layer.layers.length >= 1) {
          // get the list of all layers:

          for (let index = 0; index < layer.layers.length; index++) {
            const element = layer.layers[index];
            if (element.layerState === "On") {
              if (config.debugMode)
                console.log(
                  index +
                    " layer on:" +
                    element.layer +
                    " " +
                    element.layerState
                );
              for (let i = 0; i < newLayerTable.length; i++) {
                if (newLayerTable[i].name === element.layer)
                  newLayerTable[i].newStatus = "ON";
              }

              cadviewer.cvjs_LayerOn(element.layer);
            } else if (element.layerState === "Off") {
              cadviewer.cvjs_LayerOff(element.layer);
              if (config.debugMode)
                console.log(
                  index +
                    " layer off:" +
                    element.layer +
                    " " +
                    element.layerState
                );
            }

            try {
              // 10.43.8               // do  we only need this for on layers?
              var elementcolor =
                element.colorOverride === undefined ||
                element.colorOverride === "none"
                  ? "originalColor"
                  : element.colorOverride;
              if (config.debugMode)
                console.log(
                  "Header loop:" + elementcolor + " " + element.layer
                );
              cadviewer.cvjs_colorSingleLayer(
                currentCanvasInstance ?? "floorPlan",
                elementcolor,
                element.layer
              );
            } catch (err_color) {
              if (config.debugMode)
                console.log("Header component color error: " + err_color);
            }
          }

          // turn off all layers that are not in the list
          for (let i = 0; i < newLayerTable.length; i++) {
            //console.log("layerTable.layers[i].layerName:"+layerTable.layers[i].layerName+" status:"+layerTable.layers[i].status);
            if (newLayerTable[i].newStatus === "OFF")
              cadviewer.cvjs_LayerOff(newLayerTable[i].name);
          }
        }
      } catch (err) {
        if (config.debugMode)
          console.log("Header component AllOff error: " + err);
      }
    } else if (layer.initialLayerState === "AllOn") {
      cadviewer.cvjs_AllLayersOn(currentCanvasInstance ?? "floorPlan");

      if (config.debugMode)
        console.log(
          "AllOn - Header component cvjs_brookfield_layerchange, number of layers: " +
            layer.layers.length
        );

      if (layer.layers.length >= 1) {
        for (let index = 0; index < layer.layers.length; index++) {
          const element = layer.layers[index];
          if (element.layerState === "On") {
            //console.log("layer on:"+element.layer+ " "+element.layerState);

            cadviewer.cvjs_LayerOn(element.layer);
          } else if (element.layerState === "Off") {
            cadviewer.cvjs_LayerOff(element.layer);
            //console.log("layer off:"+element.layer+ " "+element.layerState);
          }
        }
      }
    }

    // CH  -we need all SpaceObject turned on
    cadviewer.cvjs_allSpaceObjectsOn(currentCanvasInstance ?? "floorPlan");

    try {
      // 10.40.1
      if (config.setZoomImageWallpaper) {
        if (config.debugMode) console.log("cvjs_activateZoomImageWallpaper 1");
        cadviewer.cvjs_activateZoomImageWallpaper();
      }
    } catch (err) {
      if (config.debugMode)
        console.log("Header component setZoomImageWallpaper error: " + err);
    }

    return;
  };

  const demosPathnames = getAllDemos().map((demo) => demo.route);

  const isHome = useMemo(
    () =>
      location.pathname === "" ||
      location.pathname === "/" ||
      demosPathnames.includes(location.pathname),
    [location.pathname, demosPathnames]
  );

  /*
  const isHome = useMemo(
    () => location.pathname === "" || location.pathname === "/",
    [location.pathname]
  );
*/

  return (
    <div className="bg-gray-100 min-h-20 px-4 md:px-6 lg:px-14 py-2">
      <div className="w-full flex flex-wrap flex-col lg:flex-row justify-between items-stretch gap-2">
        <div className="flex flex-row gap-2 items-center">
          {isHome && !config.hideLeftHamburgerMenu && (
            <Tooltip text={config.hambugerMenuTooltip}>
              <button
                id="hamburger-menu"
                className="-ml-4 md:-ml-6 lg:-ml-14 mr-2 md:mr-5 bg-sidebar-hamburger-background text-sidebar-hamburger-icon p-2 lg:p-3"
                onClick={() => setLeftPanelOpen((state: boolean) => !state)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </Tooltip>
          )}
          {config.topBarLogo && (
            <img
              src={config.topBarLogo}
              alt="CADViewer Logo"
              className="h-9 sm:h-11 mr-2"
            />
          )}
          {leftPanelOpen ? (
            <img
              src={"/CADViewer_Submark.svg"}
              alt="CADViewer Logo"
              className={`h-9 sm:h-10 ${
                !leftPanelOpen || !config.topBarLogo ? "block" : "hidden"
              }`}
            />
          ) : (
            <img
              src={"/CADViewer_Primary_logo.svg"}
              alt="CADViewer Logo"
              className={`h-9 sm:h-10 ${
                !leftPanelOpen || !config.topBarLogo ? "block" : "hidden"
              }`}
            />
          )}
        </div>
        {/* Group Logo and Main Info */}
        <div className="flex flex-wrap items-center lg:ml-4 min-w-0">
          <div className="flex flex-col justify-start items-start lg:ml-4 flex-1 min-w-0">
            <div>
              <h4>
                <b>{config.AppName}</b>
                {config.ContactEmailsFlag && (
                  <span className="ml-0 sm:ml-4 block">
                    Contact us at:{" "}
                    {config.ContactEmails.map((email: any, index: number) => (
                      <>
                        <a
                          href={"mailto:" + email}
                          key={email}
                          className="text-blue-500 text-decoration-underline"
                        >
                          {email}
                        </a>
                        {index === config.ContactEmails.length - 1
                          ? ""
                          : " or "}
                      </>
                    ))}{" "}
                  </span>
                )}
              </h4>
            </div>
          </div>
        </div>
        <RightAction />
      </div>

      {isHome && config.enableHelperMethods && <CADViewerHelperMethods />}
    </div>
  );
};

export default Header;
