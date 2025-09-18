import cadviewer from "cadviewer";
import { createContext, useEffect, useState } from "react";
import { NodeId } from "../components/TreeView/types";
import useConfig from "../demos/hooks/useConfig";
import { Employee, SpaceObjectProps } from "../types";

// Import package.json to get version
import packageJson from "../../package.json";

export const extractFileNameFromPath = (filePath: string) => {
  // Check if the path separator is '/' (Unix-like systems)
  if (filePath.includes("/")) {
    return filePath.split("/").pop(); // Get the last element after splitting by '/'
  } else if (filePath.includes("\\")) {
    // Check if the path separator is '\' (Windows)
    return filePath.split("\\").pop(); // Get the last element after splitting by '\'
  } else {
    // If the path doesn't contain any path separator, return the whole string
    return filePath;
  }
};

export interface Layer {
  layer: string;
  color: string;
}

export interface ColorEntry {
  plan: string;
  hex: string;
  filltype: string;
  filltype2: string | number;
  text: string;
}

export interface PlanColorData {
  [planName: string]: ColorEntry[];
}

export interface SpaceDistance {
  spaceNumber: string;
  Distance: number;
}

export interface SpaceWithDistances {
  spaceNumber: string;
  distances: SpaceDistance[];
}

export interface DistanceData {
  planType: string;
  propertyNumber: string;
  planName: string;
  spaces: SpaceWithDistances[];
}

export interface CanvasInstance {
  id: string;
  filePath?: string;
  fileName?: string;
}

export interface CadviewerContextProps {
  currentDrawingPath?: string;
  setCurrentDrawingPath: (path: string | undefined) => void;
  spaceObjects?: SpaceObjectProps[];
  employees: Employee[];
  setSpaceObjects: () => void;
  setEmployees: (employees: Employee[]) => void;
  setSelectedSpaceObjectID: (id: string | undefined) => void;

  selectedSpaceObjectID?: string;

  disableFeature: boolean;
  // tab information in bottom panel
  tabIndex: string;
  setTabIndex: (tabIndex: string) => void;
  canvasInstances: CanvasInstance[];
  layerColorsOnLoad: Layer[];
  setLayerColorsOnLoad: (layers: Layer[]) => void;
  newCanvasInstance: (callback?: () => void) => void;
  removeCanvasInstance: (id: string) => void;
  currentCanvasInstance?: string;
  setCurrentCanvasInstance: (id: string) => void;
  handleSelector: boolean;
  setHandleSelector: (handleSelector: boolean) => void;
  expendedIds: NodeId[];
  setExpendedIds: (expendedIds: NodeId[]) => void;
  multiSelectArray: string[];
  setMultiSelectArray: (multiSelectArray: string[]) => void;
  // App version from package.json
  appVersion: string;
}

export const CadviewerContext = createContext<CadviewerContextProps>({
  spaceObjects: undefined,
  setCurrentDrawingPath: () => {},
  currentDrawingPath: undefined,
  employees: [],
  setEmployees: () => {},
  setSpaceObjects: () => {},
  setSelectedSpaceObjectID: () => {},
  selectedSpaceObjectID: undefined,

  disableFeature: false,
  tabIndex: "tenant_information",
  setTabIndex: () => {},
  canvasInstances: [],
  layerColorsOnLoad: [],
  setLayerColorsOnLoad: () => {},
  newCanvasInstance: () => {},
  currentCanvasInstance: undefined,
  setCurrentCanvasInstance: () => {},
  removeCanvasInstance: () => {},
  handleSelector: false,
  setHandleSelector: () => {},
  expendedIds: [],
  setExpendedIds: () => {},
  multiSelectArray: [],
  setMultiSelectArray: () => {},
  appVersion: packageJson.version,
});

