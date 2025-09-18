import { ReactComponent as BackgroundIcon } from "./icons/background.svg";
import { ReactComponent as FolderIcon } from "./icons/folder.svg";
import { ReactComponent as LayersDisableIcon } from "./icons/layers-disable.svg";
import { ReactComponent as LayersEnableIcon } from "./icons/layers-enable.svg";
import { ReactComponent as LayersListIcon } from "./icons/layers-list.svg";
import { ReactComponent as LayersSwapIcon } from "./icons/layers-swap.svg";
import { ReactComponent as MeasureIcon } from "./icons/measure.svg";
import { ReactComponent as MonochromeIcon } from "./icons/monochrome.svg";
import { ReactComponent as PrintIcon } from "./icons/print.svg";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
// New icons for pagination
import { ReactComponent as AboutIcon } from "./icons/about.svg";
import { ReactComponent as CalibrateIcon } from "./icons/calibrate.svg";
import { ReactComponent as ClearIcon } from "./icons/clear.svg";
import { ReactComponent as CompareIcon } from "./icons/compare.svg";
import { ReactComponent as CountIcon } from "./icons/count.svg";
import { ReactComponent as CustomCommandIcon } from "./icons/custom-command.svg";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";
import { ReactComponent as ExitIcon } from "./icons/exit.svg";
import { ReactComponent as ImageLinkIcon } from "./icons/image-link.svg";
import { ReactComponent as LineThicknessIcon } from "./icons/line-thickness.svg";
import { ReactComponent as MagnifyIcon } from "./icons/magnify.svg";
import { ReactComponent as MergeIcon } from "./icons/merge.svg";
import { ReactComponent as PdfIcon } from "./icons/pdf.svg";
import { ReactComponent as RedlineIcon } from "./icons/redline.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { ReactComponent as StickyNoteIcon } from "./icons/sticky-note.svg";
import { ReactComponent as SvgSaveIcon } from "./icons/svg-save.svg";

const iconsMap = {
  cvjs_LayerList: LayersListIcon,
  cvjs_Print: PrintIcon,
  cvjs_toggleBlackWhite: MonochromeIcon,
  cvjs_setBackgroundColor: BackgroundIcon,
  cvjs_openFileLoadToServer: FolderIcon,
  cvjs_interactiveSearchText: SearchIcon,
  cvjs_interactiveLayerOff: LayersDisableIcon,
  cvjs_swapLayersInDrawing: LayersSwapIcon,
  cvjs_allLayersInDrawingOn: LayersEnableIcon,
  cvjs_Measurement: MeasureIcon,
  cvjs_calibrateMeasurement: CalibrateIcon,
  cvjs_displayMagnifyingGlass: MagnifyIcon,
  cvjs_activateLineThicknessModal: LineThicknessIcon,
  cvjs_About: AboutIcon,
  cvjs_Settings: SettingsIcon,
  cvjs_publishPDF: PdfIcon,
  cvjs_saveAsSVGOnServer: SvgSaveIcon,
  cvjs_quickCount: CountIcon,
  cvjs_mergeDXFDWG: MergeIcon,
  cvjs_compareDrawings_LoadSecondDrawing: CompareIcon,
  cvjs_compareDrawings_ToggleDrawings: CompareIcon,
  cvjs_compareDrawings_ToggleDrawingOverlay: CompareIcon,
  cvjs_drawRedline_Freehand: RedlineIcon,
  cvjs_drawRedlineText: RedlineIcon,
  cvjs_drawRedlineRectangle: RedlineIcon,
  cvjs_drawRedlineArrow: RedlineIcon,
  cvjs_drawStickyNote: StickyNoteIcon,
  cvjs_insertImageLink: ImageLinkIcon,
  cvjs_loadAllImageLinks: ImageLinkIcon,
  cvjs_saveAllImageLinks: ImageLinkIcon,
  cvjs_clearAllImageLinks: ClearIcon,
  cvjs_showMeCounts: CountIcon,
  cvjs_clearQuickCounts: ClearIcon,
  cvjs_exitCompareDrawings: ExitIcon,
  cvjs_deleteSingleRedline: DeleteIcon,
  cvjs_deleteLastRedline: DeleteIcon,
  cvjs_clearCurrentRedline: ClearIcon,
  cvjs_loadStickyNotesRedlinesUser: StickyNoteIcon,
  cvjs_saveStickyNotesRedlinesUser: StickyNoteIcon,
  cvjs_setRedlineColor: RedlineIcon,
  cvjs_setRedlineThickness: LineThicknessIcon,
  cvjs_drawRedlineEllipseCloud: RedlineIcon,
  cvjs_drawRedlineFilledPolygon: RedlineIcon,
  cvjs_drawRedlinePolyline: RedlineIcon,
  cvjs_drawRedlineFilledRectangle: RedlineIcon,
  cvjs_customCommand_01: CustomCommandIcon,
  cvjs_customCommand_02: CustomCommandIcon,
  cvjs_customCommand_03: CustomCommandIcon,
  cvjs_customCommand_04: CustomCommandIcon,
  cvjs_customCommand_05: CustomCommandIcon,
  cvjs_customCommand_10: CustomCommandIcon,
  cvjs_customCommand_14: CustomCommandIcon,
};

export const getIcon = (command: string) => {
  return iconsMap[command as keyof typeof iconsMap] || FolderIcon;
};
