import React, {useCallback, useContext} from "react";
import JQ from "jquery";
import cadviewer from "cadviewer";
import config from "../../../utils/config";
import {CadviewerContext} from "../../../context/Cadviewer.Context";


export const ManipulateObjects = () => {



    const { currentCanvasInstance } = useContext(CadviewerContext);



	// group and ungroup redline and space objects

	// flip

	const test_fliphorizontal = useCallback(() => {


		var id  = JQ("#id3").val();
		var object = JQ("#id4").val();
		cadviewer.cvjs_flipRedlineSpaceObject((currentCanvasInstance as string), (id as string), "horizontal", (object as string));



	}, [currentCanvasInstance]);


	const test_flipvertical = useCallback(() => {

		var id = JQ("#id3").val();
		var object = JQ("#id4").val();
		cadviewer.cvjs_flipRedlineSpaceObject((currentCanvasInstance as string),(id as string), "vertical", (object as string));


	}, [currentCanvasInstance]);


	const showhide_polygonpoints = useCallback((action: string) => () => {

		var id = JQ("#id3").val();

		window.alert("showhide_polygonpoints: "+id+" action: "+action+" redline"+(currentCanvasInstance as string));


        var controlPointsStyleObject = {
            fill: '#0000FF',
            stroke: '#00FF00',
            opacity: '0.9',
            'radiusFactor' : 6
        };

        cadviewer.cvjs_polygonControlsPointsStyle(controlPointsStyleObject);


		cadviewer.cvjs_displayPolygonControlsPoint((currentCanvasInstance as string), (id as string),  action, "redline");  // "hide"

	}, [currentCanvasInstance]);
	
	


	const test_moverotscale = useCallback(() => {


		var id  = JQ("#id1").val();  
		var action = JQ("#id2").val(); //  'rotate', 'translate' or 'scale'
		var type = JQ("#id3").val();  // 'redline' or 'spaceobject'


		window.alert("test_moverotscale:"+id+"  "+action+"  "+type);

		cadviewer.cvjs_addHandleFunc_ResizeDragRotateRedlineSpaceObject((id as string), (action as string), (type as string));


	}, []);
	



    return (
        <>

<text className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}>Input main ID:</text>
				 <input className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
			`} type="text" id="id3"  defaultValue="id3" />
            <text className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}>Input merge ID's:</text>
				 <input className={`
                    bg-white text-black font-normal rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
			`} type="text" id="id4"  defaultValue="id4" />



			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			onClick={test_fliphorizontal}>flip horizontal</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			onClick={test_flipvertical}>flip vertical</button>

			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			onClick={showhide_polygonpoints("show")}>show polygon points</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={showhide_polygonpoints("hide")}>hide polygon points</button>
			<button className={`
                    bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded 
                    ${config.helperMethodsActionSize === "small" ? " text-xs my-1 mr-1 py-[2px] px-1" : config.helperMethodsActionSize === "large" ? " text-base my-2 mr-2 py-2 px-3" : " text-sm my-2 mr-2 py-1 px-3"}
                `}
			 onClick={test_moverotscale}>move rotate scale</button>
        </>
    );
};
