import {
  Dialog,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import * as cadviewer from "cadviewer";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAlert } from "react-alert";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CadviewerContext } from "../../context/Cadviewer.Context";
import useConfig from "../../demos/hooks/useConfig";
import EventSystem from "../../events/EventSystem";
import NewFolderForm from "../newFolderForm/UploadFileForm.Component";
import {
  isTabletOrMobile,
  useWindowSize,
} from "../RightAction/RightAction.component";
import TreeView, { ITreeViewOnExpandProps } from "../TreeView";
import { flattenTree } from "../TreeView/utils";
import UploadFileForm from "../UploadFileForm/UploadFileForm.Component";
import {
  bmpIcon,
  csvIcon,
  dgnIcon,
  dwfIcon,
  dwgIcon,
  dxfIcon,
  gifIcon,
  jpgIcon,
  jsonIcon,
  pcfIcon,
  pdfIcon,
  pngIcon,
  svgIcon,
  tiffIcon,
  tifIcon,
  unkownIcon,
} from "./icons";

interface FileFolder {
  own?: boolean;
  name: string;
  path: string;
  size: number;
  created: string;
  modified: string;
  children?: FileFolder[];
}

interface FileFolderList extends Array<FileFolder> {}

interface FolderListRightPanelProps {
  rightFolderPanelOpen: boolean;
  setRightFolderPanelOpen: any;
}

