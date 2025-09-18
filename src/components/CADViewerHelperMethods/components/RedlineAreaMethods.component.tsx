import React, {useCallback, useContext} from "react";
import JQ from "jquery";
import cadviewer from "cadviewer";
import { handle_selector, selected_handles, current_selected_handle } from "../../CADViewer/CADViewer";
import { is } from "css-select";
import {CadviewerContext} from "../../../context/Cadviewer.Context";
import config from "../../../utils/config";



//export const RedlineAreaMethods = () => {
//    const { currentCanvasInstance } = useContext(CadviewerContext);
//}


var callbackisactive = false;   


export function callback_is_active() {

    return callbackisactive;

}



export function graphicalObjectOnChange(type: any, graphicalObject: any, spaceID: any, evt: any) {

    if (callbackisactive) internalcallback01(type, graphicalObject, spaceID, evt)

}


export function cvjs_click(id: any, handle: any, entity: any, path: any, xpos: any, ypos: any) {

    // this is the callback for the click event on the canvas
    console.log("RedlineAreaMethods - cvjs_click: "+id+"  "+handle+"  "+entity+"  "+path+"  "+xpos+"  "+ypos);

}




// wood
var  highlight_green = { 
    fill: '#32CD32',     // 0dff8a
    "fill-opacity": 0.7,
    stroke: '#228B22',       // 0dff8a green
    'stroke-width': 3.0,
    'stroke-opacity': 1,
    'stroke-linejoin': 'round'
  };

// stone
var  highlight_blue = {
    fill: '#0c8dff',
    'fill-opacity': 0.4,
    stroke: '#003366',           // midnight blue 003366 ,    #0c8dff
    'stroke-width': 3.0,
    'stroke-opacity': 1.0,
    'stroke-linejoin': 'round'
  };

// carpet  
var  highlight_purple = {
    fill: '#ff00dd',     
    "fill-opacity": 0.4,
    stroke: '#800080', //  purple          #ff00dd
    'stroke-width': 3.0,
    'stroke-opacity': 1,
    'stroke-linejoin': 'round'
  };
  

  var  highlight_yellow = {
    fill: '#fafa00',            //  #FFFCBB yellow
    "fill-opacity": 0.4,
    stroke: '#FFD300',    //  orange
    'stroke-width': 3.0,
    'stroke-opacity': 1,
    'stroke-linejoin': 'round'
  };


  
var  highlight_bordeau_red_borders = {
    fill: '#fff',
    "fill-opacity": 0.01,
    stroke: '#8B0000',   // #8B0000   #fa8072    // red
    'stroke-width': 4.0, // 
    'stroke-opacity': 1,
    'stroke-linejoin': 'round'
  };
  

var totalAreaWood = 0;
var totalAreaCarpet = 0;
var totalAreaStone = 0;

var counter = 0;
var objectcounter = 0;
var setFloorType = "hardwood";
var setFloorStyle = "highlight_green";
var lastusedUnit = "m2";


var myredlineObjects;
var thisredlineObject;
var myredlinestickynoteObjects;
//var myareaObjects = [];

var myareaObjects:any[] = [] ;

var showhide_polygonpoints_flag = false

var JSONRedlineObjects: never[] = [];  // general storage for redline objects    






