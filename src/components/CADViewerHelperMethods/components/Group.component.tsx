import React, {useCallback, useContext} from "react";
import JQ from "jquery";
import cadviewer from "cadviewer";
import {CadviewerContext} from "../../../context/Cadviewer.Context";

import config from "../../../utils/config";

export const Group = () => {


    const { currentCanvasInstance } = useContext(CadviewerContext);


    const test_group = useCallback(() => {


        window.alert(JQ("#id1").val()+"  "+JQ("#id2").val());



        // load basegroup
        var basegroup: string = JQ("#id1").val() as string;

        // load list of spaceRedObjects
        var group_array: string [] | string[][] | string = JQ("#id2").val() as string[];

        if (group_array.length == 0){
            window.alert("No objects to group");
            return;
        }
        else
        if (group_array.indexOf(",") == -1){
            window.alert("Only one object to group");
            group_array = new Array(group_array);

        }
        else
            group_array = (group_array as unknown as string).split(",");


        window.alert("test_group:"+basegroup+"  group_array[0]:"+group_array[0]+"  "+currentCanvasInstance);


        cadviewer.cvjs_groupRedlineSpaceObjects((currentCanvasInstance as string), basegroup, group_array);

    }, [currentCanvasInstance]);

    const test_ungroup = useCallback(() => {

        window.alert(JQ("#id1").val()+"  "+JQ("#id2").val());

        // load basegroup
        var basegroup: string = JQ("#id1").val() as string;


        // load list of spaceRedObjects
        var group_array: string [] | string[][] | string  = JQ("#id2").val() as string[];

        if (group_array.length == 0){
            window.alert("No objects to ungroup");
            return;
        }
        else
        if (group_array.indexOf(",") == -1){
            console.log("Only one object to ungroup");
            group_array = new Array(group_array);

        }
        else
            group_array = (group_array as unknown as string).split(",");

        console.log("test_ungroup:"+basegroup+"  un group_array[0]:"+group_array[0]);

        cadviewer.cvjs_ungroupRedlineSpaceObjects((currentCanvasInstance as string), basegroup, group_array);


    }, [currentCanvasInstance]);


    const text_on_layer = useCallback(() => {


        var layer: string = JQ("#id1").val() as string;

        window.alert(layer);
        var mylist = cadviewer.cvjs_getTextOnLayer((currentCanvasInstance as string),layer);
    
        console.log("STRINGIFY:"+JSON.stringify(mylist));
    
        for (var i=0; i<mylist.length; i++){
            console.log("loop: "+i+" "+mylist[i]);
        }

        
    }, [currentCanvasInstance]);
        
    

    const disable_object_drag = useCallback(() => {

        cadviewer.cvjs_disableSpaceObjectDrag(true);
        
    }, [currentCanvasInstance]);
    


        


        






    return (
        <>
            <text className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}>Input main ID:</text> <input className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `} type="text" id="id1"  defaultValue="id1" />
            <text className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}>Input merge ID's: </text><input className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `} type="text" id="id2"  defaultValue="id2" />

            <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
                    onClick={test_group}>apply_group</button>
            <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
                    onClick={test_ungroup}>apply_ungroup</button>

            <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={text_on_layer}>getAllTextOnLayer</button>
            <button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={disable_object_drag}>disableObjectDrag</button>




        </>
    );
};
