import JQ from "jquery";
import { useEffect } from "react";
import "./CADViewerHelperMethods.component.css";

// We are only accessing the functional interface of CADViewer, not the canvas, so this import is sufficient

import config from "../../utils/config";
import {
  CADViewerCustomCanvas,
  CADViewerCustomCanvasVizQuery,
  Group,
  Highlight,
  InsertObjects,
  ManipulateObjects,
  RedlineAreaMethods,
  SpaceAreaMethods,
} from "./components";

// export to second helper component

export function setSpaceInputFields(
  loadSpaceImage_Location,
  loadSpaceImage_ID,
  loadSpaceImage_Type,
  loadSpaceImage_Layer
) {
  JQ("#image_sensor_location").val(loadSpaceImage_Location);
  JQ("#image_ID").val(loadSpaceImage_ID);
  JQ("#image_Type").val(loadSpaceImage_Type);
  //var loadSpaceImage_Layer = loadSpaceImage_Layer;
}

export const CADViewerHelperMethods = () => {
  useEffect(() => {
    /*    remove slider, as implemented internally in CADViewer v6.9.11
		var slider = document.getElementById("myRange");
		var output = document.getElementById("iconsize");
		output.innerHTML = slider.value+"%";
		
		slider.oninput = function() {
		output.innerHTML = this.value+"%";
		// SETTTING THE CADVIEWER GLOBAL CONTROLS:
		
		cadviewer.cvjs_setGlobalSpaceImageObjectScaleFactor(this.value/100.0);
		
		}
		*/
  }, []);

  return (
    <div className="CADViewerHelperMethods">
      {config.enableHelpersMethods_Highlight && <Highlight />}
      {config.enableHelpersMethodsGroup_Group && <Group />}

      {config.enableHelpersMethodsGroup_Manipulate && <ManipulateObjects />}

      {config.enableHelpersMethodsGroup_Insert && <InsertObjects />}

      {config.enableHelpersMethodsGroup_CustomCanvas && (
        <CADViewerCustomCanvas />
      )}

      {config.enableHelpersMethodsGroup_SpaceArea && <SpaceAreaMethods />}

      {config.enableHelpersMethodsGroup_RedlineArea && <RedlineAreaMethods />}

      {config.enableHelpersMethodsGroup_VizQueryDemo && (
        <CADViewerCustomCanvasVizQuery />
      )}
    </div>
  );
};

export default CADViewerHelperMethods;
