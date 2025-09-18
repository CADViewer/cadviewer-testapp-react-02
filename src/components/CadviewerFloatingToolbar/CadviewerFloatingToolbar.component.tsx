import { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

// Import icons
import menus from "../../utils/cadviewer_menu_all_items_custom_commands.json";
import { getIcon } from "./Icons";

// Import all icons
import { CadviewerContext } from "../../context/Cadviewer.Context";
import { triggerAction } from "./Actions";
import { ReactComponent as NextIcon } from "./icons/next.svg";
import { ReactComponent as PreviousIcon } from "./icons/previous.svg";
import useConfig from "../../demos/hooks/useConfig";
// New icons for pagination

const CadviewerFloatingToolbar = () => {
  const { config } = useConfig();
  const { currentCanvasInstance } = useContext(CadviewerContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [position, setPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const dragRef = useRef<HTMLDivElement>(null);

  // Récupérer la position sauvegardée au chargement du composant
  useEffect(() => {
    const savedPosition = localStorage.getItem("toolbarPosition");
    if (savedPosition) {
      try {
        const parsedPosition = JSON.parse(savedPosition);
        setPosition(parsedPosition);
      } catch (e) {
        console.error("Failed to parse saved toolbar position");
      }
    }
  }, []);

  // Recupérer la position de la ref dragRef
  useEffect(() => {
    if (dragRef.current && !position) {
      // recupérer la position de la ref dragRef
      const position = dragRef.current.getBoundingClientRect();
      // console.log({ position });  10.81.6
      setPosition({ x: position.x, y: position.y });
    }
    if (position) {
      localStorage.setItem("toolbarPosition", JSON.stringify(position));
    }
  }, [dragRef, position]);

  const toggleCollapse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsCollapsed((prev) => !prev);
  };

  // Get icon size class from config
  const getIconSizeClass = () => {
    switch (config.floatingToolbarIconSize) {
      case "small":
        return "w-5 h-5";
      case "large":
        return "w-7 h-7";
      case "medium":
      default:
        return "w-6 h-6";
    }
  };
  const iconSizeClass = getIconSizeClass();

  // Define toolbar items per page

  const totalPages = menus.cvjs.iconmenu.totalpages;

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
  };

  const currentToolbarItems = menus.cvjs.iconmenu.pages[currentPage - 1].map(
    (item: any) => ({
      icon: getIcon(item.command),
      tooltip: item.tooltip,
      command: item.command,
    })
  );

  const isVertical = config.floatingToolbarOrientation === "vertical";

  if (config.debugMode) console.log({ position });

  return (
    <div className="mx-5">
      <div ref={dragRef} />
      {position && (
        <Draggable handle=".drag-handle" defaultPosition={position}>
          <div
            className={` fixed top-1/2 left-4 transform -translate-y-1/2 bg-white shadow-lg rounded-md p-1 z-50 border border-gray-300 flex ${
              isVertical ? "flex-col" : "flex-row"
            } items-center`}
          >
            <button
              onClick={toggleCollapse}
              className={`drag-handle cursor-move p-1 hover:bg-gray-200 rounded ${
                isVertical ? "self-center" : "self-center"
              }`}
              title={
                isCollapsed ? "Expand the toolbar" : "Collapse the toolbar"
              }
            >
              <img
                src={"/cvlogo.svg"}
                alt="Drag/Collapse"
                className={iconSizeClass}
              />
            </button>

            {!isCollapsed && (
              <>
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className={`p-[2px] hover:bg-gray-200 rounded ${
                    // isVertical ? "mb-1" : "ml-1"
                    ""
                  }`}
                  title="Previous Page"
                >
                  <PreviousIcon
                    className={`w-5 h-5 text-gray-700 group-hover:text-primary-500 transition-colors duration-200`}
                  />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className={`p-[2px] hover:bg-gray-200 rounded ${
                    // isVertical ? "mt-1" : "ml-1"
                    ""
                  }`}
                  title="Next Page"
                >
                  <NextIcon
                    className={`w-5 h-5 text-gray-700 group-hover:text-primary-500 transition-colors duration-200`}
                  />
                </button>
                <div
                  className={`flex ${
                    isVertical
                      ? "flex-col space-y-1 my-1"
                      : "flex-row space-x-1 mx-1"
                  }`}
                >
                  {currentToolbarItems.map((item, index) => (
                    <div
                      key={`${currentPage}-${index}`}
                      className="relative group"
                    >
                      <button
                        onClick={() =>
                          triggerAction(
                            currentCanvasInstance || "floorPlan",
                            item.command
                          )
                        }
                        className="p-1 rounded hover:bg-gray-200 transition-colors duration-200"
                      >
                        <item.icon
                          className={`${iconSizeClass} text-gray-700 group-hover:text-primary-500 transition-colors duration-200`}
                        />
                      </button>

                      <div
                        className={`absolute ${
                          isVertical
                            ? "left-full ml-2 top-1/2 transform -translate-y-1/2"
                            : "top-full mt-2 left-1/2 transform -translate-x-1/2"
                        } bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10`}
                      >
                        {item.tooltip}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default CadviewerFloatingToolbar;