function internalcallback01(type: any, graphicalObject: any, spaceID: any, evt: any) {


   console.log("RedlineAreaMethods - graphicalObjectOnChange"+type+"  "+ graphicalObject+"  "+spaceID+ "  "+evt);


/*

    if (type == 'Create' && ((graphicalObject.toLowerCase().indexOf("spaceobject") )>-1)){		


        var myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
        console.log("This Object "+spaceID+" has Parent: "+myobject.parent);
        lastusedUnit = myobject.unit+"2";




        // We use a basic counter to update the floor type and style
        counter++;
        objectcounter++;

        if (counter == 3) 
            counter = 0;

        if (counter == 0){
            setFloorType = "hardwood";
            setFloorStyle = "Green";
        }
        if (counter == 1){
            setFloorType = "stone";
            setFloorStyle = "Blue";
        }
        if (counter == 2){
            setFloorType = "carpet";
            setFloorStyle = "Purple";
        }   



        if (window.confirm("This is a "+setFloorType+" floor part ("+setFloorStyle+") with area: "+myobject.area+" "+lastusedUnit+". Add to measurement?")) { 


            if (setFloorType == "hardwood"){
                cadviewer.cvjs_highlightSpace(spaceID, highlight_green);
                totalAreaWood += parseFloat(myobject.area);
                console.log("Total Area Hardwood: "+totalAreaWood);
                myareaObjects.push({id: spaceID, area: myobject.area, type: "hardwood"});
            }
    
            if (setFloorType == "stone"){
                cadviewer.cvjs_highlightSpace(spaceID, highlight_blue);
                totalAreaStone += parseFloat(myobject.area);
                console.log("Total Area Stone: "+totalAreaStone);
                myareaObjects.push({id: spaceID, area: myobject.area, type: "stone"});
            }
            if (setFloorType == "carpet"){
                cadviewer.cvjs_highlightSpace(spaceID, highlight_purple);
                totalAreaCarpet += parseFloat(myobject.area);
                console.log("Total Area Carpet: "+totalAreaCarpet);
                myareaObjects.push({id: spaceID, area: myobject.area, type: "carpet"});
            }   
    
    
            if (counter == 0){   // hardwoqd
            }
            if (counter == 1){
            }   
            if (counter == 2){
            }   
    

            return;

        } 
        else{

            window.alert("delete object: "+spaceID);

            cadviewer.cvjs_deleteSpaceObjectDirect("floorPlan", spaceID);

            counter--;
            objectcounter--;

            if (counter == -1) 
                counter = 2;
            if (objectcounter == -1) 
                objectcounter = 0;

            return;

        }


    }


*/






    if (type == 'Click' && ((graphicalObject.toLowerCase().indexOf("redline") )>-1 ||  graphicalObject.toLowerCase().indexOf("redlinefilledpolygon")>-1 )){		


        thisredlineObject = cadviewer.cvjs_returnRedlineObjectID(spaceID);

        //window.alert(myareaObjects.length+"   "+spaceID);
        var floorType = "";
        for (var redline in myareaObjects){  
            if (myareaObjects[redline].id == spaceID){
                floorType = myareaObjects[redline].type;
            }  
        }


        // we only d this if we are not moving control points
        if (!showhide_polygonpoints_flag)
            window.alert("Area is:"+thisredlineObject.area+" "+thisredlineObject.unit+"2\nFloor Type: "+floorType);
    


        // change color of redline object

/*       
        cadviewer.cvjs_styleRedline(thisredlineObject.id, highlight_yellow);

        

        if (window.confirm("Area is:"+thisredlineObject.area+" "+thisredlineObject.unit+"2\nFloor Type: "+floorType)) { 
    

            // change color of redline object
            cadviewer.cvjs_styleRedline(thisredlineObject.id, highlight_green);


        } else {
        

            // change color of redline object

            cadviewer.cvjs_styleRedline(thisredlineObject.id, highlight_blue);




        }
        
  */      

    } 


    if (type == 'Create' && ((graphicalObject.toLowerCase().indexOf("filledredlinerectangle") )>-1 ||  graphicalObject.toLowerCase().indexOf("redlinefilledpolygon")>-1 )){		

        
        myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();
        myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects()
        //console.log("red: "+JSON.stringify(myredlineObjects));

        // we get the current object
        thisredlineObject = cadviewer.cvjs_returnRedlineObjectID(spaceID)

        console.log("red: "+JSON.stringify(thisredlineObject));

        counter++;
        objectcounter++;

        if (counter == 3) 
            counter = 0;

        if (counter == 0){
            setFloorType = "hardwood";
            setFloorStyle = "Green";
        }
        if (counter == 1){
            setFloorType = "stone";
            setFloorStyle = "Blue";
        }
        if (counter == 2){
            setFloorType = "carpet";
            setFloorStyle = "Purple";
        }   

        lastusedUnit = thisredlineObject.unit+"2";

        if (window.confirm("This is a "+setFloorType+" floor part ("+setFloorStyle+") with area: "+thisredlineObject.area+" "+lastusedUnit+". Add to measurement?")) { 
            // Save it!

            var id = thisredlineObject.id;

            if (counter == 0){
                totalAreaWood += parseFloat(thisredlineObject.area);
                console.log("Total Area Hardwood: "+totalAreaWood);
                cadviewer.cvjs_styleRedline(id, highlight_green);
                myareaObjects.push({id: id, area: thisredlineObject.area, type: "wood"});
            }
            if (counter == 1){
                totalAreaStone += parseFloat(thisredlineObject.area);
                console.log("Total Area Stone: "+totalAreaStone);
                cadviewer.cvjs_styleRedline(id, highlight_blue);
                myareaObjects.push({id: id, area: thisredlineObject.area, type: "stone"});
            }   
            if (counter == 2){
                totalAreaCarpet += parseFloat(thisredlineObject.area);
                console.log("Total Area Carpet: "+totalAreaCarpet);
                cadviewer.cvjs_styleRedline(id, highlight_purple);
                myareaObjects.push({id: id, area: thisredlineObject.area, type: "carpet"});
            }   
    
            //window.alert('We change color to its new type');    
    
          } else {
            // Do nothing!
            //window.alert('we delete the object');
            // we delete the object



            cadviewer.cvjs_deleteRedlineDirect("floorPlan", thisredlineObject.id);

            counter--;
            objectcounter--;

            if (counter == -1) 
                counter = 2;
            if (objectcounter == -1) 
                objectcounter = 0;

          }
    


    }			

    // */
    

}



