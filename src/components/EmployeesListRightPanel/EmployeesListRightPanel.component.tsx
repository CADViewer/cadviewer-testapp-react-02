import { Dialog, Transition } from "@headlessui/react";
import * as cadviewer from "cadviewer";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CadviewerContext } from "../../context/Cadviewer.Context";
import useConfig from "../../demos/hooks/useConfig";
import { Employee } from "../../types";
import {
  isTabletOrMobile,
  useWindowSize,
} from "../RightAction/RightAction.component";

interface FolderListRightPanelProps {
  open: boolean;
  setOpen: any;
}

const EmployeesListRightPanel = ({
  open,
  setOpen,
}: FolderListRightPanelProps) => {
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;

  let base_url = ServerBackEndUrl;
  // check if end with /
  if (!base_url.endsWith("/")) {
    base_url = base_url + "/";
  }

  const { employees, setEmployees } = useContext(CadviewerContext);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch(base_url + "database/employees");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  }, [ServerBackEndUrl, setEmployees]);

  useEffect(() => {
    if (config.enableRightEmployeePanel) fetchEmployees();
  }, [fetchEmployees, open]);

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
            onClick={() => setOpen(false)}
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
                Employees list
              </Dialog.Title>
            </div>
            <div className="mt-1">
              <p className="text-sm text-primary-300">
                Please select an employee to highlight the room
              </p>
            </div>
          </div>
          <div className="relative flex-1 py-6">
            {error && <p>Error: {error}</p>}
            <EmployeesList
              employees={employees}
              closePanel={() => setOpen(false)}
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          style={{ zIndex: 10000000 }}
          onClose={setOpen}
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

const EmployeesList = ({
  employees,
  closePanel,
}: {
  employees: Employee[];
  closePanel: () => void;
}) => {
  return (
    <div>
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {employees.map((e) => {
          return (
            <EmployeeDisplay
              key={`key-${e.id}`}
              closePanel={closePanel}
              employee={e}
            />
          );
        })}
      </ul>
    </div>
  );
};

const EmployeeDisplay = ({
  employee,
  closePanel,
}: {
  employee: Employee;
  closePanel: () => void;
}) => {
  const { config } = useConfig();
  let temp_employee = employee;

  const { setSelectedSpaceObjectID, spaceObjects } =
    useContext(CadviewerContext);

  const spaceObjectIds = useMemo(() => {
    return (spaceObjects ?? []).map((spaceObject) => spaceObject.id);
  }, [spaceObjects]);

  return (
    <li
      className="relative cursor-pointer"
      onClick={() => {
        // modification to test reference files
        // test exitech files
        var modified_room_id = "";
        if (temp_employee.room_id < 10) {
          modified_room_id = "00" + temp_employee.room_id;
        } else {
          if (temp_employee.room_id < 100) {
            modified_room_id = "0" + temp_employee.room_id;
          } else modified_room_id = "" + temp_employee.room_id;
        }
        // test
        console.log(
          "  " +
            temp_employee.room_id +
            "  " +
            modified_room_id +
            " " +
            temp_employee.department.color
        );

        // color object with department colors
        var space = {
          fill: temp_employee.department.color,
          "fill-opacity": "0.7",
          stroke: "#a4d7f4",
          "stroke-width": "2",
        };
        cadviewer.cvjs_highlightSpace(modified_room_id, space);
        cadviewer.cvjs_zoomHere_ObjectId(
          `${modified_room_id}`,
          config.ZoomFactor
        );
        setSelectedSpaceObjectID(`${modified_room_id}`);
        closePanel();

        /*  we  omit this part for now, as the space object needs to be prepended with a 00 prefix

			if (temp_employee.room_id && spaceObjectIds.includes(`${temp_employee.room_id}`)) {
				console.log("highlightOrganization", modified_room_id, temp_employee.room_id, temp_employee.department.color, temp_employee.department.name);
//				cadviewer.cvjs_highlightSpace(temp_employee.room_id as string, temp_employee.department.color);
//				cadviewer.cvjs_highlightRoomHex(temp_employee.room_id, temp_employee.department.color);
//				cadviewer.cvjs_highlightRoomImmediate(`${temp_employee.room_id}`, true);
				cadviewer.cvjs_zoomHere_ObjectId(`${temp_employee.room_id}`, config.ZoomFactor);
//				cadviewer.cvjs_hideOnlyPop();
				setSelectedSpaceObjectID(`${temp_employee.room_id}`);
				closePanel();
			} else {
				console.log("Space object not found:  org: "+temp_employee.room_id);
			}
				*/
      }}
    >
      <div className="flex justify-between gap-x-6 py-5  px-5">
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="relative inline-block flex-shrink-0">
            <span
              className={
                "block h-5 w-5 rounded-full ring-2 ring-white bg-gray-300"
              }
              style={{ backgroundColor: employee.department?.color }}
            />
          </span>
          <div className="ml-4 truncate">
            <p className="truncate text-sm font-medium text-gray-900">
              {employee.employeeName}
            </p>
            <p className="truncate text-sm text-gray-500">
              Room: {employee.room_id}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">
            {employee.department.name}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            #{employee.department.id}
          </p>
        </div>
      </div>
      <div
        className="absolute inset-0 group-hover:bg-gray-50"
        aria-hidden="true"
      />
    </li>
  );
};

export default EmployeesListRightPanel;