const FolderListRightPanel = ({
  rightFolderPanelOpen,
  setRightFolderPanelOpen,
}: FolderListRightPanelProps) => {
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;

  const [folderStructure, setFolderStructure] = useState<FileFolderList>([]);
  const [error, setError] = useState<string | null>(null);
  const [openForCompare, setOpenForCompare] = useState(false);

  // useEffect(() => {
  // if (!rightFolderPanelOpen){
  // 	setRightFolderPanelOpen(true);
  // }
  // }, [rightFolderPanelOpen, setRightFolderPanelOpen]);

  const fetchFolderStructure = useCallback(async () => {
    try {
      var endpoint = "listdwgdirectory";
      if (ServerBackEndUrl.substring(ServerBackEndUrl.length - 1) == "/") {
        // do nothing
      } else {
        endpoint = "/" + endpoint;
      }

      const headers = new Headers();
      // fix cors
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      // make the request
      const response = await fetch(
        ServerBackEndUrl + endpoint + `?loginFeatureEnabled=false`,
        {
          method: "GET",
          headers: headers,
        }
      );
      if (!response.ok) {
        //				throw new Error("Network response was not ok");
        console.log("Network response issue: " + response.statusText);
        throw new Error("Network response issue (see console log)");
      }
      const data = await response.json();
      setFolderStructure(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  }, [ServerBackEndUrl]);

  const openFolderLocationChooser = (
    data: object | string | number | boolean
  ) => {
    setOpenForCompare(true);
    setRightFolderPanelOpen(true);
  };

  useEffect(() => {
    EventSystem.subscribe("panel.folder_list.open", openFolderLocationChooser);
    return () => {
      EventSystem.unsubscribe(
        "panel.folder_list.open",
        openFolderLocationChooser
      );
    };
  }, []);

  useEffect(() => {
    if (!rightFolderPanelOpen) setOpenForCompare(false);
  }, [rightFolderPanelOpen]);

  useEffect(() => {
    fetchFolderStructure();
  }, [fetchFolderStructure, rightFolderPanelOpen]);

  const { width: windowWidth } = useWindowSize();
  const isMobileOrTablet = useMemo(
    () => isTabletOrMobile(windowWidth),
    [windowWidth]
  );

  const renderPanelContent = () => {
    return (
      <Panel
        order={config.actionPanelSide === "left" ? 1 : 2}
        defaultSize={config.rightPanelDefaultWidth}
        className="relative"
      >
        <div className="absolute right-2 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
          <button
            type="button"
            className="relative rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setRightFolderPanelOpen(false)}
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="bg-primary-700 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold leading-6 text-white">
                {config.rightFileModalPanelTitle}
              </Dialog.Title>
            </div>
            <div className="mt-1">
              <p className="text-sm text-primary-300">
                {config.rightFileModalPanelSubTitle}
              </p>
            </div>
            {config.enableRightFileModalPanel && (
              <UploadFileForm onFinished={() => fetchFolderStructure()} />
            )}
          </div>
          <div className="relative flex-1 px-4 py-6 sm:px-6">
            {error && <p>Error: {error}</p>}
            <FolderList
              folders={folderStructure}
              fetchFolderStructure={fetchFolderStructure}
              closePanel={() => setRightFolderPanelOpen(false)}
              openForCompare={openForCompare}
              rightFolderPanelOpen={rightFolderPanelOpen}
            />
          </div>
        </div>
      </Panel>
    );
  };

  const renderOpacityContent = () => {
    return (
      <Panel
        order={config.actionPanelSide === "left" ? 2 : 1}
        className="opacity-40 bg-black"
        maxSize={isMobileOrTablet ? 20 : undefined}
      ></Panel>
    );
  };

  return (
    <div>
      <Transition.Root show={rightFolderPanelOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          style={{ zIndex: 10000000 }}
          onClose={setRightFolderPanelOpen}
        >
          <div
            className="fixed inset-0 overflow-hidden"
            style={{ zIndex: 10000001 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex w-full">
                <Dialog.Panel
                  className="pointer-events-auto relative w-96"
                  style={{ width: "100%", maxWidth: "100%" }}
                >
                  <PanelGroup
                    autoSaveId="plan-json-content-panel"
                    direction="horizontal"
                  >
                    {config.actionPanelSide === "left"
                      ? renderPanelContent()
                      : renderOpacityContent()}
                    {/* @ts-ignore */}
                    <PanelResizeHandle className="w-2 bg-gray-300 relative">
                      <div
                        className="h-8 w-4 bg-gray-300 flex items-center justify-center"
                        style={{
                          zIndex: 1000,
                          position: "absolute",
                          bottom: 0,
                          top: "calc(50% - 16px)",
                          left: config.actionPanelSide === "left" ? "auto" : -8,
                          right:
                            config.actionPanelSide === "left" ? -8 : "auto",
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
                    {config.actionPanelSide !== "left"
                      ? renderPanelContent()
                      : renderOpacityContent()}
                  </PanelGroup>
                </Dialog.Panel>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

const FolderList = ({
  folders,
  closePanel,
  openForCompare,
  fetchFolderStructure,
  rightFolderPanelOpen,
}: {
  folders: FileFolderList;
  fetchFolderStructure: () => void;
  openForCompare: boolean;
  closePanel: () => void;
  rightFolderPanelOpen: boolean;
}) => {
  const {
    currentDrawingPath,
    setCurrentDrawingPath,
    currentCanvasInstance,
    expendedIds,
    setExpendedIds,
  } = useContext(CadviewerContext);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const [path, setPath] = useState<string>("");
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;
  const alert = useAlert();

  // Ref to track if auto-expansion has been performed for the current serverSubFolder
  const lastExpandedServerSubFolderRef = useRef<string | null>(null);

  console.log({ expendedIds });

  // Filter folders based on showOnlySubFolder configuration
  const filteredFolders = useMemo(() => {
    if (!config.showOnlySubFolder || !config.serverSubFolder) {
      return folders;
    }

    // Normalize serverSubFolder for path comparison (remove trailing slash)
    const normalizedServerSubFolder = config.serverSubFolder.endsWith("/")
      ? config.serverSubFolder.slice(0, -1)
      : config.serverSubFolder;

    // Extract the last part of the serverSubFolder for name comparison
    const targetFolderName = config.serverSubFolder
      .split("/")
      .filter(Boolean)
      .pop();

    // Find the folder that matches serverSubFolder path or name
    const findTargetFolder = (
      folderList: FileFolderList
    ): FileFolder | null => {
      for (const folder of folderList) {
        // Check if this folder matches the serverSubFolder
        if (
          (folder.path && folder.path.endsWith(normalizedServerSubFolder)) ||
          folder.name === targetFolderName
        ) {
          return folder;
        }
        // Recursively search in children
        if (folder.children) {
          const found = findTargetFolder(folder.children);
          if (found) return found;
        }
      }
      return null;
    };

    const targetFolder = findTargetFolder(folders);

    // If target folder is found, return only its children, otherwise return empty array
    return targetFolder?.children || [];
  }, [folders, config.showOnlySubFolder, config.serverSubFolder]);

  const folder = useMemo(
    () => ({
      name: "",
      children: filteredFolders.map((folder) => ({
        own: folder.own,
        name: folder.name,
        path: folder.path,
        modified: folder.modified,
        children: folder.children,
      })),
    }),
    [filteredFolders]
  );

  const data = useMemo(() => flattenTree(folder), [folder]);

  // Auto-expand serverSubFolder if configured (only when showOnlySubFolder is false)
  useEffect(() => {
    // Skip auto-expansion if showOnlySubFolder is true since we're already showing the target folder content
    if (config.showOnlySubFolder) {
      return;
    }

    // Only proceed if serverSubFolder is configured and data is available
    if (config.serverSubFolder && data.length > 0) {
      // If the current serverSubFolder is the same as the one we last attempted to expand, skip.
      if (lastExpandedServerSubFolderRef.current === config.serverSubFolder) {
        return;
      }

      // Normalize serverSubFolder for path comparison (remove trailing slash)
      const normalizedServerSubFolder = config.serverSubFolder.endsWith("/")
        ? config.serverSubFolder.slice(0, -1)
        : config.serverSubFolder;

      // Extract the last part of the serverSubFolder for name comparison (filter Boolean to remove empty strings from split)
      const targetFolderName = (config.serverSubFolder ?? "")
        .split("/")
        .filter(Boolean)
        .pop();

      // Find the folder that matches serverSubFolder path or name
      const targetFolder = data.find(
        (node) =>
          (typeof node.metadata?.path === "string" &&
            node.metadata.path.endsWith(normalizedServerSubFolder)) ||
          (node.isBranch && node.name === targetFolderName)
      );

      if (targetFolder && targetFolder.id !== 0) {
        const ancestors = [];
        let currentId = targetFolder.id;

        while (currentId !== null && currentId !== undefined) {
          const parentNode = data.find((node) => node.id === currentId);
          const parent = parentNode?.parent;

          if (parent !== null && parent !== undefined) {
            ancestors.push(parent);
            currentId = parent;
          } else {
            break;
          }
        }

        const newExpandedIds = [...expendedIds];
        let changed = false;

        if (!newExpandedIds.includes(targetFolder.id)) {
          newExpandedIds.push(targetFolder.id);
          changed = true;
        } else {
        }

        ancestors.forEach((ancestorId) => {
          if (!newExpandedIds.includes(ancestorId)) {
            newExpandedIds.push(ancestorId);
            changed = true;
          } else {
          }
        });

        if (changed) {
          setExpendedIds(newExpandedIds);
          lastExpandedServerSubFolderRef.current = config.serverSubFolder; // Mark as expanded
        } else {
          lastExpandedServerSubFolderRef.current = config.serverSubFolder; // Mark as processed even if no change needed
        }
      } else if (targetFolder && targetFolder.id === 0) {
        lastExpandedServerSubFolderRef.current = config.serverSubFolder; // Mark as attempted to prevent re-runs for root
      } else {
        lastExpandedServerSubFolderRef.current = config.serverSubFolder; // Mark as attempted even if not found
      }
    } else {
    }
  }, [data, config.serverSubFolder, config.showOnlySubFolder, setExpendedIds]);

  // Reset the ref when the panel closes
  useEffect(() => {
    if (!rightFolderPanelOpen) {
      lastExpandedServerSubFolderRef.current = null;
      console.log(
        "🔄 Resetting lastExpandedServerSubFolderRef as panel is closed."
      );
    }
  }, [rightFolderPanelOpen]); // Depend on the new prop

  const openPathInCadViewer = useCallback(
    (path: string, name: string, modified: string) => {
      const availableExtensions = [
        "pdf",
        "tif",
        "tiff",
        "dxf",
        "dwf",
        "dwl",
        "dwl2",
        "dwg",
        "acad",
        "dgn",
        "png",
        "jpeg",
        "jpg",
        "gif",
        "svg",
      ];
      const extension = path.slice(path.lastIndexOf(".") + 1);
      if (availableExtensions.includes(extension.toLowerCase())) {
        // Open file in CadViewer
        console.log("1:  Open file in CadViewer", { path });
        if (!openForCompare) {
          console.log(
            "openPathInCadViewer cvjs_setISOtimeStamp",
            modified,
            modified.split("T")[0]
          );
          cadviewer.cvjs_setISOtimeStamp(path, modified);
          //				cadviewer.cvjs_setISOtimeStamp(name, modified.split("T")[0])
          cadviewer.cvjs_setZoomImageWallpaper(false); // 10.30.2

          cadviewer.cvjs_LoadDrawing(
            currentCanvasInstance || "floorPlan",
            path
          );
          setCurrentDrawingPath(path);
        } else {
          cadviewer.cvjs_setCompareDrawings_LoadSecondDrawingDirect(
            currentCanvasInstance || "floorPlan",
            path
          ); // 8.67.17
          cadviewer.cvjs_conversion_addAXconversionParameter("compare", path); // 8.67.17

          console.log(
            "openPathInCadViewer cvjs_setISOtimeStampCompare",
            name,
            modified.split("T")[0]
          );
          //                if (compareWithDateStamp)
          //                cadviewer.cvjs_setISOtimeStampCompare(name, modified.split("T")[0])
          cadviewer.cvjs_setZoomImageWallpaper(false); // 10.30.2

          cadviewer.cvjs_setISOtimeStampCompare(name, modified);
          cadviewer.cvjs_compareDrawings_LoadSecondDrawing(
            currentCanvasInstance || "floorPlan"
          );
          cadviewer.cvjs_LoadDrawing(
            currentCanvasInstance || "floorPlan",
            currentDrawingPath ?? ""
          ); // 8.67.17
        }
        closePanel();
      }
    },
    [closePanel]
  );

  const deleteFolderOrFile = useCallback(
    async (path: any, isFolder: boolean) => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch(
          ServerBackEndUrl +
            (ServerBackEndUrl.endsWith("/") ? "" : "/") +
            "upload/remove",
          {
            method: "DELETE",
            body: JSON.stringify({ isFolder, path }),
            headers,
          }
        );
        const data = await response.json();
        // check if status is not 200
        console.log({ data, response });
        if (!response.ok) {
          alert.error(data.error);
        } else {
          alert.success(
            (isFolder ? "Folder" : "File") + " delete successfully."
          );
        }
      } catch (error: any) {
        console.log({ error });
        alert.error("Something went wrong. Please try again later.");
      }
      fetchFolderStructure();
    },
    [fetchFolderStructure]
  );

  return (
    <div>
      <div className="directory">
        {openUploadFile && (
          <UploadFileForm
            onFinished={() => fetchFolderStructure()}
            hideButton
            defaultOpen={openUploadFile}
            path={path}
            onClose={() => setOpenUploadFile(false)}
          />
        )}
        {openNewFolder && (
          <NewFolderForm
            onFinished={() => {
              setOpenNewFolder(false);
              fetchFolderStructure();
            }}
            open={openNewFolder}
            path={path}
          />
        )}
        <TreeView
          data={data}
          onSelect={(node) => {
            if (
              node.isSelected &&
              !node.isBranch &&
              node.element.metadata?.path
            ) {
              openPathInCadViewer(
                (node.element.metadata?.path || "") as string,
                node.element.name ?? "",
                (node.element.metadata?.modified ?? "") as string
              );
            }
          }}
          aria-label="directory tree"
          expandedIds={expendedIds}
          onExpand={(node: ITreeViewOnExpandProps) => {
            if (node.isExpanded) {
              setExpendedIds([...expendedIds, node.element.id]);
            } else {
              setExpendedIds(
                expendedIds.filter((id) => id !== node.element.id)
              );
            }
          }}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div
              {...getNodeProps()}
              /*onClick={() => {
								if(isBranch){
									console.log(`Folder '${element.name}' clicked`);
								} else {
									console.log(`File '${element.name}' clicked`);
								}
							}}*/ className="flex items-center text-xl cursor-pointer my-1 w-full"
              style={{ paddingLeft: 20 * (level - 1) }}
            >
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} own={element.own === true} />
              ) : (
                <FileIcon filename={element.name} />
              )}
              <span className="w-full text-base">{element.name}</span>
              {element.name !== "MY FOLDER" && (
                <Menu
                  as="div"
                  className="relative inline-block text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <div>
                    <MenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      <span className="sr-only">Open options</span>
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
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {isBranch && (
                        <MenuItem>
                          <span
                            onClick={() => {
                              console.log({ element });
                              setPath(`${element.metadata?.path ?? ""}`);
                              setOpenUploadFile(true);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Upload file
                          </span>
                        </MenuItem>
                      )}
                      {isBranch && (
                        <MenuItem>
                          <span
                            onClick={() => {
                              setPath(`${element.metadata?.path ?? ""}`);
                              setOpenNewFolder(true);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            New Folder
                          </span>
                        </MenuItem>
                      )}
                      <MenuItem>
                        <span
                          onClick={() => {
                            deleteFolderOrFile(
                              element.metadata?.path ?? "",
                              isBranch
                            );
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Delete
                        </span>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

const FolderIcon = ({ isOpen, own }: { isOpen: boolean; own: boolean }) =>
  isOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={own ? "#FCDC12" : "#e8a87c"}
      className="size-6 mr-1"
    >
      <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={own ? "#FCDC12" : "#e8a87c"}
      className="size-6 mr-1"
    >
      <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
    </svg>
  );
const FileIcon = ({ filename }: { filename: string }) => {
  // if (false)
  // 	return dirIcon;
  // else
  if (filename.toLocaleLowerCase().endsWith(".json")) return jsonIcon;
  else if (filename.toLocaleLowerCase().endsWith(".dwg")) return dwgIcon;
  else if (filename.toLocaleLowerCase().endsWith(".dxf")) return dxfIcon;
  else if (filename.toLocaleLowerCase().endsWith(".dwf")) return dwfIcon;
  else if (filename.toLocaleLowerCase().endsWith(".dgn")) return dgnIcon;
  else if (filename.toLocaleLowerCase().endsWith(".tiff")) return tiffIcon;
  else if (filename.toLocaleLowerCase().endsWith(".tif")) return tifIcon;
  else if (filename.toLocaleLowerCase().endsWith(".pdf")) return pdfIcon;
  else if (
    filename.toLocaleLowerCase().endsWith(".svg") ||
    filename.toLocaleLowerCase().endsWith(".svgz")
  )
    return svgIcon;
  else if (filename.toLocaleLowerCase().endsWith(".gif")) return gifIcon;
  else if (
    filename.toLocaleLowerCase().endsWith(".jpg") ||
    filename.toLocaleLowerCase().endsWith(".jpeg")
  )
    return jpgIcon;
  else if (filename.toLocaleLowerCase().endsWith(".png")) return pngIcon;
  else if (filename.toLocaleLowerCase().endsWith(".bmp")) return bmpIcon;
  else if (
    filename.toLocaleLowerCase().endsWith(".xls") ||
    filename.toLocaleLowerCase().endsWith(".xlsx") ||
    filename.toLocaleLowerCase().endsWith(".csv")
  )
    return csvIcon;
  else if (filename.toLocaleLowerCase().endsWith(".pcf")) return pcfIcon;
  else return unkownIcon;
};
export default FolderListRightPanel;
