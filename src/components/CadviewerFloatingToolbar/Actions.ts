import * as cadviewer from "cadviewer";

export const triggerAction = (f_div: string, command: string) => {
  switch (command) {
    case "cvjs_LayerList":
      cadviewer.cvjs_LayerList(f_div);
      break;
    case "cvjs_Print":
      cadviewer.cvjs_Print(f_div);
      break;
    case "cvjs_toggleBlackWhite":
      cadviewer.cvjs_toggleBlackWhite(f_div);
      break;
    case "cvjs_setBackgroundColor":
      cadviewer.cvjs_setBackgroundColor(f_div);
      break;
    case "cvjs_openFileLoadToServer":
      cadviewer.cvjs_openFileLoadToServer(f_div);
      break;
    case "cvjs_interactiveSearchText":
      cadviewer.cvjs_interactiveSearchText(f_div);
      break;
    case "cvjs_interactiveLayerOff":
      cadviewer.cvjs_interactiveLayerOff(f_div);
      break;
    case "cvjs_swapLayersInDrawing":
      cadviewer.cvjs_swapLayersInDrawing(f_div);
      break;
    case "cvjs_allLayersInDrawingOn":
      cadviewer.cvjs_allLayersInDrawingOn(f_div);
      break;
    case "cvjs_Measurement":
      cadviewer.cvjs_Measurement(f_div);
      break;
    case "cvjs_calibrateMeasurement":
      cadviewer.cvjs_calibrateMeasurement(f_div);
      break;
    case "cvjs_displayMagnifyingGlass":
      cadviewer.cvjs_displayMagnifyingGlass(f_div);
      break;
    case "cvjs_activateLineThicknessModal":
      cadviewer.cvjs_activateLineThicknessModal(f_div);
      break;
    case "cvjs_customCommand_01":
      // cadviewer.cvjs_customCommand_01(f_div);
      break;
    // case "cvjs_About":
    //   cadviewer.cvjs_About(f_div);
    // break;
    case "cvjs_Settings":
      cadviewer.cvjs_Settings(f_div);
      break;

    default:
      break;
  }
};
