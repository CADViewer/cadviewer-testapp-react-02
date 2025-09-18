import React, {useCallback, useContext} from "react";
import JQ from "jquery";
import cadviewer from "cadviewer";
import {CadviewerContext} from "../../../context/Cadviewer.Context";
import config from "../../../utils/config";

export const InsertObjects = () => {


    const { currentCanvasInstance } = useContext(CadviewerContext);


/**
* Add a Fixed Size Space Object Custom Rectangle at coordinates x, y JSON object created with cvjs_createNewJSonSpaceObject() these settings will be used to intialize space objects subsequently drawn with the draw methods
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
 *                              "displayStatus" : displayStatus, <br>
 *								"group": group, 
 *								"linked": linked, 
 *								"attributes": attributes, 
 *								"attributeStatus": attributeStatus, 
 *								"displaySpaceObject": displaySpaceObject,
 *								"translate_x": translate_x, 
 *								"translate_y": translate_y,
 *                              "zvalue": "1", 
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
 *                               "href" : "none",
 *                               "parent": "none"
 *                               }
 * Add a Fixed Size Space Object Custom Rectangle at coordinates x, y
 *  
 * <strong>CADViewer Internal Command Groups:</strong> [All]{@link https://cadviewer.com/cadviewerproapi/global.html?id=All}. 
 * @param {string} f_div - name of div containing CADViewer canvas
 * @param {string} path - name of path containing wallpaper object
 * @param {object} jsonObject - see jsonObject above with 5 fields defined, name, type, id, translate_x, and translate_y
 * @param {int} c_flag - 0 is SVG coordinates, 1 is DWG coordinates, 0 is default
 * @param {Object} txt - array with lines of text content in Space Object
 * @param {float} sf - sf factor at insertion, 1.0 is default
 * @param {Object} col - object containing col and style of default setting of Space Object, "none" provides standard default color
 * @param {Object} txtst - object containing col and style of each line of text in the Space Object
 * @param {Array} scl - array containing relative size af each line of text in the Space Object
 * @param {Array} tcol - array containing color of each line of text in the Space Object
 * @param {float} left - left adjustment factor of text in the Space Object
 * @example 
 * 
  *  [See CADViewer Reference Samples]{@link https://cadviewer.com/cadviewerdemo/}. These [Samples]{@link https://cadviewer.com/cadviewerdemo/} implements selected interface commands and various [API methods]{@link https://cadviewer.com/cadviewertechdocs/}.  
 * 
 *                           
 * @see  Please reference the [CADViewer Tech Docs Reference Samples]{@link https://cadviewer.com/cadviewertechdocs/samples} for API method usage and asssociated code samples. 
 * / 

 function cvjs_addSpaceObjectDirect(f_div, path, jsonObject, c_flag, txt, sf, col, txtst, scl, tcol, left){

    cvjs_addSpaceObjectDirectXY(f_div, path, jsonObject, c_flag, txt, sf, col, txtst, scl, tcol, left);
 }

*/


	
	const createSampleTextSpaceObject = useCallback(() => {



        var text_style_arial_9pt_normal = {
            'stroke': "#00539B",
            'fill': "#00539B",
            'font-family': "Arial",
            'font-size': "9pt",
            'font-weight': "normal",
            'margin': 0,
            'margin-top': "-10px",
            'cursor': "pointer",
            'text-align': "left",
            'vertical-align': "top",
            'width': "128px",
            'z-index': 1980
        };

        var id = Math.floor(Math.random() * 1000).toString();

        var textArray = new Array("cctv", id);
        var textStyles = new Array(text_style_arial_9pt_normal, text_style_arial_9pt_normal);	
//            var textStyles = new Array(FontAwesome_9pt_normal);	
        var scaleText = new Array(0.8, 0.5);
        var hexColorText = new Array("#AB55BB", "#AB5500");
//            var hexColorText = new Array("#AB5500");
        var leftFactor = 0.1;
    
        var location = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/sensor_c.svg";

        //sample01	- dwg coordinates
        var xcor = 	117749.9320;
        var ycor =  36536.9007;	
        // svg coordinates
        var xcor = 	500+Math.floor(Math.random() * 800);
        var ycor =  200+Math.floor(Math.random() * 500);
    
        var jsonObject = { "name": "1001", "type": "cctv", "id": id, "translate_x": xcor, "translate_y": ycor };
        

        // use cvjs_addSpaceObjectDirect for direct insertion of space object
        cadviewer.cvjs_addSpaceObjectDirect((currentCanvasInstance as string), location, jsonObject, 0, textArray, 1.0, "none", textStyles, scaleText, hexColorText, leftFactor);

        // same method with direct insertion of space object
        // use cvjs_addSpaceObjectDirectXY for direct insertion of space object
//            cvjs_addSpaceObjectDirectXY(currentCanvasInstance  as string, location, jsonObject, 0, textArray, 1.0, "none", textStyles, scaleText, hexColorText, leftFactor);

	}, [currentCanvasInstance]);





const handleAddDoorSpaceObject = useCallback(() => {


    const objectId = Math.floor(Math.random() * 1000).toString();

    if (!objectId) {
        alert('You have to spacify an Id');
    } else if (document.querySelector(`[cvjs\\:roomId="${objectId}"]`)) {
        alert('There is an object with that Id, please spacify a uniqueId');
    } else {

        //var location = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/door_allstates01.svg";

        const imagePath = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/door_allstates01.svg";
        const objectTypeKey = 'door';

        console.log("handleAddDoorSpaceObject 1");

        cadviewer.cvjs_setImageSpaceObjectParameters(imagePath, objectId, objectTypeKey, 'cvjs_SpaceLayer');

        console.log("handleAddDoorSpaceObject 2");


        var xcor = 	500+Math.floor(Math.random() * 800);
        var ycor =  200+Math.floor(Math.random() * 500);


        cadviewer.cvjs_addFixedSizeImageSpaceObjectXY((currentCanvasInstance as string), xcor, ycor);

        console.log("handleAddDoorSpaceObject 3");
        cadviewer.cvjs_changeSpaceObjectName(objectId, 'Door '+Math.floor(Math.random() * 1000).toString());

        console.log("handleAddDoorSpaceObject 4");

        /* cadviewer.cvjs_showObjectInSpaceObjectGroup(objectId, 'Base', 'id');
        cadviewer.cvjs_hideObjectInSpaceObjectGroup(objectId, 'Alarm', 'id'); */
    }

}, [currentCanvasInstance]);





const open_all = useCallback(() => {

    cadviewer.cvjs_showOnlyObjectInAllSpaceObjectGroups('open');

}, []);



const lock_all = useCallback(() => {

    cadviewer.cvjs_showOnlyObjectInAllSpaceObjectGroups('locked');

}, []);


const close_all = useCallback(() => {

    cadviewer.cvjs_showOnlyObjectInAllSpaceObjectGroups('closed');

}, []);





const hatch_all_redlines = useCallback(() => {

        window.alert("hatchallredlines");
        var my_test_counter = 0;


        var myredlines = cadviewer.cvjs_returnAllRedlineObjects();

        console.log("myredlines: "+myredlines);


        for (var i=0; i<myredlines.RedlineObjects.length; i++){


            console.log("first loop: "+i+"  "+myredlines.RedlineObjects.length+"  "+myredlines.RedlineObjects[i].node);



            my_test_counter++;
            if (my_test_counter>8) 
            my_test_counter = 1;

            if (my_test_counter==1){
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_0degree_crosshatch_standard", "#550055" , 0.9);
                cadviewer.cvjs_setRedlineStrokeDashArray(myredlines.RedlineObjects[i].node, "dash");
            }
            if (my_test_counter==2){
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_45degree_standard", "#AA2200" , 0.4);
                cadviewer.cvjs_setRedlineStrokeDashArray(myredlines.RedlineObjects[i].node, "dash_dot");

            }
            if (my_test_counter==3){
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_135degree_wide", "#0055BB" , 0.3);
                cadviewer.cvjs_setRedlineStrokeDashArray(myredlines.RedlineObjects[i].node, "dash_dot_dot");
            }
            if (my_test_counter==4){
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_45degree_crosshatch_fine", "#11FF11" , 0.7);
                cadviewer.cvjs_setRedlineStrokeDashArray(myredlines.RedlineObjects[i].node, "dot");
            }
            if (my_test_counter==5)
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_90degree_fine", "#22FFFF" , 0.5);
            if (my_test_counter==6)
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_90degree_standard", "#AA00AA" , 0.8);
            if (my_test_counter==7)
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_45degree_crosshatch_standard", "#0055BB" , 0.2);
            if (my_test_counter==8)
                cadviewer.cvjs_hatchRedline( myredlines.RedlineObjects[i].node, "pattern_0degree_wide", "#008888" , 0.6);

        }


}, []);
















/*


  function lock_single(){
  
      var door_id = JQ('#door_id').val();    
      cadviewer.cvjs_showOnlyObjectInSpaceObjectGroup(door_id, 'locked', "id")
  
  }
  
  
  function open_single(){
  
    var door_id = JQ('#door_id').val();    
    cadviewer.cvjs_showOnlyObjectInSpaceObjectGroup(door_id, 'open', "id")
  
  }
  
  
  function close_single(){
  
    var door_id = JQ('#door_id').val();    
    cadviewer.cvjs_showOnlyObjectInSpaceObjectGroup(door_id, 'closed', "id")
  
  }
  
  
*/

    return (
        <>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={createSampleTextSpaceObject}>createSampleTextSpaceObject</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={handleAddDoorSpaceObject}>handleAddDoorSpaceObject</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={close_all}>closeAll</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={open_all}>openAll</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={lock_all}>lockAll</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={hatch_all_redlines}>hatch All Redlines</button>
        </>
    );
};
