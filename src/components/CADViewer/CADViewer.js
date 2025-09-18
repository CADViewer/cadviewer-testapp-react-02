import jQuery from "jquery";
import { debounce } from "lodash";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import "./CADViewer.component.css";

import * as cadviewer from "cadviewer";
import { CadviewerContext } from "../../context/Cadviewer.Context";

import Tooltip from "../Tooltip";

import EventSystem from "../../events/EventSystem";

import * as RedlineAreaMethods from "../CADViewerHelperMethods/components/RedlineAreaMethods.component.tsx";
import * as SpaceAreaMethods from "../CADViewerHelperMethods/components/SpaceAreaMethods.component.tsx";

import { useLocation } from "react-router-dom";

import { useTour } from "@reactour/tour";
import useConfig from "../../demos/hooks/useConfig";

export var textLayer1;

export function clearTextLayer() {
  textLayer1 = cadviewer.cvjs_clearLayer(textLayer1);
}

export function retrieve_redlines_stickynotes() {
  cadviewer.cvjs_setAllRedlineStickyNoteObjects(myredlinestickynoteObjects);
}

export function setOnloadEndFlag(flag) {
  onloadEndFlag2 = flag;
}

var myHYPHENCHANGEFLAG = false; //  this is the flag to set changes by users
var myHYPHENBLOCKFLAG = false; //  this is the flag to block for changes when loading user content after loading the drawing

var selected_handles = [];
var handle_selector = false;
var current_selected_handle = "";

var onloadEndFlag2 = false; // set this to true to overlay with a json object

var FileName = "";

// We should to define all the CADViewer methods in which we are getting information return from CADViewer
// THEY CAN BE PLACEHOLDERS ONLY

//export function cvjs_OnLoadEnd(){

function cvjs_OnLoadEndRedlines() {
  // generic callback method, called when the redline is loaded
  // here you fill in your stuff, hide specific users and lock specific users
  // this method MUST be retained as a dummy method! - if not implemeted -

  // I am hiding users added to the hide user list
  cadviewer.cvjs_hideAllRedlines_HiddenUsersList();

  // I am freezing users added to the lock user list
  cadviewer.cvjs_lockAllRedlines_LockedUsersList();
}

var myobject;
var myredlineObjects = {};
var mystickynoteObjects = {};
var myredlinestickynoteObjects = {};

function cvjs_saveStickyNotesRedlinesUser() {
  // there are two modes, user handling of redlines
  // alternatively use the build in redline file manager

  cadviewer.cvjs_openRedlineSaveModal("floorPlan");

  // custom method startMethodRed to set the name and location of redline to save
  // see implementation below
  //startMethodRed();
  // API call to save stickynotes and redlines
  //cvjs_saveStickyNotesRedlines("floorPlan");
}

// This method is linked to the load redline icon in the imagemap
function cvjs_loadStickyNotesRedlinesUser() {
  cadviewer.cvjs_openRedlineLoadModal("floorPlan");

  // first the drawing needs to be cleared of stickynotes and redlines
  //cvjs_deleteAllStickyNotes();
  //cvjs_deleteAllRedlines();

  // custom method startMethodRed to set the name and location of redline to load
  // see implementation below
  // startMethodRed();

  // API call to load stickynotes and redlines
  //cvjs_loadStickyNotesRedlines("floorPlan");
}

function cvjs_popupTitleClick(roomid) {
  window.alert("we have clicked " + roomid);
}

// HANDLING OF MOUSE OPERATION

var mouseover = false;
var mouseclick = false;
var customclickcontrol = false;

// ENABLE ALL API EVENT HANDLES FOR AUTOCAD Handles
function cvjs_mousedown(id, handle, entity) {
  console.log("cvjs_mousedown");

  if (customclickcontrol) {
    if (!mouseclick) mouseclick = true;

    // TEST - when click move to center with 300% around block handle
    //cadviewer.cvjs_zoomHere_Handle(handle, 3.0, "floorPlan");
  }

  // we cannot highlight because we have moved the mouse or finger out
  // remove cadviewer.cvjs_mouseout_handleObjectStyles(id, handle); and it will highlight

  //cadviewer.cvjs_HighlightHandleObjectStyles("#F00", 2.0, 1.0, true, id, handle);
}

function cvjs_mouseup(id, handle, entity) {
  console.log("cvjs_mousedown");

  // highligt and zoom over the object
  //cadviewer.cvjs_changeSpaceFixedLocation(id, null);
  //cadviewer.cvjs_zoomHere_ObjectId(id, 50);

  if (customclickcontrol) {
    if (!mouseclick) mouseclick = true;
  }
}

var insertsensor = false;

// END OF MOUSE OPERATION

function cvjs_graphicalObjectCreated(graphicalObject) {
  // do something with the graphics object created!
  //		window.alert(graphicalObject);
}

function cvjs_CalibrateMeasurementCallback() {}
function cvjs_Url_callback() {}
function cvjs_loadSpaceImage_UserConfiguration() {}
function cvjs_NoObjectSelected() {}
function cvjs_SVGfileObjectClicked() {}
function cvjs_SVGfileObjectMouseEnter() {}
function cvjs_SVGfileObjectMouseLeave() {}
function cvjs_SVGfileObjectMouseMove() {}
function cvjs_ParseDisplayDataMaps() {}

function cvjs_QuickCountCallback(count) {
  if (SpaceAreaMethods.callback_is_active()) {
    SpaceAreaMethods.cvjs_QuickCountCallback(count);
  } else {
    window.alert("QuickCountCallback: " + count);
  }
}

// 10.74.5
function cvjs_measurementCallback(
  cvjs_currentMeasurementLength,
  cvjs_currentMeasurementArea,
  cvjs_units
) {
  console.log(
    "cvjs_measurementCallback: length:" +
      cvjs_currentMeasurementLength +
      " area:" +
      cvjs_currentMeasurementArea +
      " units:" +
      cvjs_units
  );
}

function cvjs_OnHyperlinkClick() {}
function cvjs_setUpStickyNotesRedlines() {}
function custom_host_parser_PopUpMenu() {}
function cvjs_customHostParser() {}
function drawPathsGeneric() {}
function cvjs_callbackForModalDisplay() {}
function cvjs_populateMyCustomPopUpBody() {}
function cvjs_customModalPopUpBody() {}
function cvjs_NoObjectSelectedStickyNotes() {}
function cvjs_NoObjectSelectedHyperlinks() {}
function cvjs_ObjectSelectedHyperlink() {}
function cvjs_ObjectSelectedStickyNotes() {}
function custom_callback1() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback1 " + id);
}
function custom_callback2() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback2 " + id);
}
function custom_callback3() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback3 " + id);
}
function custom_callback4() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback4 " + id);
}
function custom_callback5() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback5 " + id);
}
function custom_callback6() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback6 " + id);
}
function custom_callback7() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback7 " + id);
}
function custom_callback8() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback8 " + id);
}
function custom_callback9() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback9 " + id);
}
function custom_callback10() {
  var id = cadviewer.cvjs_idObjectClicked();
  window.alert("Hello callback10 " + id);
}

function cvjs_customCommand_01() {
  window.alert("Hello click! cvjs_customCommand_01");
}
function cvjs_customCommand_02() {
  window.alert("Hello click! cvjs_customCommand_02");
}
function cvjs_customCommand_03() {
  window.alert("Hello click! cvjs_customCommand_03");
}
function cvjs_customCommand_04() {
  window.alert("Hello click! cvjs_customCommand_04");
}
function cvjs_customCommand_05() {
  window.alert("Hello click! cvjs_customCommand_05");
}
function cvjs_customCommand_06() {
  window.alert("Hello click! cvjs_customCommand_06");
}
function cvjs_customCommand_07() {
  window.alert("Hello click! cvjs_customCommand_07");
}
function cvjs_customCommand_08() {
  window.alert("Hello click! cvjs_customCommand_08");
}
function cvjs_customCommand_09() {
  window.alert("Hello click! cvjs_customCommand_09");
}
function cvjs_customCommand_10() {
  window.alert(
    "Hello click! REDLINE and STICKYNOTE SAVE is disabled in the CADViewer Public Demo version!"
  );
}
function cvjs_customCommand_11() {
  window.alert(
    "Hello click! IMAGE OBJECT SAVE is disabled in the CADViewer Public Demo version!"
  );
}
function cvjs_customCommand_12() {
  window.alert(
    "Hello click! SPACE OBJECTS and SPACE ICONS SAVE is disabled in the CADViewer Public Demo version!"
  );
}
function cvjs_customCommand_13() {
  window.alert("Hello click! cvjs_customCommand_13");
}
function cvjs_customCommand_14() {
  window.alert("Hello click! cvjs_customCommand_14");
}
function cvjs_customCommand_15() {
  window.alert("Hello click! cvjs_customCommand_15");
}
function cvjs_customCommand_16() {
  window.alert("Hello click! cvjs_customCommand_16");
}
function cvjs_customCommand_17() {
  window.alert("Hello click! cvjs_customCommand_17");
}
function cvjs_customCommand_18() {
  window.alert("Hello click! cvjs_customCommand_18");
}

/*

function cvjs_customCommand_19() {
	window.alert("Hello click! cvjs_customCommand_19");
}

*/

function cvjs_processCompleted(processName) {
  // This is a callback method that is called when a process is completed
  // It can be used to update the UI or perform other actions
  console.log("cvjs_processCompleted: " + processName + " ");
}

