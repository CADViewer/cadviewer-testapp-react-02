import cadviewer from "cadviewer";
import { useCallback, useContext, useState } from "react";
import { CadviewerContext } from "../../../context/Cadviewer.Context";
import config from "../../../utils/config";

// SET TO TRUE TO USE THE CALLBACKS
var callbackisactive = false; // callback is active flag

export function callback_is_active() {
  return callbackisactive;
}

export function myCustomPopUpBody(rmid: any) {
  return internalcallback02(rmid);
}

export function graphicalObjectOnChange(
  type: any,
  graphicalObject: any,
  spaceID: any,
  evt: any
) {
  console.log(
    "SpaceAreaMethods - graphicalObjectOnChange" +
      type +
      "  " +
      graphicalObject +
      "  " +
      spaceID +
      "  " +
      evt
  );

  if (callbackisactive) internalcallback01(type, graphicalObject, spaceID, evt);
}

export function cvjs_click(
  id: any,
  handle: any,
  entity: any,
  path: any,
  xpos: any,
  ypos: any
) {
  internalcallback05(id, handle, entity, path, xpos, ypos);
}

export function cvjs_QuickCountCallback(count: number) {
  window.alert("SpaceAreaMethods - Quick Count: " + count);
}

export function my_own_clickmenu1() {
  internalcallback03();
}

export function my_own_clickmenu2() {
  internalcallback04();
}

