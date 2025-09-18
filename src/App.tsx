import classNames from "classnames";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import {
  CADViewer,
  CadviewerFloatingToolbar,
  DisabledClickWrapper,
  Header,
  SideBarLeftPanel,
  SpaceObjectInfo,
} from "./components";
import {
  CadviewerContext,
  extractFileNameFromPath,
} from "./context/Cadviewer.Context";
import DemoNavigation from "./demos/components/DemoNavigation";
import useConfig from "./demos/hooks/useConfig";
import { fetchGeoLocationData } from "./utils/geoLocation";

import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { useTour } from "@reactour/tour";
import * as cadviewer from "cadviewer";
import { useLocation } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  isTabletOrMobile,
  useWindowSize,
} from "./components/RightAction/RightAction.component";
import EventSystem from "./events/EventSystem";

function App() {
  const { config } = useConfig();

  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const { setIsOpen } = useTour();

  const { width } = useWindowSize();
  const isMobileOrTablet = useMemo(() => isTabletOrMobile(width), [width]);

  let query = useQuery();

  const [leftPanelOpen, setLeftPanelOpen] = useState(
    config.defaultLeftPanelOpen
  );
  const {
    selectedSpaceObjectID,
    setCurrentDrawingPath,
    canvasInstances,
    newCanvasInstance,
    currentCanvasInstance,
    removeCanvasInstance,
    setCurrentCanvasInstance,
    disableFeature,
  } = useContext(CadviewerContext);

  const index = React.useMemo(() => {
    const c = canvasInstances.find((c) => c.id === currentCanvasInstance);
    if (c) {
      return canvasInstances.indexOf(c);
    }
    return 0;
  }, [canvasInstances, currentCanvasInstance]);

  useEffect(() => {
    document.title = config.AppName;

    if (config.enableGeoLocation) {
      // Initialize geolocation data when app starts
      const initGeoLocation = async () => {
        try {
          await fetchGeoLocationData();
        } catch (error) {
          console.error("Failed to initialize geolocation data:", error);
        }
      };

      initGeoLocation();
    }
  }, []);

  useEffect(() => {
    cadviewer.cvjs_hideOnlyPop();
  }, [leftPanelOpen]);

  useEffect(() => {
    if (query.get("compareFile") && query.get("compareWith")) {
      const compareFileDateStamp = query.get("compareFileDateStamp");
      const compareWithDateStamp = query.get("compareWithDateStamp");
      console.log("Comparing files");
      config.activateCompareOnLoad = true;

      if (compareFileDateStamp)
        cadviewer.cvjs_setISOtimeStamp(
          extractFileNameFromPath(query.get("compareFile") ?? "") ?? "",
          compareFileDateStamp
        );
      if (compareWithDateStamp)
        cadviewer.cvjs_setISOtimeStampCompare(
          extractFileNameFromPath(query.get("compareWith") ?? "") ?? "",
          compareWithDateStamp
        );

      cadviewer.cvjs_setCompareDrawings_LoadSecondDrawingDirect(
        "floorPlan",
        query.get("compareWith") || ""
      ); // 8.67.17
      cadviewer.cvjs_conversion_addAXconversionParameter(
        "compare",
        query.get("compareWith") || ""
      ); // 8.67.17

      // remove setCurrentDrawingPath
      console.log(
        "Comparing files  - (removing setCurrentDrawingPath) before loading"
      );

      cadviewer.cvjs_setZoomImageWallpaper(false); // 10.30.2

      cadviewer.cvjs_LoadDrawing("floorPlan", query.get("compareFile") || ""); // 8.67.17
      setCurrentDrawingPath(query.get("compareFile") || ""); // 8.67.17
    }
  }, [query]);

  const styles = {
    slide: {
      padding: 15,
      height: "100%",
      color: "#fff",
    },
    slideContainer: {
      height: "100%",
    },
  };

  useEffect(() => {
    cadviewer.cvjs_setActiveFloorplanIndex(index);

    //cadviewer.cvjs_setActiveFloorplan(floorplan);  - in case the floorplan is known
  }, [index]);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("userHasSeenTour");
    if ((!hasSeenTour || false) && config.showTourInformationDialog) {
      setIsOpen(true);
      localStorage.setItem("userHasSeenTour", "true");
    }
  }, [setIsOpen]);

  const renderBottomInformation = () => {
    return (
      <>
        {/* @ts-ignore */}
        <PanelResizeHandle className="h-2 bg-gray-300 relative">
          <div
            className="h-4 w-8 bg-gray-300 flex items-center justify-center"
            style={{
              zIndex: 1000,
              position: "absolute",
              bottom: 0,
              left: "calc(50% - 16px)",
            }}
          >
            <svg
              width="32px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Interface / Drag_Horizontal">
                <g id="Vector">
                  <path
                    d="M18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>
        </PanelResizeHandle>
        <Panel
          order={2}
          defaultSize={
            config.bottomPaneDefaultHeight
          } /*onResize={(size) => cadviewer.cvjs_hideOnlyPop()}*/
        >
          <SpaceObjectInfo />
        </Panel>
      </>
    );
  };

  if (config.debugMode)
    console.log({ isMobileOrTablet, selectedSpaceObjectID });

  // return layout with header, right panel, left panel, center container, and footer with tailwind css
  return (
    <div
      className={classNames({
        "h-screen max-h-screen overflow-y-hidden": true,
        "min-h-screen h-full w-full": true,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <Transition
        show={leftPanelOpen && (isMobileOrTablet || false)}
        as={Fragment}
      >
        <Dialog
          as="div"
          id="left-panel-dialog"
          style={{ zIndex: 10000000 }}
          onClose={() => setLeftPanelOpen(false)}
        >
          <div className="fixed inset-0 flex w-screen h-screen items-stretch justify-start">
            <DialogPanel className={"max-w-xs w-[95%] "}>
              <SideBarLeftPanel
                leftPanelOpen={leftPanelOpen}
                setLeftPanelOpen={setLeftPanelOpen}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
      <PanelGroup
        autoSaveId="main-content-panel"
        direction="horizontal"
        onLayout={() => cadviewer.cvjs_hideOnlyPop()}
      >
        {leftPanelOpen && !isMobileOrTablet && (
          <>
            <Panel
              /*onResize={(size) => cadviewer.cvjs_hideOnlyPop()}*/ order={1}
              defaultSize={config.leftPaneDefaultWidth}
            >
              {/* Left Pane: put icon for open it like panel */}
              <SideBarLeftPanel
                leftPanelOpen={leftPanelOpen}
                setLeftPanelOpen={setLeftPanelOpen}
              />
            </Panel>
            {/* @ts-ignore */}

            <PanelResizeHandle className="w-2 bg-gray-300 relative">
              <div
                className="h-8 w-4 bg-gray-300 flex items-center justify-center"
                style={{
                  zIndex: 1000,
                  position: "absolute",
                  bottom: 0,
                  top: "calc(50% - 16px)",
                }}
              >
                <svg
                  width="20px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Interface / Drag_Horizontal">
                    <g id="Vector">
                      <path
                        d="M14 18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17C14.4477 17 14 17.4477 14 18Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 6C14 6.55228 14.4477 7 15 7C15.5523 7 16 6.55228 16 6C16 5.44772 15.5523 5 15 5C14.4477 5 14 5.44772 14 6Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </PanelResizeHandle>
          </>
        )}
        <Panel order={2} /*onResize={(size) => cadviewer.cvjs_hideOnlyPop()}*/>
          {/* Main conntent */}
          <div className="flex flex-row">
            <div className="h-screen max-h-screen overflow-y-hidden flex flex-col flex-1">
              <Header
                leftPanelOpen={leftPanelOpen}
                setLeftPanelOpen={setLeftPanelOpen}
              />
              <main
                className={classNames({
                  "h-full relative flex-1  overflow-x-hidden": true,
                  // "grid-rows-footer": config.ShowInformativeBottomPanel && selectedSpaceObjectID !== undefined,
                  // "grid-rows-footer-collapsed": true,
                  // "transition-[grid-template-columns] duration-300 ease-in-out": true,
                })}
              >
                <PanelGroup
                  autoSaveId="right-content-panel"
                  direction="vertical"
                >
                  <Panel
                    order={1}
                    onResize={() => {
                      EventSystem.publish("cadviewer.handle_resize", "");
                    }}
                  >
                    {disableFeature && (
                      <DisabledClickWrapper className="!absolute top-0 left-0 right-0 bottom-0 bg-black/10 z-50">
                        <div />
                      </DisabledClickWrapper>
                    )}
                    <div className={"flex flex-col h-full"}>
                      <SwipeableViews
                        className={"grow"}
                        index={index}
                        containerStyle={styles.slideContainer}
                        slideStyle={styles.slideContainer}
                        disableLazyLoading
                      >
                        {canvasInstances.map((canvasInstance) => (
                          <div
                            style={Object.assign({}, styles.slide)}
                            key={canvasInstance.id || "key-" + index}
                          >
                            <CADViewer
                              canvasPlanId={canvasInstance.id}
                              key={canvasInstance.id}
                            />
                          </div>
                        ))}
                        {/*<div style={Object.assign({}, styles.slide)}>*/}
                        {/*  <CADViewer canvasPlanId={"floorPlan2"} key={'canvas-2'} />*/}
                        {/*</div>*/}
                      </SwipeableViews>
                      {config.canvasMode === "MULTIPLE" && (
                        <div className={"grow-0 h-10 flex"}>
                          {canvasInstances.map((canvasInstance, idx) => (
                            <button
                              onClick={() => {
                                setCurrentCanvasInstance(canvasInstance.id);
                                EventSystem.publish(
                                  "cadviewer.handle_resize",
                                  new Date().getTime()
                                );
                              }}
                              className={`${
                                index === idx
                                  ? "bg-primary-500  text-white"
                                  : "border border-primary-500"
                              } group flex items-center px-2 py-2 text-sm  flex-grow-0 flex-shrink-0`}
                            >
                              {canvasInstance.fileName || "Open File"}
                              {canvasInstances.length > 1 && (
                                <div
                                  className={"p-1 text-red-500"}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    removeCanvasInstance(canvasInstance.id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </div>
                              )}
                            </button>
                          ))}

                          <button
                            onClick={() => {
                              newCanvasInstance();
                            }}
                            className={`border border-primary-500 text-primary-500 group flex items-center px-2 py-2 text-sm  flex-grow-0 flex-shrink-0`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </Panel>
                  {config.ShowInformativeBottomPanel &&
                    ![undefined, "", null].includes(selectedSpaceObjectID) &&
                    config.bottomPaneSliderMode === "withCADViewer" &&
                    renderBottomInformation()}
                </PanelGroup>

                {config.bottomPaneSliderMode === "aboveCADViewer" &&
                  config.ShowInformativeBottomPanel &&
                  ![undefined, "", null].includes(selectedSpaceObjectID) && (
                    <PanelGroup
                      className={"absolute top-0 bottom-0 left-0 right-0"}
                      style={{ zIndex: 16000 }}
                      autoSaveId="right-content-panel-full-screen"
                      direction="vertical"
                    >
                      <Panel order={1} className="opacity-40 bg-black"></Panel>
                      {renderBottomInformation()}
                    </PanelGroup>
                  )}
              </main>
            </div>
            {/*<div className="w-16 h-screen bg-primary-500 flex flex-col">
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>

              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
              <div className="w-full bg-white flex flex-col gap-2 p-2 items-center justify-center hover:bg-primary-500 cursor-pointer">
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">
                  Open Folder
                </span>
              </div>
            </div>*/}
          </div>
        </Panel>
      </PanelGroup>

      {config.floatingToolbar && <CadviewerFloatingToolbar />}

      {/* Demo Navigation - positioned as floating button */}
      {config.enableDemoNavigation && (
        <div className="fixed bottom-2 left-2 z-50">
          <DemoNavigation />
        </div>
      )}
    </div>
  );
}

export default App;
