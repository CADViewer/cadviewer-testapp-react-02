import React, {useCallback, useContext, useMemo} from "react";
import cadviewer from "cadviewer";
import JQ from "jquery";
import {CadviewerContext} from "../../../context/Cadviewer.Context";
import * as CV from "../../CADViewer/CADViewer";
import config from "../../../utils/config";

/// highlight space objects


//const { currentCanvasInstance } = useContext(CadviewerContext);



function highlight_all_spaces_3colors() {



    /* we cannot use input field

    selectedColor = JQ("#input_color").val();
    var secondcolor = selectedColor.substring(0, 5);
    secondcolor += "FF";
    // window.alert(secondcolor);

    */


    var color1="#7FFFD4";  // aquamarine
    var color2="#EE4B2B";  // bright red
    var color3="#00FFFF";  // aqua

    var colortype1 = {
        fill: color1,
        "fill-opacity": "0.3",
        stroke: color1,
        "stroke-width": 1,
        "stroke-opacity": "1",
        "stroke-linejoin": "round",
    };

    var colortype2 = {
        fill: color2,
        "fill-opacity": "0.3",
        stroke: color2,
        "stroke-width": 1,
        "stroke-opacity": "1",
        "stroke-linejoin": "round",
    };

    var colortype3 = {
        fill: color3,
        "fill-opacity": "0.3",
        stroke: color3,
        "stroke-width": 1,
        "stroke-opacity": "1",
        "stroke-linejoin": "round",
    };

    var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
    for (var spc in spaceObjectIds) {
        var rmid = spaceObjectIds[spc];
        // @ts-ignore
        if ((spc) % 3 == 0) {
            cadviewer.cvjs_highlightSpace(rmid, colortype1);
        } else {
            // @ts-ignore
            if (spc % 3 == 1) {
                cadviewer.cvjs_highlightSpace(rmid, colortype2);

            } else {
                cadviewer.cvjs_highlightSpace(rmid, colortype3);
            }
        }
        //cadviewer.cvjs_highlightSpace(rmid, colortype);
    }
}



function clear_space_highlight() {
    cadviewer.cvjs_clearSpaceLayer();

    CV.clearTextLayer();
}


export const Highlight = () => {

    const { employees, spaceObjects } = useContext(CadviewerContext);

    const spaceObjectIds = useMemo(() => {
        const newSpaceObjects = (spaceObjects ?? []).map((spaceObject) => spaceObject.id);
        console.log({ newSpaceObjects });
        return newSpaceObjects;
    }, [spaceObjects]);



    const button2 = useCallback(() => {
        clear_space_highlight();
    }, []);
    const highlightOrganization = useCallback(() => {

        window.alert(JQ("#rotate_id").val());

        // we can highlight all spaces with a color
        highlight_all_spaces_3colors();

        (employees ?? []).forEach((employee) => {
            // check if employee rooms are in the spaceObjects
            if (employee.room_id && spaceObjectIds.includes(`${employee.room_id}`)) {
                console.log("highlightOrganization", employee.room_id, employee.department.color, employee.department.name);
                cadviewer.cvjs_highlightSpace(String(employee.room_id), {
                    fill: employee.department.color, //'#fff',
                    "fill-opacity": 0.3,
                    stroke: employee.department.color,
                    'stroke-width': 4.0,
                    'stroke-opacity': 1.0,
                    'stroke-linejoin': 'round'
                });
            }
        });
    }, [spaceObjectIds, employees]);

    return (
        <>
            <button
                className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                    `
                }
                onClick={highlightOrganization}
            >
                Sample Highlight
            </button>


            <button
                className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
                onClick={button2}
            >
                Clear Highlight
            </button>

        </>
    );
};