// wood
var highlight_green = {
  fill: "#32CD32", // 0dff8a
  "fill-opacity": 0.7,
  stroke: "#228B22", // 0dff8a green
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

// stone
var highlight_blue = {
  fill: "#0c8dff",
  "fill-opacity": 0.4,
  stroke: "#003366", // midnight blue 003366 ,    #0c8dff
  "stroke-width": 3.0,
  "stroke-opacity": 1.0,
  "stroke-linejoin": "round",
};

// carpet
var highlight_purple = {
  fill: "#ff00dd",
  "fill-opacity": 0.4,
  stroke: "#800080", //  purple          #ff00dd
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_yellow = {
  fill: "#fafa00", //  #FFFCBB yellow
  "fill-opacity": 0.4,
  stroke: "#FFD300", //  orange
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_bordeau_red_borders = {
  fill: "#fff",
  "fill-opacity": 0.01,
  stroke: "#8B0000", // #8B0000   #fa8072    // red
  "stroke-width": 4.0, //
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_brown_nofill = {
  //    fill: '#964B00',
  //    "fill-opacity": 0.4,
  stroke: "#964B00",
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_brown = {
  fill: "#964B00",
  "fill-opacity": 0.4,
  stroke: "#964B00",
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_red_nofill = {
  //    fill: 'FF0000',
  //    "fill-opacity": 0.4,
  stroke: "FF0000",
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_red = {
  fill: "FF0000",
  "fill-opacity": 0.4,
  stroke: "FF0000",
  "stroke-width": 3.0,
  "stroke-opacity": 1,
  "stroke-linejoin": "round",
};

var highlight_blue_nofill = {
  //    fill: '#0c8dff',
  //    'fill-opacity': 0.4,
  stroke: "#003366", // midnight blue 003366 ,    #0c8dff
  "stroke-width": 3.0,
  "stroke-opacity": 1.0,
  "stroke-linejoin": "round",
};

var highlight_blue = {
  fill: "#0c8dff",
  "fill-opacity": 0.4,
  stroke: "#003366", // midnight blue 003366 ,    #0c8dff
  "stroke-width": 3.0,
  "stroke-opacity": 1.0,
  "stroke-linejoin": "round",
};

var setFloorType = "hardwood";
var setFloorStyle = "Green";
var lastusedUnit = "m2";

var JSONSpaceObjects: any[] = []; // general storage for space objects

var myareaObjects: any[] = [];

var JSONRedlineObjects: never[] = []; // general storage for redline objects

// callback function for the space area methods
function internalcallback01(
  type: any,
  graphicalObject: any,
  spaceID: any,
  evt: any
) {
  console.log(
    "SpaceAreaMethods - graphicalObjectOnChange" +
      type +
      "  " +
      graphicalObject +
      "  " +
      spaceID +
      "  " +
      evt
  );

  if (
    type == "Create" &&
    graphicalObject.toLowerCase().indexOf("spaceobject") > -1
  ) {
    var myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
    console.log("This Object " + spaceID + " has Parent: " + myobject.parent);
    lastusedUnit = myobject.unit + "2";

    if (
      window.confirm(
        "This is a " +
          myobject.type +
          " floor part (" +
          setFloorStyle +
          ") with area: " +
          myobject.area +
          " " +
          lastusedUnit +
          ". Add to measurement?"
      )
    ) {
      console.log("add object: " + spaceID + "  " + myobject.type);

      var customContent = '{"flooring":"' + myobject.type + '"}';

      if (myobject.type == "hardwood") {
        cadviewer.cvjs_highlightSpace(spaceID, highlight_green);
        cadviewer.cvjs_setSpaceObjectCustomContent(spaceID, customContent);
      }

      if (myobject.type == "stone") {
        cadviewer.cvjs_highlightSpace(spaceID, highlight_blue);
        cadviewer.cvjs_setSpaceObjectCustomContent(spaceID, customContent);
      }
      if (myobject.type == "carpet") {
        cadviewer.cvjs_highlightSpace(spaceID, highlight_purple);
        cadviewer.cvjs_setSpaceObjectCustomContent(spaceID, customContent);
      }

      return;
    } else {
      console.log("delete object: " + spaceID);

      cadviewer.cvjs_deleteSpaceObjectDirect("floorPlan", spaceID);

      return;
    }
  }
}

var popupCustomMenu1 = "Show All<br>Areas<br>";
var popupCustomFontAwesomeIcon1 = "fa fa-info-circle";
var popupCustomMenu2 = "Undo This<br>Area<br>";
var popupCustomFontAwesomeIcon2 = "fa fa-undo";

// myCustomPopUpBody
function internalcallback02(rmid: any) {
  console.log(
    "SpaceArea Methods  myCustomPopUpBody callback 1: " +
      rmid +
      " I now change the pop-up menu:"
  );

  var my_cvjsPopUpBody =
    '<div  class="cvjs_modal_1" id="my_own_clickmenu1()">' +
    popupCustomMenu1 +
    "<i class='" +
    popupCustomFontAwesomeIcon1 +
    "'></i></div>";
  my_cvjsPopUpBody +=
    '<div class="cvjs_modal_1" id="my_own_clickmenu2()">' +
    popupCustomMenu2 +
    "<i class='" +
    popupCustomFontAwesomeIcon2 +
    "'></i></div>";
  my_cvjsPopUpBody +=
    '<div class="cvjs_modal_1" id="cvjs_zoomHere_PopUp()">Zoom<br>Here<br><i class=\'fa fa-search-plus\'></i></div>';

  return my_cvjsPopUpBody;
}

// my_own_clickmenu1
function internalcallback03() {
  var JSONspaceOject = cadviewer.cvjs_returnAllSpaceObjects();
  var totalAreaWood = 0;
  var totalAreaCarpet = 0;
  var totalAreaStone = 0;

  for (var i = 0; i < JSONspaceOject.SpaceObjects.length; i++) {
    var myobject = JSONspaceOject.SpaceObjects[i];

    if (myobject.type == "hardwood") totalAreaWood += parseFloat(myobject.area);

    if (myobject.type == "stone") totalAreaStone += parseFloat(myobject.area);

    if (myobject.type == "carpet") totalAreaCarpet += parseFloat(myobject.area);
  }

  if (config.CADViewerPublicDemo)
    window.alert(
      "This custom modal links to your custom methods, so for example you can calculate all kind of stuff, for example the total flooring of the floorplan...  In the public demo, this is disabled:\n\nTotal floor areas: \nHardwood: " +
        "A" +
        " " +
        lastusedUnit +
        " \nCarpet: " +
        "B" +
        " " +
        lastusedUnit +
        "\nStone: " +
        "C" +
        " " +
        lastusedUnit
    );
  else
    window.alert(
      "Total floor areas: \nHardwood: " +
        totalAreaWood +
        " " +
        lastusedUnit +
        " \nCarpet: " +
        totalAreaCarpet +
        " " +
        lastusedUnit +
        "\nStone: " +
        totalAreaStone +
        " " +
        lastusedUnit
    );

  // show all areas

  /*
    var id = cadviewer.cvjs_idObjectClicked();
        window.alert(
            "Custom menu item SpaceAreaMethods  1: Here developers can implement their own methods, the look and feel of the menu is controlled in the settings.  Clicked object ID is: " +
                id
        );
*/
}

// my_own_clickmenu2
function internalcallback04() {
  if (config.CADViewerPublicDemo) {
    window.alert(
      "This custom modal links to your custom methods, so for example you can delete areas, or do other stuff. In the public demo, this is disabled."
    );
    return;
  }

  var spaceId = cadviewer.cvjs_idObjectClicked();
  var myobject = cadviewer.cvjs_returnSpaceObjectID(spaceId);
  // check if null
  if (myobject == null) {
    console.log("Space Object not found");
    // try to find by it's name
    var id = cadviewer.cvjs_getSpaceObjectIdfromName(spaceId);
    console.log("Id= " + id);
    if (id == -1) {
      window.alert("Space Object not found by id or name");
      return;
    } else {
      spaceId = id;
      myobject = cadviewer.cvjs_returnSpaceObjectID(id);
    }
  }

  // we delete the space object
  //window.alert("after check´:"+myobject);
  console.log("Delete Area: " + spaceId + "  " + myobject.area);

  // delete the space aread object

  cadviewer.cvjs_deleteSpaceObjectDirect("floorPlan", spaceId);

  /*

        window.alert(
            "Custom menu item SpaceAreaMethods  2: Here developers can implement their own methods, the look and feel of the menu is controlled in the settings.  Clicked object ID is: " +
                id
        );

    */
}

function internalcallback05(
  id: any,
  handle: any,
  entity: any,
  path: any,
  xpos: any,
  ypos: any
) {
  console.log(
    "SpaceAreaMethods - cvjs_click: " +
      id +
      "  " +
      handle +
      "  " +
      entity +
      "  " +
      path +
      "  " +
      xpos +
      "  " +
      ypos
  );
  var redline_id = cadviewer.cvjs_handleToRedlinePolyLine(id);
  console.log("redline_id: " + redline_id);
  cadviewer.cvjs_styleRedline(redline_id, highlight_brown_nofill);

  // 10.17.6
  var layer = cadviewer.cvjs_layerNamefromObjectID(id);
  window.alert(layer);
  cadviewer.cvjs_colorSingleLayer("floorPlan", "#0F0", layer); // color the layer red
}

function set_print_resolution() {
  cadviewer.cvjs_setPrintOrientation("landscape");

  cadviewer.cvjs_setPrintPaperSize("A2");
  //    cvjs_setPrintResolutionDpi(300);
  cadviewer.cvjs_setPrintResolutionDpi(600);

  window.alert("done  - tabloid 600 dpi");
}

export const SpaceAreaMethods = () => {
  const { handleSelector, setHandleSelector, currentCanvasInstance } =
    useContext(CadviewerContext);

  // change state of the floor type and style

  const [selectedOption, setSelectedOption] = useState("0");
  const handleSelectChange = (event: any) => {
    console.log("handleSelectChange: " + event.target.value);

    setSelectedOption(event.target.value);

    if (event.target.value == "0") {
      setFloorType = "hardwood";
      setFloorStyle = "Green";
    }

    if (event.target.value == "1") {
      setFloorType = "stone";
      setFloorStyle = "Blue";
    }

    if (event.target.value == "2") {
      setFloorType = "carpet";
      setFloorStyle = "Purple";
    }
  };

  const [selectedOptionRed, setSelectedOptionRed] = useState("0");
  const handleSelectChangeRed = (event: any) => {
    console.log("handleSelectChangeRed: " + event.target.value);

    setSelectedOptionRed(event.target.value);

    var redId = (document.getElementById("spaceId") as HTMLInputElement).value;

    console.log("redId: " + redId);

    if (Number(redId) > -1) {
      var redlinestyle = cadviewer.cvjs_getRedlineStyles(redId);

      var fillOpacity = "fill-opacity";
      //let fillOpacity = style[fieldName];

      //window.alert("Redline Style: "+JSON.stringify(redlinestyle));

      if (event.target.value == "0") {
        // get the ID of the redline
        // style it red
        if (redlinestyle[fillOpacity] == "0.01")
          cadviewer.cvjs_styleRedline(redId, highlight_red_nofill);
        else cadviewer.cvjs_styleRedline(redId, highlight_red);
      }

      if (event.target.value == "1") {
        // get the ID of the redline

        if (redlinestyle[fillOpacity] == "0.01")
          cadviewer.cvjs_styleRedline(redId, highlight_blue_nofill);
        else cadviewer.cvjs_styleRedline(redId, highlight_blue);
      }

      if (event.target.value == "2") {
        // get the ID of the redline

        //                var fillopacity=   jQuery("#cv_RED_"+redId).css('fill-opacity');
        //                var fill=   jQuery("#cv_RED_"+redId).css('fill');
        //                window.alert("fill: "+fill+"  fillopacity: "+fillopacity);

        if (redlinestyle[fillOpacity] == "0.01")
          cadviewer.cvjs_styleRedline(redId, highlight_brown_nofill);
        else cadviewer.cvjs_styleRedline(redId, highlight_brown);
      }
    } else {
      window.alert("No redline selected");
    }
  };

  // use current canvas instance !!!!

  /////////  CANVAS CONTROL METHODS START

  ///  HERE ARE ALL THE CUSTOM TEMPLATES TO DO STUFF ON THE CANVAS

  var generic_canvas_flag_first_click_rectangle = false;
  var generic_canvas_flag_rectangle = false;
  var tPath_r = "";
  var cvjs_RubberBand: any;
  var cvjs_firstX = 0;
  var cvjs_firstY = 0;
  var cvjs_lastX = 0;
  var cvjs_lastY = 0;

  var selected_handles: any; // this is just to show that you can have multiple handles
  var handle_selector = false;
  var current_selected_handle = "";

  const spaceAreaMethod01A = useCallback(() => {
    var currentobjects = cadviewer.cvjs_returnAllSpaceObjects();
    console.log("Current Space Objects: " + JSON.stringify(currentobjects));
    //var objectcounter = currentobjects.SpaceObjects.length+1;  // we give it an index one higher than the current number of objects

    var objectcounter = cadviewer.cvjs_currentMaxSpaceNodeId() + 1; // we find the highest index and add one
    console.log(objectcounter);

    var floor_id = "w_" + objectcounter; // we default to hardwood floor

    if (setFloorType == "hardwood") {
      floor_id = "w_" + objectcounter;
    }
    if (setFloorType == "stone") {
      floor_id = "s_" + objectcounter;
    }
    if (setFloorType == "carpet") {
      floor_id = "c_" + objectcounter;
    }

    cadviewer.cvjs_addSpaceObjectRectangle(
      "floorPlan",
      floor_id,
      setFloorType,
      setFloorType + "_" + objectcounter,
      "AreaLayer"
    );
  }, [currentCanvasInstance]);

  const spaceAreaMethod02A = useCallback(() => {
    var currentobjects = cadviewer.cvjs_returnAllSpaceObjects();
    console.log("Current Space Objects: " + JSON.stringify(currentobjects));
    var objectcounter = currentobjects.SpaceObjects.length + 1; // we give it an index one higher than the current number of objects
    console.log(objectcounter);

    var floor_id = "w_" + objectcounter; // we default to hardwood floor

    if (setFloorType == "hardwood") {
      floor_id = "w_" + objectcounter;
    }
    if (setFloorType == "stone") {
      floor_id = "s_" + objectcounter;
    }
    if (setFloorType == "carpet") {
      floor_id = "c_" + objectcounter;
    }

    cadviewer.cvjs_addSpaceObjectPolygon(
      "floorPlan",
      floor_id,
      setFloorType,
      setFloorType + "_" + objectcounter,
      "AreaLayer"
    );
  }, [currentCanvasInstance]);

  const spaceAreaMethod08A = useCallback(() => {
    console.log("Reset areas, delete spaces");

    // delete all redlines
    cadviewer.cvjs_clearSpaceObjects(currentCanvasInstance as string);

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const spaceAreaMethod05 = useCallback(() => {
    var spaceId = (document.getElementById("spaceId") as HTMLInputElement)
      .value;
    var myobject = cadviewer.cvjs_returnSpaceObjectID(spaceId);
    // check if null
    if (myobject == null) {
      console.log("Space Object not found");
      // try to find by it's name
      var id = cadviewer.cvjs_getSpaceObjectIdfromName(spaceId);
      console.log("Id= " + id);
      if (id == -1) {
        window.alert("Space Object not found by id or name");
        return;
      } else {
        spaceId = id;
        myobject = cadviewer.cvjs_returnSpaceObjectID(id);
      }
    }

    var floorType = "";
    for (var spaceobject in myareaObjects) {
      //window.alert(myareaObjects[redline].id+"   "+redId);
      if (myareaObjects[spaceobject].id == spaceId) {
        floorType = myareaObjects[spaceobject].type;
      }
    }

    window.alert(
      "Area is:" +
        myobject.area +
        " " +
        myobject.unit +
        "2\nFloor Type: " +
        myobject.type
    );

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const spaceAreaMethod06 = useCallback(() => {
    console.log(
      "Return JSON with all SPACES is now stored in JSONSpaceObjects array"
    );

    // general callback
    JSONSpaceObjects = cadviewer.cvjs_returnAllSpaceObjects();

    // this is our new
    var thisJSONSpaceObjects = cadviewer.cvjs_returnAllSpaceObjects();

    for (var i = 0; i < thisJSONSpaceObjects["SpaceObjects"].length; i++) {
      console.log(
        "SpaceObject: " +
          thisJSONSpaceObjects.SpaceObjects[i].id +
          "  " +
          thisJSONSpaceObjects.SpaceObjects[i].type +
          "  " +
          thisJSONSpaceObjects.SpaceObjects[i].name
      );
    }

    //console.log("JSONSpaceObjects: "+JSON.stringify(JSONSpaceObjects));

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const spaceAreaMethod07 = useCallback(() => {
    cadviewer.cvjs_setSpaceObjectsStructureDirect(
      currentCanvasInstance as string,
      JSON.stringify(JSONSpaceObjects)
    );

    window.alert("Insert JSONSpaceObjects JSON with SPACES");

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const redlineAreaMethod06 = useCallback(() => {
    window.alert("Return JSON with all REDLINE OBJECTS");

    JSONRedlineObjects = cadviewer.cvjs_returnAllRedlineObjects();

    console.log("red: " + JSON.stringify(JSONRedlineObjects));
  }, [currentCanvasInstance]);

  const redlineAreaMethod07 = useCallback(() => {
    console.log("Insert JSON with all REDLINE OBJECTS");

    // insert all redline objects
    cadviewer.cvjs_setAllRedlineObjects(JSONRedlineObjects, true); // true means delete all redlines before inserting
  }, [currentCanvasInstance]);

  /*

const internalCallback01 = useCallback((type: any, graphicalObject: any, spaceID: any, evt: any) => {


    window.alert("Insert JSON with SPACES");



    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);

*/

  const spaceAreaMethod09 = useCallback(() => {
    var JSONspaceOject = cadviewer.cvjs_returnAllSpaceObjects();

    var totalAreaWood = 0;
    var totalAreaCarpet = 0;
    var totalAreaStone = 0;

    for (var i = 0; i < JSONspaceOject.SpaceObjects.length; i++) {
      var myobject = JSONspaceOject.SpaceObjects[i];

      if (myobject.type == "hardwood")
        totalAreaWood += parseFloat(myobject.area);

      if (myobject.type == "stone") totalAreaStone += parseFloat(myobject.area);

      if (myobject.type == "carpet")
        totalAreaCarpet += parseFloat(myobject.area);
    }

    window.alert(
      "Total floor areas: \nHardwood: " +
        totalAreaWood +
        " " +
        lastusedUnit +
        " \nCarpet: " +
        totalAreaCarpet +
        " " +
        lastusedUnit +
        "\nStone: " +
        totalAreaStone +
        " " +
        lastusedUnit
    );

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const spaceAreaMethod10 = useCallback(() => {
    cadviewer.cvjs_calibrateMeasurement(currentCanvasInstance as string);

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const spaceAreaMethod11 = useCallback(() => {
    var spaceId = (document.getElementById("spaceId") as HTMLInputElement)
      .value;
    var myobject = cadviewer.cvjs_returnSpaceObjectID(spaceId);
    // check if null
    if (myobject == null) {
      console.log("Space Object not found");
      // try to find by it's name
      var id = cadviewer.cvjs_getSpaceObjectIdfromName(spaceId);
      console.log("Id= " + id);
      if (id == -1) {
        window.alert("Space Object not found by id or name");
        return;
      } else {
        spaceId = id;
        myobject = cadviewer.cvjs_returnSpaceObjectID(id);
      }
    }

    // we delete the space object
    //window.alert("after check´:"+myobject);
    console.log("Delete Area: " + spaceId + "  " + myobject.area);

    // delete the space aread object

    cadviewer.cvjs_deleteSpaceObjectDirect(
      currentCanvasInstance as string,
      spaceId
    );

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);
  }, [currentCanvasInstance]);

  const enable_disable_handles = useCallback(
    (action: string) => () => {
      if (action == "enable") {
        handle_selector = true;
        cadviewer.cvjs_processHandleObjects();
        cadviewer.cvjs_handleObjectsParceBlocks(false);
      }

      if (action == "disable") {
        handle_selector = false;
        cadviewer.cvjs_removeHandleObjects();
        cadviewer.cvjs_handleObjectsParceBlocks(true);
      }
    },
    [currentCanvasInstance]
  );

  const color_black = useCallback(() => {
    var layerColorsOnLoad = [
      { layer: "0", color: "#000" },
      { layer: "HIDDEN", color: "#000" },
      { layer: "Border", color: "#000" },
      { layer: "Title BLock", color: "#000" },
      { layer: "TEXT", color: "#000" },
      { layer: "PIPE2", color: "#000" },
      { layer: "EQUIP", color: "#000" },
      { layer: "PIPE", color: "#000" },
      { layer: "INST", color: "#000" },
      { layer: "ELECT2", color: "#000" },
      { layer: "HIDDEN", color: "#000" },
    ];

    // color layers
    for (var i = 0; i < layerColorsOnLoad.length; i++) {
      var layer = layerColorsOnLoad[i];
      console.log("layer:" + layer.layer + " color:" + layer.color);
      cadviewer.cvjs_colorSingleLayer("FloorPlan", layer.color, layer.layer);
    }
  }, [currentCanvasInstance]);

  const showhide_polygonpoints = useCallback(
    (action: string) => () => {
      var id = (document.getElementById("spaceId") as HTMLInputElement).value;

      window.alert(
        "showhide_polygonpoints: " +
          id +
          " action: " +
          action +
          " redline" +
          (currentCanvasInstance as string)
      );

      var controlPointsStyleObject = {
        fill: "#0000FF",
        stroke: "#00FF00",
        opacity: "0.9",
        radiusFactor: 1,
      };

      cadviewer.cvjs_polygonControlsPointsStyle(controlPointsStyleObject);

      cadviewer.cvjs_displayPolygonControlsPoint(
        currentCanvasInstance as string,
        id as string,
        action,
        "redline"
      ); // "hide"
    },
    [currentCanvasInstance]
  );

  const [selectedValue, setSelectedValue] = useState("Option 1");

  const exit_quickcount = useCallback(() => {
    cadviewer.cvjs_exitQuickCount(currentCanvasInstance as string);

    //Using useState to set the defualt value of DropDown Menu and declare the values
  }, [currentCanvasInstance]);

  /*
function setSelectedValue(event: any) {

    window.alert("setse: "+selectedValue);
}
*/

  const DropdownList = useCallback(() => {
    window.alert("DropdownList: " + selectedValue);

    //Using useState to set the defualt value of DropDown Menu and declare the values
  }, [currentCanvasInstance]);

  /*

function DropdownList() { 


    window.alert("DropdownList: "+selectedValue);


    //Using useState to set the defualt value of DropDown Menu and declare the values
//    const handleChange = (event: any) => {
//     setSelectedValue(event.target.value);
//     };
    
    
};

*/

  const testfindtext = useCallback(() => {
    window.alert(JSON.stringify(cadviewer.cvjs_findAllTextInstances()));

    cadviewer.cvjs_setPublishPDFfilename(
      currentCanvasInstance as string,
      "this_is_my_new_pdf.pdf"
    );
  }, [currentCanvasInstance]);

  const getlayerstatus = useCallback(() => {
    var layerTable = cadviewer.cvjs_getLayerTable(
      currentCanvasInstance as string
    );

    for (var i = 0; i < layerTable.numberOfLayers; i++) {
      console.log(
        "Layer:" +
          layerTable.layers[i].layerName +
          " State:" +
          layerTable.layers[i].status
      );
    }

    cadviewer.cvjs_setViewBox(
      currentCanvasInstance as string,
      600,
      600,
      200,
      200
    );
  }, [currentCanvasInstance]);

  const clearDrawing = useCallback(() => {
    cadviewer.cvjs_ClearDrawing(currentCanvasInstance as string);
  }, [currentCanvasInstance]);

  const LoadDrawing = useCallback(() => {
    var FileName =
      "http://localhost:3000" + "/content/custom/bpretail/4386-SP1.svg";

    var FileName = "http://localhost:3000" + "/content/drawings/dwg/hq17_.dwg";

    var FileName =
      "http://localhost:3000" + "/content/custom/bpretail/2352-LP1.svg";

    var FileName =
      "http://localhost:3000" + "/content/custom/bpretail/3442-LP2.svg";

    cadviewer.cvjs_LoadDrawing(currentCanvasInstance as string, FileName);
  }, [currentCanvasInstance]);

  const pdfreporttest = useCallback(() => {
    window.alert("myPDFreport");

    var ServerBackEndUrl = "http://localhost:3000";

    var layerSettings = "all";

    // check drawings
    var fileList = [
      ServerBackEndUrl + "/content/drawings/dwg/1st floor architectural.dwg",
      ServerBackEndUrl + "/content/drawings/dwg/hq17_.dwg",
    ];

    // bpretail
    //    var fileList = [ServerBackEndUrl + "/content/custom/bpretail/zthcvtest.blob.core.windows.net/svg/3442-LP1.svg", ServerBackEndUrl + "/content/custom/bpretail/zthcvtest.blob.core.windows.net/svg/3795-LP1.svg"];

    var fileList = [
      ServerBackEndUrl +
        "/content/custom/bpretail/zthcvtest.blob.core.windows.net/svg/3442-LP1.svg",
      ServerBackEndUrl +
        "/content/custom/bpretail/zthcvtest.blob.core.windows.net/svg/3442-LP2.svg",
    ];

    // The SoNo Collection
    var FileUrl = "https://zthcvtest.blob.core.windows.net/test-cadviewer/svg";
    var fileList = [
      FileUrl + "/retail/2344-LP1.svg",
      FileUrl + "/retail/2344-LP2.svg",
      FileUrl + "/retail/2344-LP3.svg",
      FileUrl + "/retail/2344-LPB1.svg",
      FileUrl + "/retail/2344-LPB2.svg",
      FileUrl + "/retail/2344-LPSL.svg",
      FileUrl + "/retail/2344-LPSM.svg",
    ];

    //var fileList = [ServerBackEndUrl + "/content/drawings/dwg/1st floor architectural.dwg"];

    //window.alert(fileList);

    //    var resolution = 600;
    //    var papersize = "tabloid";   // letter

    var resolution = 400;
    var papersize = "letter"; // letter

    var layerSettings = ""; // for non-brookfield, we want a JSON with layers on/off, to be specified

    var currentView = "Sales Productivity";

    var currentView = "Occupancy Cost";

    var currentView = "Total Rent PSF";

    var layerColorsOnLoad = [
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
    ];

    var lineweightfactor = 1.0;

    //cadviewer.cvjs_publishMultiPagePDF("floorPlan", layerSettings, layerViewsJSON, currentView, layerColorsOnLoad, fileList, resolution, papersize, lineweightfactor, "myPDFreport_npm.pdf");
  }, [currentCanvasInstance]);

  var layerViewsJSON = {
    data: [
      {
        displayOrder: 1,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-STANDARD-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-STANDARD-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Standard Plan",
      },
      {
        displayOrder: 2,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-SALES-PRODUCTIVITY-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-SALES-PRODUCTIVITY-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Sales Productivity",
      },
      {
        displayOrder: 3,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-OCCUPANCY-COST-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-OCCUPANCY-COST-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Occupancy Cost",
      },
      {
        displayOrder: 4,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-TOTAL-RENT-PSF-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-TOTAL-RENT-PSF-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Total Rent PSF",
      },
      {
        displayOrder: 5,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Base Plan",
      },
      {
        displayOrder: 6,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-COMMON-AREA-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-COMMON-AREA-PLAN",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-DEEP-DIVE-LEASE-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Common Area",
      },
      {
        displayOrder: 7,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-DEEP-DIVE-LEASE-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-DEEP-DIVE-LEASE-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Deep Dive Lease Pl",
      },
      {
        displayOrder: 8,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-STATUS-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Status Plan",
      },
      {
        displayOrder: 9,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "VIEW-KIOSK-STANDARD-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "KIOSK-NAME",
            layerState: "On",
          },
          {
            layer: "KIOSK-SF",
            layerState: "On",
          },
          {
            layer: "KIOSK-SPNO",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "BD-WET-KIOSKS",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-KIOSK-STANDARD-PLAN",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "KIOSK-LEASELINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Kiosks",
      },
      {
        displayOrder: 10,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-KIOSK-ALL-POTENTIAL-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEW-KIOSK-STANDARD-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "KIOSK-LEASELINE",
            layerState: "On",
          },
          {
            layer: "KIOSK-NAME",
            layerState: "On",
          },
          {
            layer: "KIOSK-SF",
            layerState: "On",
          },
          {
            layer: "KIOSK-SPNO",
            layerState: "On",
          },
          {
            layer: "BD-STATIC",
            layerState: "On",
          },
          {
            layer: "BD-STORAGE",
            layerState: "On",
          },
          {
            layer: "BD-VENDING",
            layerState: "On",
          },
          {
            layer: "BD-WET-KIOSKS",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-KIOSK-ALL-POTENTIAL-PLAN",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-KIOSK-STANDARD-PLAN",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "BD-ATM",
            layerState: "On",
          },
          {
            layer: "BD-ELECTRICAL-PHONE",
            layerState: "On",
          },
          {
            layer: "BD-EVENT-AREA",
            layerState: "On",
          },
          {
            layer: "BD-RMU",
            layerState: "On",
          },
          {
            layer: "BD-SEASONAL-KIOSKS",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "BD All Potential",
      },
      {
        displayOrder: 11,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "VIEW-STRATEGIC-PARTNERSHIP-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Strategic Partnership LP",
      },
      {
        displayOrder: 12,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-BUDGET-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-BUDGET-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Budget Plan",
      },
      {
        displayOrder: 13,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-DOORS-INTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-FEATURES",
            layerState: "On",
          },
          {
            layer: "ARCH-MEZZANINE",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-ABOVE",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-EXPIRATIONS-LEASE-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TENANT-STOREFRONT-LEASELINE",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TEXT-NOTES",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-BRACING",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-COLUMNS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-EXPANSION-JOINT",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-GRID-TAGS",
            layerState: "On",
          },
          {
            layer: "STRUCTURAL-SHEAR-WALL",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-EXPIRATIONS-LEASE-PLAN",
            layerState: "On",
          },
          {
            layer: "COMMON-AREA-GRAY",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-STRUCTURAL-GRID",
            layerState: "On",
          },
          {
            layer: "DIMENSIONS-TENANT",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "ARCH-OPENINGS-BELOW",
            layerState: "On",
          },
          {
            layer: "ARCH-SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-DEMISING",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-EXTERIOR",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-INTERIOR",
            layerState: "On",
          },
        ],
        view: "Expirations Lease",
      },
      {
        displayOrder: 14,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
        ],
        view: "Site Acreage",
      },
      {
        displayOrder: 15,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "VIEW-LAND-OWNERSHIP-PLAN",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "TABLE-ACREAGE",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "CAD Standards - Legends|VIEW-LAND-OWNERSHIP-PLAN",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
        ],
        view: "Site Plan Ownership",
      },
      {
        displayOrder: 16,
        initialLayerState: "AllOff",
        layers: [
          {
            layer: "0",
            layerState: "On",
          },
          {
            layer: "ARCH-SYMBOLS",
            layerState: "On",
          },
          {
            layer: "ARCH-WALLS-OFFICE",
            layerState: "On",
          },
          {
            layer: "SITE-BUILDING",
            layerState: "On",
          },
          {
            layer: "SITE-CURB",
            layerState: "On",
          },
          {
            layer: "SITE-MISCELLANEOUS",
            layerState: "On",
          },
          {
            layer: "VIEWPORT",
            layerState: "On",
          },
          {
            layer: "TEXT-MISCELLANOUS",
            layerState: "On",
          },
          {
            layer: "TITLEBLOCK",
            layerState: "On",
          },
          {
            layer: "UTILITIES-ELECTRICAL",
            layerState: "On",
          },
          {
            layer: "UTILITIES-EQUIPMENT",
            layerState: "On",
          },
          {
            layer: "UTILITIES-HVAC",
            layerState: "On",
          },
          {
            layer: "UTILITIES-PLUMBING",
            layerState: "On",
          },
          {
            layer: "TENANT-NAME",
            layerState: "On",
          },
          {
            layer: "TENANT-OCCUPANCY-COST",
            layerState: "On",
          },
          {
            layer: "TENANT-R12-SALES",
            layerState: "On",
          },
          {
            layer: "TENANT-SF",
            layerState: "On",
          },
          {
            layer: "TENANT-SPNO",
            layerState: "On",
          },
          {
            layer: "TEXT-GENERAL",
            layerState: "On",
          },
          {
            layer: "SITE-PARKING",
            layerState: "On",
          },
          {
            layer: "SITE-PROPERTY-LINE",
            layerState: "On",
          },
          {
            layer: "SITE-SIDEWALK",
            layerState: "On",
          },
          {
            layer: "SITE-STRIPING",
            layerState: "On",
          },
          {
            layer: "SITE-TEXT",
            layerState: "On",
          },
          {
            layer: "TABLE-PARKING-DATA",
            layerState: "On",
          },
        ],
        view: "Site Parking Data",
      },
    ],
    selected: "Standard Plan",
  };

  /////////  CANVAS CONTROL METHODS END

  return (
    <>
      <br />

      <select
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                    `}
        value={selectedOption}
        onChange={handleSelectChange}
        style={{ marginRight: "10px" }}
      >
        <option value="0">Hardwood</option>
        <option value="1">Stone</option>
        <option value="2">Carpet</option>
      </select>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod01A}
      >
        Measure (Rectangle)
      </button>
      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod02A}
      >
        Measure (Polygon)
      </button>
      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod08A}
      >
        Reset Areas
      </button>
      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod10}
      >
        Calibrate Floorplan
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod09}
      >
        Total Current Areas
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod06}
      >
        Store JSON with all SPACES
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod07}
      >
        Insert JSON with SPACES
      </button>

      <input
        className={`
                    bg-white text-black font-normal rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        type="text"
        id="spaceId"
        defaultValue="space/red Id"
      />

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod11}
      >
        Delete Area
      </button>
      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={spaceAreaMethod05}
      >
        Show Area
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={showhide_polygonpoints("show")}
      >
        show polygon points
      </button>
      <button
        className={`
                        bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                        ${
                          config.helperMethodsActionSize === "small"
                            ? " text-xs my-1 mr-1 py-[2px] px-1"
                            : config.helperMethodsActionSize === "large"
                            ? " text-base my-2 mr-2 py-2 px-3"
                            : " text-sm my-2 mr-2 py-1 px-3"
                        }
                    `}
        onClick={showhide_polygonpoints("hide")}
      >
        hide polygon points
      </button>

      <select
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                    `}
        value={selectedOptionRed}
        onChange={handleSelectChangeRed}
        style={{ marginRight: "10px" }}
      >
        <option value="0">Red</option>
        <option value="1">Blue</option>
        <option value="2">Brown</option>
      </select>

      <button
        className={`
                        bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                        ${
                          config.helperMethodsActionSize === "small"
                            ? " text-xs my-1 mr-1 py-[2px] px-1"
                            : config.helperMethodsActionSize === "large"
                            ? " text-base my-2 mr-2 py-2 px-3"
                            : " text-sm my-2 mr-2 py-1 px-3"
                        }
                    `}
        onClick={enable_disable_handles("enable")}
      >
        enable handles
      </button>

      <button
        className={`
                        bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                        ${
                          config.helperMethodsActionSize === "small"
                            ? " text-xs my-1 mr-1 py-[2px] px-1"
                            : config.helperMethodsActionSize === "large"
                            ? " text-base my-2 mr-2 py-2 px-3"
                            : " text-sm my-2 mr-2 py-1 px-3"
                        }
                    `}
        onClick={enable_disable_handles("disable")}
      >
        disable handles
      </button>

      <button
        className={`
                        bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                        ${
                          config.helperMethodsActionSize === "small"
                            ? " text-xs my-1 mr-1 py-[2px] px-1"
                            : config.helperMethodsActionSize === "large"
                            ? " text-base my-2 mr-2 py-2 px-3"
                            : " text-sm my-2 mr-2 py-1 px-3"
                        }
                    `}
        onClick={color_black}
      >
        color layerlist black
      </button>

      <button
        className={`
                        bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                        ${
                          config.helperMethodsActionSize === "small"
                            ? " text-xs my-1 mr-1 py-[2px] px-1"
                            : config.helperMethodsActionSize === "large"
                            ? " text-base my-2 mr-2 py-2 px-3"
                            : " text-sm my-2 mr-2 py-1 px-3"
                        }
                    `}
        onClick={set_print_resolution}
      >
        set print resolution
      </button>

      <button
        className={`
                        bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                        ${
                          config.helperMethodsActionSize === "small"
                            ? " text-xs my-1 mr-1 py-[2px] px-1"
                            : config.helperMethodsActionSize === "large"
                            ? " text-base my-2 mr-2 py-2 px-3"
                            : " text-sm my-2 mr-2 py-1 px-3"
                        }
                    `}
        onClick={exit_quickcount}
      >
        exit quickcount
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={redlineAreaMethod06}
      >
        Store Redline Objects as JSON
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={redlineAreaMethod07}
      >
        Insert JSON with Redline Objects
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={pdfreporttest}
      >
        PDF Report test
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={testfindtext}
      >
        find text instances
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={getlayerstatus}
      >
        get layer status
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={clearDrawing}
      >
        Clear Drawing
      </button>

      <button
        className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
                `}
        onClick={LoadDrawing}
      >
        Load Drawing
      </button>
    </>
  );
};