export const CadviewerContextProvider = ({ children }: any) => {
  const { config } = useConfig();

  const [spaceObjects, setSpaceObjects] = useState<SpaceObjectProps[]>([]);

  const [selectedSpaceObjectID, setSelectedSpaceObjectID] = useState<
    string | undefined
  >(undefined);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [tabIndex, setTabIndex] = useState<string>("tenant_information");
  const [currentDrawingPath, setCurrentDrawingPath] = useState<
    string | undefined
  >(undefined);
  const [expendedIds, setExpendedIds] = useState<NodeId[]>([]);

  const [handleSelector, setHandleSelector] = useState<boolean>(false);
  const [multiSelectArray, setMultiSelectArray] = useState<string[]>([]);

  const [canvasInstances, setCanvasInstances] = useState<CanvasInstance[]>([
    {
      id: "floorPlan",
      fileName: config.initFileName
        ? extractFileNameFromPath(config.initFileName)
        : undefined,
      filePath: config.initFileName || undefined,
    },
  ]);
  const [currentCanvasInstance, setCurrentCanvasInstance] = useState<
    string | undefined
  >(undefined);

  const [layerColorsOnLoad, setLayerColorsOnLoad] = useState<Layer[]>(
    config.defaultLayerColorsOnLoad
  );

  useEffect(() => {
    if (!currentCanvasInstance && canvasInstances)
      setCurrentCanvasInstance(canvasInstances[0].id);
  }, [canvasInstances, currentCanvasInstance]);

  /*
    useEffect(() => {
        const index = currentCanvasInstance ? canvasInstances.findIndex(instance => instance.id === currentCanvasInstance) : 0;
        cadviewer.cvjs_setActiveFloorplanIndex(index);
    }, [canvasInstances]);
  */

  return (
    <CadviewerContext.Provider
      value={{
        canvasInstances,
        newCanvasInstance: (callback) => {
          const id = "floorPlan-" + new Date().getTime();
          setCanvasInstances([
            ...canvasInstances,
            {
              id,
              fileName: undefined,
              filePath: undefined,
            },
          ]);
          setCurrentCanvasInstance(id);
          if (callback) callback();
        },
        removeCanvasInstance: (id: string) => {
          const index = canvasInstances.findIndex(
            (instance) => instance.id === id
          );
          if (
            id === currentCanvasInstance &&
            index === canvasInstances.length - 1
          ) {
            setCurrentCanvasInstance(canvasInstances[index - 1]?.id);
          } else if (id === currentCanvasInstance) {
            setCurrentCanvasInstance(canvasInstances[index + 1]?.id);
          }
          setCanvasInstances((instances) =>
            instances.filter((instance) => instance.id !== id)
          );
        },
        currentCanvasInstance,
        expendedIds,
        setExpendedIds,
        setCurrentCanvasInstance,
        currentDrawingPath,
        setCurrentDrawingPath: (path) => {
          if (path) {
            setCanvasInstances((instances) =>
              instances.map((instance) => ({
                ...instance,
                filePath:
                  instance.id === currentCanvasInstance
                    ? path
                    : instance.filePath,
                fileName:
                  instance.id === currentCanvasInstance
                    ? extractFileNameFromPath(path)
                    : instance.fileName,
              }))
            );
          }
          setCurrentDrawingPath(path);
        },
        spaceObjects,
        employees,
        setEmployees,
        setSpaceObjects: () => {
          const allSpaceObjects = cadviewer.cvjs_returnAllSpaceObjects();
          setSpaceObjects(allSpaceObjects?.SpaceObjects ?? []);
        },
        setSelectedSpaceObjectID,
        selectedSpaceObjectID,
        disableFeature: false, // Simplified - no more user dependency
        tabIndex,
        setTabIndex,
        handleSelector,
        setHandleSelector,
        layerColorsOnLoad,
        setLayerColorsOnLoad,
        multiSelectArray,
        setMultiSelectArray,
        appVersion: packageJson.version,
      }}
    >
      {children}
    </CadviewerContext.Provider>
  );
};