function cvjs_insertSpaceObjectCustomCodePlaceholder() {
  console.log(
    "callback for spaceobject insertion, do custom checks here if false the insertion is aborted, if true continued as usual"
  );
  return true;
}

// Dynamic Modal Call-back

const CADViewer = ({ canvasPlanId }) => {
  const [divRef, setDivRef] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { setIsOpen } = useTour();
  const { config } = useConfig();

  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();

  const bpretailSourceFile = useMemo(
    () => query.get("bpretailSourceFile"),
    [query]
  );

  const cvjs_click = useCallback(
    (id, handle, entity, path, xpos, ypos) => {
      if (config.enableHelpersMethodsGroup_SpaceArea) {
        if (SpaceAreaMethods.callback_is_active())
          SpaceAreaMethods.cvjs_click(id, handle, entity, path, xpos, ypos);
      }

      if (config.enableHelpersMethodsGroup_RedlineArea) {
        if (RedlineAreaMethods.callback_is_active())
          RedlineAreaMethods.cvjs_click(id, handle, entity, path, xpos, ypos);
      }

      console.log(
        "CADViewer.js:  click " +
          id +
          "  " +
          handle +
          +" entity:" +
          entity +
          " xpos=" +
          xpos +
          " ypos=" +
          ypos
      );

      if (!insertsensor) return;

      // if there is no x,y we simply return
      if (xpos === undefined || ypos === undefined) return;

      if (customclickcontrol) {
        if (mouseclick) mouseclick = false;
      }

      // if we click on an object, then we add to the handle list
      if (handle_selector) {
        selected_handles.push({ id, handle });
        current_selected_handle = handle;
      }

      var baseobject =
        "http://localhost:3005/content/customInsertSpaceObjectMenu/images/sensor_c.svg";
      var id = "myID_" + Math.floor(Math.random() * 10000);
      var type = "sensor";
      var layer = "mylayer";
      cadviewer.cvjs_setImageSpaceObjectParameters(baseobject, id, type, layer);
      // cadviewer.cvjs_setImageSpaceObjectParameters(loadSpaceImage_Location, id, type, layer);
      cadviewer.cvjs_setGlobalSpaceImageObjectScaleFactor(1.0);

      //console.log("cvjs_addFixedSizeImageSpaceObjectXY");
      cadviewer.cvjs_addFixedSizeImageSpaceObjectXY("floorPlan", xpos, ypos);
      //cvjs_addFixedSizeImageSpaceObject("floorPlan");

      // tell to update the Scroll bar
      //vqUpdateScrollbar(id, handle);
      // window.alert("We have clicked an entity: "+entity.substring(4)+"\r\nThe AutoCAD Handle id: "+handle+"\r\nThe svg id is: "+id+"\r\nHighlight SQL pane entry");
    },
    [config]
  );

  const cvjs_dblclick = useCallback(
    (id, handle, entity) => {
      if (config.debugMode) console.log("mysql dblclick " + id + "  " + handle);
      if (config.debugMode)
        window.alert(
          "We have double clicked entity with AutoCAD Handle: " +
            handle +
            "\r\nThe svg id is: " +
            id
        );
    },
    [config]
  );

  const cvjs_mouseout = useCallback(
    (id, handle, entity) => {
      if (config.debugMode) console.log("mysql mouseout " + id + "  " + handle);

      if (current_selected_handle === handle) {
        // do nothing
      } else {
        cadviewer.cvjs_mouseout_handleObjectStyles(id, handle);
      }
    },
    [config]
  );

  const cvjs_mouseover = useCallback(
    (id, handle, entity) => {
      /*

	if (config.debugMode) console.log(
		"mouseover " + id + "  " + handle + "  " + jQuery("#" + id).css("color")
	);
	*/

      if (customclickcontrol) {
        if (config.debugMode)
          console.log(
            "mouseover " +
              id +
              "  " +
              handle +
              "  " +
              jQuery("#" + id).css("color")
          );

        if (!mouseover) {
          mouseover = true;
          if (!mouseclick) cadviewer.cvjs_changeSpaceFixedLocation(id);
        }
      }

      //cvjs_mouseover_handleObjectPopUp(id, handle);
    },
    [config]
  );

  const cvjs_mouseleave = useCallback(
    (id, handle, entity) => {
      if (customclickcontrol) {
        if (config.debugMode)
          console.log(
            "mouseleave " +
              id +
              "  " +
              handle +
              "  " +
              jQuery("#" + id).css("color")
          );

        mouseover = false;
        console.log("mouseleave variable mouseclick: " + mouseclick);
        if (!mouseclick) cadviewer.cvjs_hideOnlyPop();
      }
    },
    [config]
  );

  const cvjs_mouseenter = useCallback(
    (id, handle, entity) => {
      //	cvjs_mouseenter_handleObjectStyles("#a0a000", 4.0, 1.0, id, handle);
      //	cvjs_mouseenter_handleObjectStyles("#ffcccb", 5.0, 0.7, true, id, handle);

      if (config.debugMode) console.log("cvjs_mouseenter");

      cadviewer.cvjs_mouseenter_handleObjectStyles(
        "#F00",
        10.0,
        1.0,
        true,
        id,
        handle
      );
    },
    [config]
  );

  const populateMyCustomPopUpBody = useCallback(
    (rmid, node) => {
      console.log(
        " we actually have a second callback to change content of the the pop-up menu after myCustomPopUpBody (developed originally for Angular2) populateMyCustomPopUpBody: " +
          rmid +
          "  " +
          node
      );

      // 10.61.6
      if (false && config.style_popup) {
        console.log(
          "config.style_popup: " +
            config.cvjs_styleQTip_processbody_flag +
            " " +
            config.cvjs_styleQTip_color_flag +
            " " +
            config.cvjs_styleQTip_fontsize_flag
        );

        console.log(
          "style popup: " +
            config.cvjs_styleQTip_processbody_flag +
            " " +
            config.cvjs_styleQTip_color_flag +
            " " +
            config.cvjs_styleQTip_fontsize_flag
        );
        cadviewer.cvjs_styleQTip_color(
          config.cvjs_styleQTip_color_flag,
          config.cvjs_styleQTip_color_v1,
          config.cvjs_styleQTip_color_v2,
          config.cvjs_styleQTip_color_v3,
          config.cvjs_styleQTip_color_v4,
          config.cvjs_styleQTip_color_v5
        );
        cadviewer.cvjs_styleQTip_fontsize(
          config.cvjs_styleQTip_fontsize_flag,
          config.cvjs_styleQTip_fontsize_v1,
          config.cvjs_styleQTip_fontsize_v2,
          config.cvjs_styleQTip_fontsize_v3,
          config.cvjs_styleQTip_fontsize_v4,
          config.cvjs_styleQTip_fontsize_v5,
          config.cvjs_styleQTip_fontsize_v6
        );
        cadviewer.cvjs_styleQTip_processbody(
          config.cvjs_styleQTip_processbody_flag
        );
        console.log(
          "style popup: " +
            config.cvjs_styleQTip_processbody_flag +
            " " +
            config.cvjs_styleQTip_color_flag +
            " " +
            config.cvjs_styleQTip_fontsize_flag
        );
      }
    },
    [config]
  );

  var heightpre = 0;
  const {
    setSpaceObjects,
    setSelectedSpaceObjectID,
    plansInfo,
    setTabIndex,
    setCurrentDrawingPath,
    currentDrawingPath,
    layerColorsOnLoad,
    setMultiSelectArray,
  } = useContext(CadviewerContext);
  //console.log("here....", new Date().getTime());  10.81.6
  useEffect(() => {
    if (!divRef) return;
    const resizeObserver = new ResizeObserver(
      debounce(() => {
        try {
          const { width, height } = divRef.getBoundingClientRect();

          // 10.6.6
          //if (config.cvjs_debugMode) console.log("cvjs_resizeWindow_fixedSize");
          //cadviewer.cvjs_resizeWindow_fixedSize(width, height, canvasPlanId);

          //cadviewer.cvjs_hideOnlyPop();
          //const { width, height } = divRef.getBoundingClientRect();
          //cadviewer.cvjs_resizeWindow_fixedSize(width, height, canvasPlanId);

          if (config.debugMode) console.log("resize observer width: " + width + " height: " + height);

          // 10.46.9
          //setSelectedSpaceObjectID(undefined);

          if (height != heightpre) {
            //
            heightpre = height;

            var myobjectclicked = cadviewer.cvjs_IdObjectClicked();
            console.log("myobjectclicked:" + myobjectclicked);

            if (myobjectclicked != -1) {
              console.log("we need to move the object");
              //cadviewer.
              // afer debounce, we keep:  10.45.4
              cadviewer.cvjs_changeSpaceFixedLocation(myobjectclicked);
            }
          }
        } catch (err_resize) {
          console.log("error resizeObserver:" + err_resize);
        }
      }, 300)
    );
    console.log({ divRef });
    resizeObserver.observe(divRef);
    return () => {
      resizeObserver.disconnect();
    };
  }, [divRef]);

  const cvjs_ObjectSelected = (rmid) => {
    console.log("cvjs_ObjectSelected" + { rmid });
    // setHandleSelector(true)
    // placeholder for method in tms_cadviewerjs_modal_1_0_14.js   - must be removed when in creation mode and using creation modal
  };

  const _handleWindowResize = useCallback(() => {
    //console.log("_handleResize");
    // we put the resize in a try-catch in case the init_CADViewer() has not initialized yet, and values are zero
    try {
      if (!divRef) return;
      const { width, height } = divRef.getBoundingClientRect();
      //console.log("width: " + width + " height: " + height+ " heightpre: "+heightpre);

      // 10.6.6
      if (config.cvjs_debugMode)
        console.log("_handleWindowResize: cvjs_resizeWindow_fixedSize");
      cadviewer.cvjs_resizeWindow_fixedSize(width, height, canvasPlanId);

      // SpaceObjectInfo.get_main_canvas_size(width, height);

      /*

			//window.alert("resize");
			//cadviewer.cvjs_resizeWindow_fixedSize(300, 300, canvasPlanId);

			// get last

			if (height!=heightpre){  //
				heightpre = height;

				var myobjectclicked = cadviewer.cvjs_IdObjectClicked();
				console.log("myobjectclicked:"+myobjectclicked);

				if (myobjectclicked!=-1){

					console.log("we need to move the object");
					//cadviewer.
					cadviewer.cvjs_changeSpaceFixedLocation(myobjectclicked);
				}

			}

			*/
    } catch (err) {
      console.log(err);
    }
  }, [divRef]);

  useEffect(() => {
    EventSystem.subscribe("cadviewer.handle_resize", _handleWindowResize);
    return () => {
      EventSystem.unsubscribe("cadviewer.handle_resize", _handleWindowResize);
    };
  }, []);

  // Here we are writing a basic function that will be used in the PopUpMenu
  // this is template on all the good stuff users can add
  const my_own_clickmenu1 = useCallback(() => {
    if (SpaceAreaMethods.callback_is_active()) {
      SpaceAreaMethods.my_own_clickmenu1();
    } else {
      var id = cadviewer.cvjs_idObjectClicked();
      //		var node = cvjs_NodeObjectClicked();
      const planInfo = (plansInfo?.spaces ?? []).find(
        (planInfo) =>
          planInfo["spaceNumber"].replaceAll(".", "_").replaceAll(" ", "_") ===
          id
      );

      // if (config.popupCustomMenu1.indexOf("Tenant") > -1) {
      setTabIndex(planInfo.detailTabs[0].caption);
      // }
      // else{
      // 	window.alert(
      // 		"Custom menu item 1: Here developers can implement their own methods, the look and feel of the menu is controlled in the settings.  Clicked object ID is: " +
      // 			id
      // 	);
      // }
    }

    // CH - no, shall remain open
    //cadviewer.cvjs_hideOnlyPop();
  }, [plansInfo, setTabIndex]);

  // Here we are writing a basic function that will be used in the PopUpMenu
  // this is template on all the good stuff users can add
  const my_own_clickmenu2 = useCallback(() => {
    if (SpaceAreaMethods.callback_is_active()) {
      SpaceAreaMethods.my_own_clickmenu2();
    } else {
      var id = cadviewer.cvjs_idObjectClicked();
      //var node = cvjs_NodeObjectClicked();

      const planInfo = (plansInfo?.spaces ?? []).find(
        (planInfo) =>
          planInfo["spaceNumber"].replaceAll(".", "_").replaceAll(" ", "_") ===
          id
      );

      // if (config.popupCustomMenu1.indexOf("Tenant") > -1) {
      setTabIndex(planInfo.detailTabs[1].caption);
      // }
      // else{
      // 	window.alert(
      // 		"Custom menu item 2: Here developers can implement their own methods, the look and feel of the menu is controlled in the settings. Clicked object ID is: " +
      // 			id
      // 	);
      // }
      // CH - no, shall remain open
      //cadviewer.cvjs_hideOnlyPop();
    }
  }, [setTabIndex, plansInfo]);

  // Callback Method on Creation and Delete
  //export function cvjs_graphicalObjectOnChange(type, graphicalObject, spaceID){
  const cvjs_graphicalObjectOnChange = useCallback(
    (type, graphicalObject, spaceID, evt) => {
      // TODO is ther's no space object, we should close the bottom panel

      console.log(
        "cvjs_graphicalObjectOnChange called: " +
          type +
          " " +
          graphicalObject +
          " " +
          spaceID +
          "  " +
          evt
      );

      /*

        console.log("myHYPHENCHANGEFLAG: "+myHYPHENCHANGEFLAG);
        console.log("myHYPHENBLOCKFLAG: "+myHYPHENBLOCKFLAG);

        if (myHYPHENBLOCKFLAG){
            console.log("myHYPHENBLOCKFLAG is true, we do NOT PROCESS and return: "+myHYPHENBLOCKFLAG);
            return;
        }


        if (cadviewer.cvjs_getPagechangeActivateFlag()){
                console.log("cvjs_getPagechangeActivateFlag() is true, we do NOT PROCESS and return: "+cadviewer.cvjs_getPagechangeActivateFlag());
            return
        }
        else
         console.log("cvjs_getPagechangeActivateFlag() is false, standard processing: "+cadviewer.cvjs_getPagechangeActivateFlag());


        myHYPHENCHANGEFLAG = true;
        
        console.log("myHYPHENCHANGEFLAG is now true, because of processing: "+myHYPHENCHANGEFLAG);

        return;

*/

      if (config.enableHelpersMethodsGroup_SpaceArea) {
        //RedlineAreaMethods.graphicalObjectOnChange(type, graphicalObject, spaceID, evt);
        SpaceAreaMethods.graphicalObjectOnChange(
          type,
          graphicalObject,
          spaceID,
          evt
        );

        return;
      }

      if (config.enableHelpersMethodsGroup_RedlineArea) {
        //RedlineAreaMethods.graphicalObjectOnChange(type, graphicalObject, spaceID, evt);
        RedlineAreaMethods.graphicalObjectOnChange(
          type,
          graphicalObject,
          spaceID,
          evt
        );

        return;
      }

      // if layer change
      try {
        if (type.indexOf("layerChange") == 0) {
          var layerTable = cadviewer.cvjs_getLayerTable("floorPlan");
          for (var i = 0; i < layerTable.numberOfLayers; i++) {
            console.log(
              "Layer:" +
                layerTable.layers[i].layerName +
                " State:" +
                layerTable.layers[i].status
            );
          }
          return;
        }
      } catch (err1) {
        console.log("layer change err:" + err1);
        return;
      }

      if (evt != null) console.log("evt.which =" + evt.which); // 1=left mouse , 3=right mouse
      if (
        evt != null ||
        config.ShowInformativeBottomPanelWhenClickInLeftPanel
      ) {
        if (spaceID !== "void") setSelectedSpaceObjectID(spaceID);
      }
      // do something with the graphics object created!
      //	window.alert("CALLBACK: cvjs_graphicalObjectOnChange: "+type+" "+graphicalObject+" "+spaceID+" indexSpace: "+graphicalObject.toLowerCase().indexOf("space"));
      console.log(
        "CALLBACK: cvjs_graphicalObjectOnChange: " +
          type +
          " " +
          graphicalObject +
          " " +
          spaceID +
          " indexSpace: " +
          graphicalObject.toLowerCase().indexOf("space")
      );

      if (type == "Click" && graphicalObject == "MultiSelectClick") {
        // here we need to update the left panel with the selected space objects
        // updateLeftPanelWithSelectedSpaceObjects(cadviewer.cvjs_getMultiSelectArray());

        // console.log(
        //   "cadviewer.cvjs_getMultiSelectArray:" +
        //     JSON.stringify(cadviewer.cvjs_getMultiSelectArray())
        // );

        // if [], the left panel is at its default state

        // if [1,2,3], the left panel is updated with the selected space objects

        // [{"SpaceID":"2322","Area":"not computed"}]     - loop over all SpaceIDs to get the objects that shall be displayed in the left panel

        setMultiSelectArray(
          cadviewer
            .cvjs_getMultiSelectArray()
            .map((item) =>
              typeof item === "string" || typeof item === "number"
                ? item
                : item.SpaceID
            )
        );

        return;
      }

      /* CH   */
      if (type == "Click" && graphicalObject == "HideOnlyPop") {
        // if we have clicked a popup, we shall hide the lower menu with detailed content
        setSelectedSpaceObjectID(undefined);

        //window.alert("we have hidden popup! - please hide the ShowInformativeBottomPanel");
      }

      if (graphicalObject.toLowerCase().indexOf("space") !== -1) {
        myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);

        if (
          myobject != null &&
          myobject != undefined &&
          myobject != "" &&
          myobject != []
        ) {
          console.log({ myobject, evt });
          console.log(
            "This Object " +
              myobject.id +
              " with name " +
              myobject.name +
              " has Parent: " +
              myobject.parent
          );
        }

        /*

      if (graphicalObject.toLowerCase().indexOf("space") !== -1) {
        myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
        console.log({ myobject, evt });
        console.log(
          "This Object " +
            myobject.id +
            " with name " +
            myobject.name +
            " has Parent: " +
            myobject.parent
        );
        */

        /* CH

			let cvjsPopUpBody = "";
			try {
				// get block attribute:
				// block attributes are listed with  ID_counter , and can be retrived with cvjs:tag and cvjs:value

				cvjsPopUpBody = "<div style='line-height:75%'><font size='0'>";

				for (var i = 1; i <= myobject.blockAttributeCount; i++) {
					var attribId = "#" + myobject.blockAttributeId + "_" + i;
					cvjsPopUpBody += document.querySelector(attribId).getAttribute('cvjs:tag')+": <span id=\"mymodal_name_"+document.querySelector(attribId).getAttribute('cvjs:value')+"\" >"+document.querySelector(attribId).getAttribute('cvjs:value')+"</span><br>";
				}
				cvjsPopUpBody+= "<font size='+2'></div>";
			}
			catch(err){}
			cvjsPopUpBody = myCustomPopUpBody(spaceID)
			console.log({cvjsPopUpBody})

			*/
      }

      // SPACE OBJECTS

      if (
        type === "Create" &&
        graphicalObject.toLowerCase().indexOf("space") > -1 &&
        graphicalObject.toLowerCase().indexOf("circle") == -1
      ) {
        /**
         * Return a JSON structure of all content of a given ID: <br>
         * 	var jsonStructure =  	{	"path": path,
         *								"tags": tags,
         *								"node": node,
         *								"area": area,
         *								"outerhtml": outerHTML,
         *								"occupancy": occupancy,
         *								"name": name,
         *								"type": type,
         *								"id": id,
         *								"defaultcolor": defaultcolor,
         *								"highlightcolor": highlightcolor,
         *								"selectcolor": selectcolor,
         *								"layer": layer,
         *								"group": group,
         *								"linked": linked,
         *								"attributes": attributes,
         *								"attributeStatus": attributeStatus,
         *								"displaySpaceObjects": displaySpaceObjects,
         *								"translate_x": translate_x,
         *								"translate_y": translate_y,
         *								"scale_x": scale_x ,
         *								"scale_y": scale_y ,
         *								"rotate": rotate,
         *								"transform": transform,
         *								"svgx": svgx,
         *								"svgy": svgx,
         *								"dwgx": dwgx,
         *								"dwgy": dwgy ,
         *                               "customContent" : mycustomcontent,
         *                               "pageNumber" : "",
         *                               "pageName" : "",
         *                               "block" : "",
         *                               "blockAttributeId" : "",
         *                               "blockAttributeCount" : ""
         *                               "clickhandler" : "enable",
         *                               "parent" : "none",
         *                               }
         * @param {string} spaceID - Id of the Space Object to return
         * @return {Object} jsonSpaceObject - Object with the entire space objects content
         */

        myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
        // I can save this object into my database, and then use command
        // cvjs_setSpaceObjectDirect(jsonSpaceObject)
        // when I am recreating the content of the drawing at load
        // for the fun of it, display the SVG geometry of the space:
        // console.log("This is the SVG: "+myobject.outerhtml);

        // NOTE! - When an object is created, the application programmer can simply give
        // the object a name matching a database, if needed.
        /*
			var newName = "ID"+Math.floor(Math.random() * 1000000);
			console.log("OnloadEnd new object created name:"+myobject.name+ " id:"+myobject.id+" new name"+newName)
			cadviewer.cvjs_changeSpaceObjectName(myobject.id, newName)
			*/
      }

      if (
        type === "Delete" &&
        graphicalObject.toLowerCase().indexOf("space") > -1
      ) {
        // remove this entry from my DB

        window.alert("We have deleted: " + spaceID);
      }

      if (
        type === "Move" &&
        graphicalObject.toLowerCase().indexOf("space") > -1
      ) {
        // remove this entry from my DB

        console.log("This object has been moved: " + spaceID);
        myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
      }

      // REDLINE & STICKYNOTE OBJECTS

      // REDLINES
      if (
        type === "Create" &&
        graphicalObject.toLowerCase().indexOf("redline") > -1
      ) {
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects(); // cadviewer 6
        myredlinestickynoteObjects =
          cadviewer.cvjs_returnAllRedlineStickyNoteObjects(); //cadviewer 7
        console.log("red: " + JSON.stringify(myredlineObjects));
        // 7.0.15
      }

      if (
        type === "Delete" &&
        graphicalObject.toLowerCase().indexOf("redline") > -1
      ) {
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects(); // cadviewer 6
        myredlinestickynoteObjects =
          cadviewer.cvjs_returnAllRedlineStickyNoteObjects(); //cadviewer 7
        console.log("red: " + JSON.stringify(myredlineObjects));
      }

      if (
        type === "Create" &&
        graphicalObject.toLowerCase().indexOf("stickynote") > -1
      ) {
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects(); // cadviewer 6
        myredlinestickynoteObjects =
          cadviewer.cvjs_returnAllRedlineStickyNoteObjects(); //cadviewer 7
        console.log("note:" + JSON.stringify(mystickynoteObjects));
      }

      if (
        type === "Delete" &&
        graphicalObject.toLowerCase().indexOf("stickynote") > -1
      ) {
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects(); // cadviewer 6
        myredlinestickynoteObjects =
          cadviewer.cvjs_returnAllRedlineStickyNoteObjects(); //cadviewer 7
        console.log("note:" + JSON.stringify(mystickynoteObjects));
      }

      if (
        type === "Edit" &&
        graphicalObject.toLowerCase().indexOf("stickynote") > -1
      ) {
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects(); // cadviewer 6
        myredlinestickynoteObjects =
          cadviewer.cvjs_returnAllRedlineStickyNoteObjects(); //cadviewer 7
        console.log("note:" + JSON.stringify(mystickynoteObjects));
      }

      if (
        type === "Move" &&
        graphicalObject.toLowerCase().indexOf("stickynote") > -1
      ) {
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects(); // cadviewer 6
        myredlinestickynoteObjects =
          cadviewer.cvjs_returnAllRedlineStickyNoteObjects(); //cadviewer 7
        console.log("note:" + JSON.stringify(mystickynoteObjects));
      }
    },
    [setSelectedSpaceObjectID]
  );

  const myCustomPopUpBody = useCallback(
    (rmid) => {
      // set custom color on modal
      //cadviewer.cvjs_styleQTip_color(true, '#3DCD5D', '#293133', '#293133', '#293133', '#293133');
      var my_cvjsPopUpBody = "";

      if (SpaceAreaMethods.callback_is_active()) {
        my_cvjsPopUpBody = SpaceAreaMethods.myCustomPopUpBody(rmid);
      } else {
        console.log(
          "myCustomPopUpBody callback 1: " +
            rmid +
            " I now change the pop-up menu:"
        );

        // 9.31.1
        // we change the Type to be a custom type     newType = DBA(rmid)

        // 10.50.6

        const planInfo = (plansInfo.spaces ?? []).find(
          (planInfo) =>
            planInfo["spaceNumber"].replaceAll(".", "_").replaceAll(" ", "_") ==
            rmid
        );

        /*
			const planInfo = plansInfo.spaces.find(
				(planInfo) => planInfo["spaceNumber"].replaceAll(".", "_").replaceAll(" ", "_") == rmid
			);
*/

        console.log({ planInfo, plansInfo, rmid });
        const newType = planInfo ? planInfo["spaceHeader"] : "";

        console.log(
          "myCustomPopUpBody callback 2: " +
            rmid +
            "newtype:" +
            newType +
            "XX" +
            " plansinfo:" +
            plansInfo
        );

        if (plansInfo == undefined || plansInfo == "") {
          // standard processing

          // 10.61.6
          my_cvjsPopUpBody =
            '<div class="cadviewer-core-styles" style="background-color: none; color: #000; ">';
          my_cvjsPopUpBody +=
            '<canvas id="dummy" width="1" height="20"></canvas><span class="fa fa-folder-open"></span> <canvas id="dummy" width="3" height="18"></canvas> <span onclick="my_own_clickmenu1();" style="cursor: pointer;">Tenant Info</span><br>';
          my_cvjsPopUpBody +=
            '<canvas id="dummy" width="1" height="20"></canvas><span class="fa fa-folder-open"></span> <canvas id="dummy" width="3" height="18"></canvas> <span  onclick="my_own_clickmenu2();" style="cursor: pointer;">Future Tenant Info</span><br>';
          my_cvjsPopUpBody +=
            '<canvas id="dummy" width="1" height="20"></canvas><span class="fa fa-search"></span> <canvas id="dummy" width="3" height="18"></canvas> <span onclick="cvjs_zoomHere();" style="cursor: pointer;">Zoom Here </span>';

          /*
            my_cvjsPopUpBody =
              '<div  class="cvjs_modal_1" id="my_own_clickmenu1()">' +
              config.popupCustomMenu1 +
              "<i class='" +
              config.popupCustomFontAwesomeIcon1 +
              "'></i></div>";
            my_cvjsPopUpBody +=
              '<div class="cvjs_modal_1" id="my_own_clickmenu2()">' +
              config.popupCustomMenu2 +
              "<i class='" +
              config.popupCustomFontAwesomeIcon2 +
              "'></i></div>";
            my_cvjsPopUpBody +=
              '<div class="cvjs_modal_1" id="cvjs_zoomHere_PopUp()">Zoom<br>Here<br><i class=\'fa fa-search-plus\'></i></div>';
          */
        } else {
          if (newType != "") {
            //cadviewer.cvjs_changeSpaceObjectType(rmid, newType)
            // make your own popup based on callback

            // need to have the latest version of the callback method
            cadviewer.cvjs_setCallbackMethod(
              "my_own_clickmenu1",
              my_own_clickmenu1
            );
            cadviewer.cvjs_setCallbackMethod(
              "my_own_clickmenu2",
              my_own_clickmenu2
            );

            // 10.57.1
            try {
              if (config.setSpaceNameAsTypeInPopup)
                cadviewer.cvjs_changeSpaceObjectType(rmid, newType);
            } catch (err_type) {
              console.log("error changeSpaceObjectType:" + err_type);
            }

            //console.log("what is config.style_popup:"+config.style_popup);

            // 10.61.6
            if (config.style_popup) {
              //console.log("style popup: "+config.cvjs_styleQTip_processbody_flag+" "+config.cvjs_styleQTip_color_flag+" "+config.cvjs_styleQTip_fontsize_flag);
              cadviewer.cvjs_styleQTip_color(
                config.cvjs_styleQTip_color_flag,
                config.cvjs_styleQTip_color_v1,
                config.cvjs_styleQTip_color_v2,
                config.cvjs_styleQTip_color_v3,
                config.cvjs_styleQTip_color_v4,
                config.cvjs_styleQTip_color_v5
              );
              cadviewer.cvjs_styleQTip_fontsize(
                config.cvjs_styleQTip_fontsize_flag,
                config.cvjs_styleQTip_fontsize_v1,
                config.cvjs_styleQTip_fontsize_v2,
                config.cvjs_styleQTip_fontsize_v3,
                config.cvjs_styleQTip_fontsize_v4,
                config.cvjs_styleQTip_fontsize_v5,
                config.cvjs_styleQTip_fontsize_v6
              );
              cadviewer.cvjs_styleQTip_processbody(
                config.cvjs_styleQTip_processbody_flag
              );
              //console.log("style popup: "+config.cvjs_styleQTip_processbody_flag+" "+config.cvjs_styleQTip_color_flag+" "+config.cvjs_styleQTip_fontsize_flag);
            }

            //            my_cvjsPopUpBody = "";

            // 10.61.6
            my_cvjsPopUpBody =
              '<div class="cadviewer-core-styles" style="background-color: none; color: #000; ">';

            for (var i = 0; i < planInfo["detailTabs"].length; i++) {
              var detailTab = planInfo["detailTabs"][i];

              // cadviewer.cvjs_setCallbackMethod(`my_own_clickmenu_${detailTab.caption.replaceAll(" ", "_")}`, function () {
              // 	setTabIndex(detailTab.caption);
              // });

              /*
              my_cvjsPopUpBody += `<div class="cvjs_modal_1" id="my_own_clickmenu${
                i + 1
              }()">${detailTab.caption}<br/><i class='${
                config[`popupCustomFontAwesomeIcon${i + 1}`]
              }'></i></div>`;
              */

              //     my_cvjsPopUpBody += `<div class="cvjs_modal_1" id="my_own_clickmenu${i + 1}()">${detailTab.caption}<br/><i class='${config[`popupCustomFontAwesomeIcon${i + 1}`]}'></i></div>`;

              my_cvjsPopUpBody += `<canvas id="dummy" width="1" height="20"></canvas><span class="fa fa-folder-open"></span> <canvas id="dummy" width="3" height="18"></canvas> <span id="my_own_clickmenu${
                i + 1
              }()" style="cursor: pointer;">${detailTab.caption}</span><br>`;
            }

            // my_cvjsPopUpBody = '<div  class="cvjs_modal_1" id="my_own_clickmenu1()">'+config.popupCustomMenu1+'<i class=\''+config.popupCustomFontAwesomeIcon1+'\'></i></div>';
            //
            // if (planInfo && planInfo["detailTabs"].length > 1){
            //
            // 	my_cvjsPopUpBody +=
            // 	'<div class="cvjs_modal_1" id="my_own_clickmenu2()">'+config.popupCustomMenu2+'<i class=\''+config.popupCustomFontAwesomeIcon2+'\'></i></div>';
            //
            // }

            //      my_cvjsPopUpBody +=
            //        '<div class="cvjs_modal_1" id="cvjs_zoomHere_PopUp()">Zoom<br>Here<br><i class=\'fa fa-search-plus\'></i></div>';

            // 10.61.6
            my_cvjsPopUpBody +=
              '<canvas id="dummy" width="1" height="20"></canvas><span class="fa fa-search"></span> <canvas id="dummy" width="3" height="18"></canvas> <span id="cvjs_zoomHere()" style="cursor: pointer;">Zoom Here </span>';

            // console.log("before: my_cvjsPopUpBody:" + my_cvjsPopUpBody);

            /*            
              // 10.61.6
              my_cvjsPopUpBody =  "<div class=\"cadviewer-core-styles\" style=\"background-color: none; color: #000; \">";
              my_cvjsPopUpBody += "<canvas id=\"dummy\" width=\"1\" height=\"20\"></canvas><span class=\"fa fa-folder-open\"></span> <canvas id=\"dummy\" width=\"3\" height=\"18\"></canvas> <span id=\"my_own_clickmenu1()\" style=\"cursor: pointer;\">Tenant Info</span><br>";
              my_cvjsPopUpBody += "<canvas id=\"dummy\" width=\"1\" height=\"20\"></canvas><span class=\"fa fa-folder-open\"></span> <canvas id=\"dummy\" width=\"3\" height=\"18\"></canvas> <span  id=\"my_own_clickmenu2()\" style=\"cursor: pointer;\">Future Tenant Info</span><br>";
              my_cvjsPopUpBody += "<canvas id=\"dummy\" width=\"1\" height=\"20\"></canvas><span class=\"fa fa-search\"></span> <canvas id=\"dummy\" width=\"3\" height=\"18\"></canvas> <span id=\"cvjs_zoomHere()\" style=\"cursor: pointer;\">Zoom Here </span>";
            */
          } else {
            // since no content loaded from json, we shut down the popup modal
            my_cvjsPopUpBody = "";
          }
        }
      }

      //		window.alert("my_cvjsPopUpBody:"+my_cvjsPopUpBody);

      return my_cvjsPopUpBody;
    },
    [plansInfo, setTabIndex]
  );

  const cvjs_OnLoadEnd = useCallback(() => {
    // generic callback method, called when the drawing is loaded
    // here you fill in your stuff, call DB, set up arrays, etc..
    // this method MUST be retained as a dummy method! - if not implemeted -

    // set maximum CADViewer canvas side  - as component has been rendered at this point
    // cadviewer.cvjs_resizeWindow_position(canvasPlanId);

    console.log(
      "cvjs_OnLoadEnd: cadviewer.cvjs_getPagechangeActivateFlag():" +
        cadviewer.cvjs_getPagechangeActivateFlag()
    );

    /*
        console.log("OnLoadEnd cvjs_getPagechangeActivateFlag():"+ cadviewer.cvjs_getPagechangeActivateFlag());
        if (!cadviewer.cvjs_getPagechangeActivateFlag() == true) {

            myHYPHENBLOCKFLAG = true; // 
            myHYPHENCHANGEFLAG = false;

            console.log("FIRST OnLoadEnd cvjs_getPagechangeActivateFlag():"+ cadviewer.cvjs_getPagechangeActivateFlag()+ " myHYPHENCHANGEFLAG:"+myHYPHENCHANGEFLAG+ " myHYPHENBLOCKFLAG:"+myHYPHENBLOCKFLAG);

            cadviewer.cvjs_clearCurrentRedline("floorPlan");
            cadviewer.cvjs_clearQuickCounts("floorPlan");
            cadviewer.cvjs_clearAllImageLinks("floorPlan");
            cadviewer.cvjs_clearSpaceObjects("floorPlan");

            // load all redlines, quick counts, image links and space objects
            //*
            // load all content

            // load sticky notes and redlines
            cadviewer.cvjs_setStickyNoteRedlineUrl(
              config.ServerBackEndUrl + "/content/redlines/" + "v7/" + "test_red02.json"
              //    "/content/redlines/" + "v7/" + "test_red01.json"
            );

            console.log(
              "ServerBackEndUrl + /content/redlines/ + v7/ + test_red02.json=" +
                config.ServerBackEndUrl +
                "/content/redlines/" +
                "v7/" +
                "test_red02.json"
            );
            cadviewer.cvjs_loadStickyNotesRedlines("floorPlan", "");
            //
            // load image notes
            cadviewer.cvjs_loadAllImageLinks("floorPlan", ""); //save
            // load space objects
            cadviewer.cvjs_loadSpaceObjectsDirect(
              "floorPlan",
              config.ServerBackEndUrl +
                "/content/spaceObjects/" +
                "hyphen02/" +
                "spaces_test02.json"
            );

            
            myHYPHENCHANGEFLAG = false;
            myHYPHENBLOCKFLAG = false; 
            console.log("LAST OnLoadEnd cvjs_getPagechangeActivateFlag():"+ cadviewer.cvjs_getPagechangeActivateFlag()+ " myHYPHENCHANGEFLAG:"+myHYPHENCHANGEFLAG+ " myHYPHENBLOCKFLAG:"+myHYPHENBLOCKFLAG);
        }
        return;

*/

    _handleWindowResize();

    console.log(
      "cvjs_OnLoadEnd  - WE HAVE NOW LOADED THE DRAIWING	 cvjs_isZoomImageWallpaperActive()" +
        cadviewer.cvjs_isZoomImageWallpaperActive()
    );

    cadviewer.cvjs_resetZoomPan(canvasPlanId);
    var user_name = "Generic User 01";
    var user_id = "user_1";

    // set a value for redlines
    cadviewer.cvjs_setCurrentStickyNoteValues_NameUserId(user_name, user_id);
    cadviewer.cvjs_setCurrentRedlineValues_NameUserid(user_name, user_id);
    // cadviewer.cvjs_dragBackgroundToFront_SVG(canvasPlanId);
    //cvjs_initZeroWidthHandling(canvasPlanId, 1.0);

    textLayer1 = cadviewer.cvjs_clearLayer(textLayer1);

    // 10.34.1
    if (config.setNormalizeFixedLineWeights) {
      cadviewer.cvjs_normalizeFixedLineWeights(
        config.setNormalizeFixedLineWeightsFactor
      );
    }

    try {
      if (config.customOnLoadEndContent) {
        // add your own content here.....
        cadviewer.cvjs_adjustMinimumLineThickness(
          config.adjustMinimumLineThickness
        );

        /*  10.34.4 - remove
				console.log("CADViewer.js - AllLayersOff:");

				if (config.displayTopPaneScrollDownButton)   // we have a scroll down with layer settings
					cadviewer.cvjs_AllLayersOff(canvasPlanId);

				*/

        console.log(
          "CADViewer.js - cvjs_colorSingleLayer:  number of layers:" +
            layerColorsOnLoad.length
        );

        for (var i = 0; i < layerColorsOnLoad.length; i++) {
          var layer = layerColorsOnLoad[i];

          cadviewer.cvjs_colorSingleLayer(
            canvasPlanId,
            layer.color,
            layer.layer
          );
        }

        console.log(
          config.setZoomImageWallpaper +
            " BEFORE CALLING BROOKFIELD LAYER CHANGE - fetchPlanJsonSetLayers"
        );

        // 10.31.10
        if (config.displayTopPaneScrollDownButton) {
          // 9.50.7 - Brookfield Layer Change shall be applied based the actual layer setttings in top drop down
          // 10.37.14
          // this is not needed
          //fetchPlanJsonSetLayers(config.globalApplicationViews);
        } else {
          //cvjs_brookfield_layerchange();
          console.log(
            "cvjs_brookfield_layerchange() -  not applied, therefore open to activateZoomImageWallpaper"
          );
          // 10.31.10
          //window.alert("note! only activate if fetch is not happening");     // 10.40.1
          if (config.setZoomImageWallpaper)
            //if (config.cvjs_activateZoomImageWallpaper)
            cadviewer.cvjs_activateZoomImageWallpaper();
        }
        // setTimeout(() => cvjs_brookfield_layerchange(), config.defaultLayerSetTimeout);
      }
    } catch (err) {}

    if (config.enableSpaceObjectsExtraction) {
      //  POPULATE PANE MENUS  FROM DRAWING
      setSpaceObjects();
    }

    if (config.activateCompareOnLoad) {
      config.activateCompareOnLoad = false;
      // EventSystem.publish('panel.folder_list.open', "compare_file");

      // 9.64.3

      cadviewer.cvjs_compareDrawings_LoadSecondDrawing(canvasPlanId);
    }

    if (currentDrawingPath.includes("?spaceNumber=")) {
      const spaceNumber = currentDrawingPath.split("?spaceNumber=")[1];
      setTimeout(() => {
        cadviewer.cvjs_changeSpaceFixedLocation(spaceNumber, null);
        // cadviewer.cvjs_zoomHere_ObjectId(spaceNumber, config.ZoomFactor);
      }, 500);
      if (config.ShowInformativeBottomPanelWhenClickInLeftPanel) {
        setSelectedSpaceObjectID(spaceNumber);
      }
    }
    EventSystem.publish("cadviewer.cvjs_onLoadEnd", new Date().getTime());
  }, [
    _handleWindowResize,
    setSpaceObjects,
    currentDrawingPath,
    setSelectedSpaceObjectID,
    layerColorsOnLoad,
  ]);

  const openFileExplorer = () => {
    EventSystem.publish("panel.folder_list.open", "compare_file");
  };

  const mountCanvas = useCallback(async () => {
    console.log({ log: "mounted" });

    /*
			NOTE:  use config.ts for settings  of ServerBackEndUrl,  ServerUrl and ServerLocation
		*/

    //Standard file from /content/ folder on CADViewer NodeJS Conversion Server
    //		FileName = config.ServerBackEndUrl + config.initFileName;
    if (!bpretailSourceFile) {
      FileName = config.ServerBackEndUrl + config.initFileName;
    }

    // test 10.67.4
    cadviewer.cvjs_setMeasurementDefaultType("Area");

    cadviewer.cvjs_debugMode(config.debugMode);

    cadviewer.cvjs_setCallbackQuickCount(true);

    // cadviewer.cvjs_setLeafletJS(true);
    // Set all paths, and handlers, changes these depending on back-end server
    cadviewer.cvjs_setAllServerPaths_and_Handlers(
      config.ServerBackEndUrl,
      config.ServerUrl,
      config.ServerLocation,
      "NodeJS",
      "ReactJS",
      canvasPlanId
    );
    //		cadviewer.cvjs_setAllServerPaths_and_Handlers(config.ServerBackEndUrl, config.ServerUrl, config.ServerLocation, "PHP", "ReactJS", canvasPlanId);
    //		cadviewer.cvjs_setAllServerPaths_and_Handlers(config.ServerBackEndUrl, config.ServerUrl, config.ServerLocation, "DotNet", "ReactJS", canvasPlanId);

    //      Setting all callback methods  - they have to be injected into the CADViewer class componnet

    // 9.53.2
    if (config.enablePolygonControlPoints) {
      // 9.50.4
      cadviewer.cvjs_enablePolygonControlPoints(true);

      var controlPointsStyleObject = {
        fill: "#0000FF",
        stroke: "#00FF00",
        opacity: "0.9",
        radiusFactor: 6,
      };

      cadviewer.cvjs_polygonControlsPointsStyle(controlPointsStyleObject);
    }

    // 9.55.6
    cadviewer.cvjs_setRedlineModeInfo(config.setRedlineModeInfo);

    // 9.50.1
    if (config.bearerToken)
      cadviewer.cvjs_setBearerToken(config.bearerToken.substring(7));

    //cadviewer.cvjs_setRequestHeaders("Authorization", "Bearer t-7614f875-8423-4f20", "CustomHeader", "CustomValue");

    cadviewer.cvjs_compareDrawings_externalModal(
      true,
      openFileExplorer,
      "VanillaJS"
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_insertSpaceObjectCustomCodePlaceholder",
      cvjs_insertSpaceObjectCustomCodePlaceholder
    );
    cadviewer.cvjs_setCallbackMethod("cvjs_OnLoadEnd", cvjs_OnLoadEnd);
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_graphicalObjectOnChange",
      cvjs_graphicalObjectOnChange
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_OnLoadEndRedlines",
      cvjs_OnLoadEndRedlines
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_ObjectSelected",
      cvjs_ObjectSelected
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_measurementCallback",
      cvjs_measurementCallback
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_CalibrateMeasurementCallback",
      cvjs_CalibrateMeasurementCallback
    );
    cadviewer.cvjs_setCallbackMethod("cvjs_Url_callback", cvjs_Url_callback);
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_loadSpaceImage_UserConfiguration",
      cvjs_loadSpaceImage_UserConfiguration
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_NoObjectSelected",
      cvjs_NoObjectSelected
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_SVGfileObjectClicked",
      cvjs_SVGfileObjectClicked
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_SVGfileObjectMouseEnter",
      cvjs_SVGfileObjectMouseEnter
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_SVGfileObjectMouseLeave",
      cvjs_SVGfileObjectMouseLeave
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_SVGfileObjectMouseMove",
      cvjs_SVGfileObjectMouseMove
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_ParseDisplayDataMaps",
      cvjs_ParseDisplayDataMaps
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_QuickCountCallback",
      cvjs_QuickCountCallback
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_OnHyperlinkClick",
      cvjs_OnHyperlinkClick
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_setUpStickyNotesRedlines",
      cvjs_setUpStickyNotesRedlines
    );
    cadviewer.cvjs_setCallbackMethod(
      "custom_host_parser_PopUpMenu",
      custom_host_parser_PopUpMenu
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customHostParser",
      cvjs_customHostParser
    );
    cadviewer.cvjs_setCallbackMethod("drawPathsGeneric", drawPathsGeneric);
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_callbackForModalDisplay",
      cvjs_callbackForModalDisplay
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_populateMyCustomPopUpBody",
      cvjs_populateMyCustomPopUpBody
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customModalPopUpBody",
      cvjs_customModalPopUpBody
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_NoObjectSelectedStickyNotes",
      cvjs_NoObjectSelectedStickyNotes
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_NoObjectSelectedHyperlinks",
      cvjs_NoObjectSelectedHyperlinks
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_ObjectSelectedHyperlink",
      cvjs_ObjectSelectedHyperlink
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_ObjectSelectedStickyNotes",
      cvjs_ObjectSelectedStickyNotes
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_saveStickyNotesRedlinesUser",
      cvjs_saveStickyNotesRedlinesUser
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_loadStickyNotesRedlinesUser",
      cvjs_loadStickyNotesRedlinesUser
    );
    // 10.75.5
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_processCompleted",
      cvjs_processCompleted
    );

    cadviewer.cvjs_setCallbackMethod("open_tenant_information", () => {
      setTabIndex("tenant_information");
      cadviewer.cvjs_hideOnlyPop();
    });
    cadviewer.cvjs_setCallbackMethod("open_future_tenant_information", () => {
      setTabIndex("future_tenant_information");
      cadviewer.cvjs_hideOnlyPop();
    });

    cadviewer.cvjs_setCallbackMethod("my_own_clickmenu1", my_own_clickmenu1);
    cadviewer.cvjs_setCallbackMethod("my_own_clickmenu2", my_own_clickmenu2);
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_popupTitleClick",
      cvjs_popupTitleClick
    );
    cadviewer.cvjs_setCallbackMethod("cvjs_mousedown", cvjs_mousedown);
    cadviewer.cvjs_setCallbackMethod("cvjs_mouseup", cvjs_mouseup); // 9.65.1
    cadviewer.cvjs_setCallbackMethod("cvjs_click", cvjs_click);
    cadviewer.cvjs_setCallbackMethod("cvjs_dblclick", cvjs_dblclick);
    cadviewer.cvjs_setCallbackMethod("cvjs_mouseout", cvjs_mouseout);
    cadviewer.cvjs_setCallbackMethod("cvjs_mouseover", cvjs_mouseover);
    cadviewer.cvjs_setCallbackMethod("cvjs_mouseleave", cvjs_mouseleave);
    cadviewer.cvjs_setCallbackMethod("cvjs_mouseenter", cvjs_mouseenter);
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_graphicalObjectCreated",
      cvjs_graphicalObjectCreated
    );

    // custom callback commands
    cadviewer.cvjs_setCallbackMethod("custom_callback1", custom_callback1);
    cadviewer.cvjs_setCallbackMethod("custom_callback2", custom_callback2);
    cadviewer.cvjs_setCallbackMethod("custom_callback3", custom_callback3);
    cadviewer.cvjs_setCallbackMethod("custom_callback4", custom_callback4);
    cadviewer.cvjs_setCallbackMethod("custom_callback5", custom_callback5);
    cadviewer.cvjs_setCallbackMethod("custom_callback6", custom_callback6);
    cadviewer.cvjs_setCallbackMethod("custom_callback7", custom_callback7);
    cadviewer.cvjs_setCallbackMethod("custom_callback8", custom_callback8);
    cadviewer.cvjs_setCallbackMethod("custom_callback9", custom_callback9);
    cadviewer.cvjs_setCallbackMethod("custom_callback10", custom_callback10);
    // custom icon commands
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_01",
      cvjs_customCommand_01
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_02",
      cvjs_customCommand_02
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_03",
      cvjs_customCommand_03
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_04",
      cvjs_customCommand_04
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_05",
      cvjs_customCommand_05
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_06",
      cvjs_customCommand_06
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_07",
      cvjs_customCommand_07
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_08",
      cvjs_customCommand_08
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_09",
      cvjs_customCommand_09
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_10",
      cvjs_customCommand_10
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_11",
      cvjs_customCommand_11
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_12",
      cvjs_customCommand_12
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_13",
      cvjs_customCommand_13
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_14",
      cvjs_customCommand_14
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_15",
      cvjs_customCommand_15
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_16",
      cvjs_customCommand_16
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_17",
      cvjs_customCommand_17
    );
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_18",
      cvjs_customCommand_18
    );

    /*

		cadviewer.cvjs_setCallbackMethod(
			"cvjs_customCommand_19",
			cvjs_customCommand_19
		);
		*/

    // END set all callback methods
    // 10.74.5
    if (config.setCallbackMeasurement) {
      cadviewer.cvjs_setCallbackMeasurement(config.setCallbackMeasurement);
    }

    if (config.postFixServerToken)
      cadviewer.cvjs_setPostFixServerToken(config.postFixServerToken);

    // Location of installation folders
    // NOTE: THE LOCATION OF THE config.ServerLocation/config.ServerUrl VARIABLES ARE DEFINED IN /cadviewer/app/cv/XXXHandlerSettings.js
    //	var config.ServerLocation =
    //	var config.ServerUrl =
    cadviewer.cvjs_CADViewerPro(true);

    // 10.31.9
    if (
      config.setScrollWheelThrottleDelay != undefined &&
      config.setScrollWheelThrottleDelay >= 0
    )
      cadviewer.cvjs_setScrollWheelThrottleDelay(
        config.setScrollWheelThrottleDelay
      );

    // 10.31.10  10.44.4
    if (config.setScrollWheelZoomSteps != undefined)
      cadviewer.cvjs_setScrollWheelZoomSteps(config.setScrollWheelZoomSteps);
    // 10.40.1
    cadviewer.cvjs_setScrollWheelDefaultZoomFactor(
      config.setScrollWheelDefaultZoomFactor
    );

    // 10.26.6 remove setZoomInageWallpaper
    cadviewer.cvjs_setZoomImageWallpaper(false); // set it after layers has been actived, for bpretail
    // 10.40.1
    cadviewer.cvjs_setZoomImageWallpaperControls(
      config.setZoomImageWallpaper_scalefactor,
      config.setZoomImageWallpaper_scalebreakpoint
    );

    // 10.52.4
    //cadviewer.cvjs_suppressActionLooper(true);

    // 10.28.5 - test
    //cadviewer.cvjs_enableMeasurementRedlineObjects(true);

    if (config.suppressPublishPDFModal)
      cadviewer.cvjs_suppressPublishPDFModal(true);

    console.log(
      "cvjs_setPrintModal_PrintPDF: printPDFflag " +
        config.printPDFflag +
        " printAsPDF " +
        config.printAsPDF
    );
    // 9.46.4
    cadviewer.cvjs_setPrintModal_PrintPDF(
      config.printPDFflag,
      config.printAsPDF
    );
    cadviewer.cvjs_selectPaperSize(config.setPaperSize);

    // 10.6.8
    cadviewer.cvjs_setPrintMargins(
      config.printMargins_nonprint_h,
      config.printMargins_nonprint_w,
      config.printMargins_standard_h,
      config.printMargins_standard_w,
      config.printMargins_tiny_h,
      config.printMargins_tiny_w,
      config.printMargins_none_h,
      config.printMargins_none_w
    );

    cadviewer.cvjs_setforeignObjectInRedlineText(
      config.setforeignObjectInRedlineText
    );

    // Pass over the location of the installation, will update the internal paths
    cadviewer.cvjs_PrintToPDFWindowRelativeSize(0.8);
    cadviewer.cvjs_setFileModalEditMode(false);

    //cadviewer.cvjs_setZoomExtentsMode("top");
    cadviewer.cvjs_setUnitForCalibrate(config.setUnitForCalibrate);

    cadviewer.cvjs_setCADViewerInterfaceVersion(8);
    cadviewer.cvjs_setCADViewerSkin(config.setCADViewerSkin); // lightgray, black, deepblue  // method can be omitted, alternative is "deepblue" , "nextcloud"

    cadviewer.cvjs_DisplayCoordinatesMenu(
      canvasPlanId,
      config.DisplayCoordinatesMenu
    );

    // 6.9.18
    // set SpaceObjectsCustomMenu location and json config file,  flag true to display SpaceObject Menu, false to hide
    cadviewer.cvjs_setSpaceObjectsCustomMenu(
      "/content/customInsertSpaceObjectMenu/",
      "cadviewercustomspacecommands.json",
      config.setSpaceObjectsCustomMenu
    );

    // For "Merge DWG" / "Merge PDF" commands, set up the email server to send merged DWG files or merged PDF files with redlines/interactive highlight.
    // See php / xampp documentation on how to prepare your server
    cadviewer.cvjs_emailSettings_PDF_publish(
      "From CAD Server",
      "my_from_address@mydomain.com",
      "my_cc_address@mydomain.com",
      "my_reply_to@mydomain.com"
    );

    // CHANGE LANGUAGE - DEFAULT IS ENGLISH
    cadviewer.cvjs_loadCADViewerLanguage(config.setCADViewerLanguage, "");
    // Available languages:  "English" ; "French, "Korean", "Spanish", "Portuguese", "Chinese-Simplified", "Chinese-Traditional"
    //cadviewer.cvjs_loadCADViewerLanguage("English", "/cadviewer/app/cv/cv-pro/custom_language_table/custom_cadviewerProLanguage.xml");

    // Set Icon Menu Interface controls. Users can:
    // 1: Disable all icon interfaces
    //  cvjs_displayAllInterfaceControls(false, canvasPlanId);  // disable all icons for user control of interface

    // 2: Disable either top menu icon menus or navigation menu, or both

    cadviewer.cvjs_displayTopMenuIconBar(
      config.displayTopMenuIconBar,
      canvasPlanId
    ); // disable top menu icon bar
    cadviewer.cvjs_displayTopNavigationBar(
      config.displayTopNavigationBar,
      canvasPlanId
    ); // disable top navigation bar

    // 3: Users can change the number of top menu icon pages and the content of pages, based on a configuration file in folder /cadviewer/app/cv/cv-pro/menu_config/
    if (config.setTopMenuXMLDirect) {
      // xml menu file as string in config
      cadviewer.cvjs_setTopMenuXMLDirect(
        canvasPlanId,
        config.topMenuXML_config_file
      );
    } else {
      // xml menu file loaded from server
      cadviewer.cvjs_setTopMenuXML(
        canvasPlanId,
        config.topMenuXML,
        config.topMenuXMLpath
      );
      //cadviewer.cvjs_setTopMenuXML(canvasPlanId, "cadviewer_full_commands_01.xml", "/cadviewer/app/cv/cv-pro/menu_config/");
      //cadviewer.cvjs_setTopMenuXML(canvasPlanId, "cadviewer_viewonly_nofileload_01.xml", "/cadviewer/app/cv/cv-pro/menu_config/"); //, "/app/cv/cv-pro/menu_config/");
      // Menu including custom commands row on last page
      //cadviewer.cvjs_setTopMenuXML(canvasPlanId, "cadviewer_menu_all_items_custom_commands.xml", "cadviewer/app/cv/cv-pro/menu_config/");
    }

    // Initialize CADViewer  - needs the div name on the svg element on page that contains CADViewerJS and the location of the
    // main application "app" folder. It can be either absolute or relative

    var BaseAttributes = config.BaseAttributes;
    var HighlightAttributes = config.HighlightAttributes;
    var SelectAttributes = config.SelectAttributes;

    // window.alert(JSON.stringify(BaseAttributes));

    /** FIXED POP-UP MODAL **/
    // THIS IS THE DESIGN OF THE pop-up MODAL WHEN CLICKING ON SPACES
    // KEEP METHODS NAME AS IS FOR NOW...............

    var my_cvjsPopUpBody =
      "<div class='cvjs_modal_1' id='my_own_clickmenu1()'>Custom<br>Menu 1<br><i class='fa fa-undo'></i></div>";
    my_cvjsPopUpBody +=
      "<div class='cvjs_modal_1' id='my_own_clickmenu2()'>Custom<br>Menu 2<br><i class='fa fa-info-circle'></i></div>";
    my_cvjsPopUpBody +=
      "<div class='cvjs_modal_1' id='cvjs_zoomHere_PopUp()'>Zoom<br>Here<br><i class='fa fa-search-plus'></i></div>";

    // custom development of call-back modal  - UNCOMMENT TWO CODE LINES BELOW
    //      Setting Space Object Modals Display to be based on a callback method -

    my_cvjsPopUpBody = "";
    cadviewer.cvjs_setCallbackForModalDisplay(
      true,
      myCustomPopUpBody,
      populateMyCustomPopUpBody
    );

    //      cadviewer.cvjs_InitCADViewer_app(canvasPlanId, "/assets/cadviewer/app/", "/assets/cadviewer/app/");

    cadviewer.cvjs_InitCADViewer_highLight_popUp_app(
      canvasPlanId,
      "/assets/cadviewer/app/",
      BaseAttributes,
      HighlightAttributes,
      SelectAttributes,
      my_cvjsPopUpBody
    );
    // note second path parameter internally overwritten in case of npm install

    // set the location to license key, typically the js folder in main app application folder ../app/cv/
    //cadviewer.cvjs_setLicenseKeyPath("/cadviewer/app/cv/");
    // alternatively, set the key directly, by pasting in the cvKey portion of the cvlicense.js file, note the JSON \" around all entities

    cadviewer.cvjs_setLicenseKeyDirect(
      '{ "cvKey": "' + config.cadviewerLicenseKey + '" }'
    );

    // Sets the icon interface for viewing, layerhanding, measurement, etc. only
    //cvjs_setIconInterfaceControls_ViewingOnly();

    // disable canvas interface.  For developers building their own interface
    // cvjs_setIconInterfaceControls_DisableIcons(true);

    // 10.38.7
    if (
      config.setScrollWheelDefaultZoomFactor != undefined &&
      config.setScrollWheelDefaultZoomFactor >= 0
    ) {
      cadviewer.cvjs_setScrollWheelDefaultZoomFactor(
        config.setScrollWheelDefaultZoomFactor
      );
    }

    cadviewer.cvjs_allowFileLoadToServer(true);

    //		cvjs_setUrl_singleDoubleClick(1);
    //		cvjs_encapsulateUrl_callback(true);

    // NOTE BELOW: THESE SETTINGS ARE FOR SERVER CONTROLS FOR UPLOAD OF REDLINES

    // NOTE BELOW: THESE SETTINGS ARE FOR SERVER CONTROLS FOR UPLOAD OF REDLINES, FILES, SPACE OBJECTS
    cadviewer.cvjs_setServerFileLocation_AbsolutePaths(
      config.ServerLocation + "/content/drawings/dwg/",
      config.ServerBackEndUrl + "content/drawings/dwg/",
      "",
      ""
    );
    cadviewer.cvjs_setRedlinesAbsolutePath(
      config.ServerBackEndUrl + "/content/redlines/v7/",
      config.ServerLocation + "/content/redlines/v7/",
      config.setRedlineDynamicPath
    );
    cadviewer.cvjs_setSpaceObjectsAbsolutePath(
      config.ServerBackEndUrl + "/content/spaceObjects/",
      config.ServerLocation + "/content/spaceObjects/",
      config.setSpaceObjectDynamicPath
    );
    cadviewer.cvjs_setInsertImageObjectsAbsolutePath(
      config.ServerBackEndUrl + "/content/inserted_image_objects/",
      config.ServerLocation + "/content/inserted_image_objects/",
      config.setInsertImageObjectDynamicPath
    );

    // SETTINGS of standard modal without e-mail for screen to PDF file
    cadviewer.cvjs_saveScreenAsPDF_serverSettings(
      false,
      "",
      "",
      "Standard",
      true,
      false,
      false
    );

    // set the space object default style object

    var cvjs_defaultSpaceObjectColor = {
      fill: "#7FFFD4",
      "fill-opacity": "0.3", // fill opacity set to 0.3
      stroke: "#097969",
      "stroke-width": "2",
      "stroke-linejoin": "round",
    };

    cadviewer.cvjs_setDefaulSpaceObjectColor(cvjs_defaultSpaceObjectColor);

    // SETTNGS OF CONVERSION PARAMETERS

    cadviewer.cvjs_conversion_clearAXconversionParameters();

    /* push all conversion parameters as a single json object */
    var axparameters = {};
    var parameters = [];
    axparameters.parameters = parameters;
    //		axparameters.parameters.push({ paramName: "layout", paramValue: "mylayout" });

    for (var i = 0; i < config.conversionParameters.length; i++) {
      axparameters.parameters.push({
        paramName: config.conversionParameters[i].param,
        paramValue: config.conversionParameters[i].value,
      });
    }

    /*
		axparameters.parameters.push({ paramName: "TL", paramValue: "RM_TXT" });
		axparameters.parameters.push({ paramName: "LA", paramValue: "" });
		axparameters.parameters.push({ paramName: "model", paramValue: "" });
//		axparameters.parameters.push({ paramName: "lastsavedview", paramValue: "" });
		axparameters.parameters.push({ paramName: "trace", paramValue: "" });
*/

    console.log(JSON.stringify(axparameters));
    cadviewer.cvjs_conversion_addAXconversionParameters(axparameters);

    _handleWindowResize();
    setIsMounted(true);
  }, [
    _handleWindowResize,
    cvjs_OnLoadEnd,
    cvjs_graphicalObjectOnChange,
    canvasPlanId,
    setTabIndex,
    myCustomPopUpBody,
  ]);

  // when plansInfo changes, update myCustomPopUpBody binding
  useEffect(() => {
    cadviewer.cvjs_setCallbackForModalDisplay(
      true,
      myCustomPopUpBody,
      populateMyCustomPopUpBody
    );
  }, [plansInfo, myCustomPopUpBody, populateMyCustomPopUpBody]);

  useEffect(() => {
    window.addEventListener("resize", _handleWindowResize);

    return () => {
      window.removeEventListener("resize", _handleWindowResize);
    };
  }, [_handleWindowResize]);

  useEffect(() => {
    console.log({ isMounted: isMounted });
    if (!isMounted) {
      mountCanvas();
    }
  }, [mountCanvas, isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (config.initFileName === "" || bpretailSourceFile) {
        console.log("initFileName is empty, we do not load a drawing.");
      } else {
        cadviewer.cvjs_setZoomImageWallpaper(false); // 10.30.2
        cadviewer.cvjs_LoadDrawing(canvasPlanId, FileName);
        setCurrentDrawingPath(FileName);
        console.log("cadviewer.cvjs_LoadDrawing");
      }
    }
  }, [isMounted, bpretailSourceFile]);

  // when drawing change reset onloadend callback method
  useEffect(() => {
    cadviewer.cvjs_setCallbackMethod("cvjs_OnLoadEnd", cvjs_OnLoadEnd);
  }, [currentDrawingPath]);

  return (
    <div className="h-full w-full CADViewer relative" ref={setDivRef}>
      <div
        id={canvasPlanId}
        className="cadviewer-bootstrap cadviewer-core-styles h-full w-full relative overflow-hidden"
      />
      <div
        className={`z-40 absolute flex bottom-3  right-3  gap-2 ${
          config.cadViewerBrandLogoPosition === "right_center"
            ? (config.cadViewerBrandLogoSize === "small" ? "h-9" : "h-7") +
              " justify-end items-center top-0 mb-auto mt-auto flex-col"
            : "justify-center items-end left-3 flex-row"
        }`}
      >
        <Tooltip
          text={"CADViewer.com"}
          className={"!left-1/2 !-translate-x-full"}
        >
          <a href={"https://cadviewer.com"} target="_blank" rel="noreferrer">
            <img
              src={
                config.cadViewerBrandLogoSize === "small"
                  ? "/CADViewer_Submark.svg"
                  : "/CADViewer_Submark.svg" /* /cv-logo.gif */
              }
              alt="CADViewer Logo"
              className={`${
                config.cadViewerBrandLogoSize === "small" ? "h-8" : "h-6"
              }`}
              style={{ opacity: config.cadViewerBrandLogoOpacity / 100 }}
            />
          </a>
        </Tooltip>
        {config.informationTourButton && (
          <Tooltip
            text={"Open Information Tour"}
            className={"!left-1/2 !-translate-x-full"}
          >
            <button
              className="bg-primary-500 rounded-full text-white size-8 flex justify-center items-center"
              onClick={() => setIsOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export { current_selected_handle, handle_selector, selected_handles };
export default CADViewer;