export const RedlineAreaMethods = () => {



    const { handleSelector, setHandleSelector, currentCanvasInstance } = useContext(CadviewerContext);




// use current canvas instance !!!!


/////////  CANVAS CONTROL METHODS START

///  HERE ARE ALL THE CUSTOM TEMPLATES TO DO STUFF ON THE CANVAS

var generic_canvas_flag_first_click_rectangle = false;
var generic_canvas_flag_rectangle = false;
var tPath_r ="";
var cvjs_RubberBand :any;
var cvjs_firstX =0;
var cvjs_firstY =0;
var cvjs_lastX =0;
var cvjs_lastY =0;

var selected_handles : any;  // this is just to show that you can have multiple handles
var handle_selector = false;
var current_selected_handle = "";


const redlineAreaMethod01 = useCallback(() => {


	cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string);



}, [currentCanvasInstance]);

const redlineAreaMethod02 = useCallback(() => {


	cadviewer.cvjs_drawRedlineFilledPolygon(currentCanvasInstance as string);


}, [currentCanvasInstance]);







const redlineAreaMethod03 = useCallback(() => {

    var redId = (document.getElementById("redId") as HTMLInputElement).value;

    /*
    var  highlight_green = {
        fill: '#32CD32',     // 0dff8a
        "fill-opacity": 0.8,
        stroke: '#228B22',       // 0dff8a green
        'stroke-width': 2.0,
        'stroke-opacity': 1,
        'stroke-linejoin': 'round'
      };
      */
    
    window.alert(redId+"  "+JSON.stringify(highlight_green));


    cadviewer.cvjs_styleRedline(redId, highlight_green)


    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);



const redlineAreaMethod04 = useCallback(() => {

    var redId = (document.getElementById("redId") as HTMLInputElement).value;
      
        
    window.alert(redId+"  "+JSON.stringify(highlight_blue));


    cadviewer.cvjs_styleRedline(redId, highlight_blue)


    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);



const redlineAreaMethod05 = useCallback(() => {

    var redId = (document.getElementById("redId") as HTMLInputElement).value;

    // get the redline object
    thisredlineObject = cadviewer.cvjs_returnRedlineObjectID(redId)

    //window.alert(myareaObjects.length+"   "+redId);

    var floorType = "";
    for (var redline in myareaObjects){  

        //window.alert(myareaObjects[redline].id+"   "+redId);

        if (myareaObjects[redline].id == redId){
            floorType = myareaObjects[redline].type;
        }  
    }

    window.alert("Area is:"+thisredlineObject.area+" "+thisredlineObject.unit+"2\nFloor Type: "+floorType);


    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);


const redlineAreaMethod06 = useCallback(() => {

    var redId = (document.getElementById("redId") as HTMLInputElement).value;

        
    window.alert("Return JSON with all REDLINE OBJECTS");


    JSONRedlineObjects = cadviewer.cvjs_returnAllRedlineObjects();

    console.log("red: "+JSON.stringify(JSONRedlineObjects));



    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);


const redlineAreaMethod07 = useCallback(() => {


    console.log("Insert JSON with all REDLINE OBJECTS");

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

    // insert all redline objects
    cadviewer.cvjs_setAllRedlineObjects(JSONRedlineObjects, true);  // true means delete all redlines before inserting



}, [currentCanvasInstance]);




const internalCallback01 = useCallback((type: any, graphicalObject: any, spaceID: any, evt: any) => {


    window.alert("Insert JSON with SPACES");



    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);





const redlineAreaMethod08 = useCallback(() => {


    window.alert("Reset Areas, delete redlines");


    totalAreaWood = 0;
    totalAreaCarpet = 0;
    totalAreaStone = 0;

    // delete all redlines
    cadviewer.cvjs_deleteAllRedlines();


    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);



const redlineAreaMethod09 = useCallback(() => {


    window.alert("Total floor areas: \nHardwood: "+totalAreaWood+" "+lastusedUnit+" \nCarpet: "+totalAreaCarpet+" "+lastusedUnit+"\nStone: "+totalAreaStone+" "+lastusedUnit); ;


    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);



const redlineAreaMethod10 = useCallback(() => {

    cadviewer.cvjs_calibrateMeasurement(currentCanvasInstance as string);

    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);

const redlineAreaMethod11 = useCallback(() => {


    var redId = (document.getElementById("redId") as HTMLInputElement).value;

    // get the redline object
    thisredlineObject = cadviewer.cvjs_returnRedlineObjectID(redId)

    window.alert("Delete Area: "+redId+"  "+thisredlineObject.area);
    var i=0;
    for (var redline in myareaObjects){  

        if (myareaObjects[redline].id == redId){
            if (myareaObjects[redline].type == "wood")
                totalAreaWood -= parseFloat(myareaObjects[redline].area);
            if (myareaObjects[i].type == "stone")
                totalAreaStone -= parseFloat(myareaObjects[redline].area);
            if (myareaObjects[i].type == "carpet")
                totalAreaCarpet -= parseFloat(myareaObjects[redline].area);
            myareaObjects.splice(i, 1);
        }  
        i++;
    }

    // delete the redline object

    cadviewer.cvjs_deleteRedlineDirect(currentCanvasInstance as string, redId);


    //cadviewer.cvjs_drawRedlineFilledRectangle(currentCanvasInstance as string, redId, redlineStyle);

}, [currentCanvasInstance]);



const showhide_polygonpoints = useCallback((action: string) => () => {

    var id = (document.getElementById("redId") as HTMLInputElement).value;


    if (action == "show"){
        showhide_polygonpoints_flag = true;
    }   
    else{
        showhide_polygonpoints_flag = false;
    }   

    window.alert("showhide_polygonpoints: "+id+" action: "+action+" redline"+(currentCanvasInstance as string));


    var controlPointsStyleObject = {
        fill: '#0000FF',
        stroke: '#00FF00',
        opacity: '0.9',
        'radiusFactor' : 1
    };

    cadviewer.cvjs_polygonControlsPointsStyle(controlPointsStyleObject);


    cadviewer.cvjs_displayPolygonControlsPoint((currentCanvasInstance as string), (id as string),  action, "redline");  // "hide"

}, [currentCanvasInstance]);




/////////  CANVAS CONTROL METHODS END


    return (
        <>
                <br />
				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
                onClick={redlineAreaMethod01}
				>
					Measure (Redline Rectangle)
				</button>
				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
                onClick={redlineAreaMethod02}
				>
					Measure (Redline Polygon)
				</button>

				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod10}
				>
                    Calibrate Floorplan
				</button>

				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod09}
				>
                    Total Current Areas
				</button>


				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod08}
				>
                    Reset Areas (Clear Redlines)
				</button>
                < br/>

                <span className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}>Enter Redline ID:</span>

                 <input className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `} type="text" id="redId"  defaultValue="redId" />
				
				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod11}
				>
                    Delete Area
				</button>
                <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod05}
				>
                    Show Area
				</button>

                <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod03}
				>
                    Style Object Green
				</button>

				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod04}
				>
                    Style Object Blue
				</button>

                < br/>

                <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			onClick={showhide_polygonpoints("show")}>Show polygon points (drag to change shape)</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={showhide_polygonpoints("hide")}>Hide polygon points</button>


                <br/>

                <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod06}
				>
                    Store Redline Objects as JSON
				</button>


				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod07}
				>
                    Insert JSON with Redline Objects
				</button>



{/*}


				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod06}
				>
                    Give me JSON with all SPACES
				</button>



				<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}                
                onClick={redlineAreaMethod07}
				>
                    Insert JSON with SPACES
				</button>

                */}



        </>
    );
};
