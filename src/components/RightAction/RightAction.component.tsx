import * as cadviewer from "cadviewer"; // 9.27.3
import { useContext, useEffect, useMemo, useState } from "react";
import { CadviewerContext } from "../../context/Cadviewer.Context";
import useConfig from "../../demos/hooks/useConfig";
import DisabledClickWrapper from "../DisabledClickWrapper";
import EmployeesListRightPanel from "../EmployeesListRightPanel";
import FolderListRightPanel from "../FolderListRightPanel";
import Tooltip from "../Tooltip";

// Définit un type pour la taille de la fenêtre
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * Hook personnalisé pour suivre la taille de la fenêtre du navigateur.
 * @returns {WindowSize} Un objet contenant la largeur et la hauteur actuelles de la fenêtre.
 * Initialise la largeur et la hauteur à `undefined` pour éviter les problèmes d'hydratation SSR.
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Fonction handler appelée lors du redimensionnement de la fenêtre
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Ajoute l'écouteur d'événement
    window.addEventListener("resize", handleResize);

    // Appelle le handler immédiatement pour définir la taille initiale
    handleResize();

    // Nettoyage : supprime l'écouteur d'événement lorsque le composant est démonté
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'au montage et au démontage

  return windowSize;
};

// hooks for check if we are on the tablet or mobile based on the window width
export const isTabletOrMobile = (width: number | undefined) => {
  return width && width < 1024;
};

const RightAction = () => {
  const { width } = useWindowSize();
  const { config } = useConfig();
  const isMobile = useMemo(() => isTabletOrMobile(width), [width]);
  const [rightFolderPanelOpen, setRightFolderPanelOpen] = useState(false);
  const [rightEmployeePanelOpen, setRightEmployeePanelOpen] = useState(false);
  const { setSelectedSpaceObjectID, disableFeature } =
    useContext(CadviewerContext);

  // 9.66.5
  const cvjs_customCommand_19 = () => {
    setRightFolderPanelOpen(true);
    cadviewer.cvjs_hideOnlyPop();
  };

  useEffect(() => {
    cadviewer.cvjs_setCallbackMethod(
      "cvjs_customCommand_19",
      cvjs_customCommand_19
    );
  }, []);

  let rightMenuMode = !isMobile ? config.rightMenuMode : "Popup";
  let enableRightMenuIcon =
    config.enableRightMenuIcon && rightMenuMode === "Popup";

  return (
    <div className="top-16 flex items-start justify-start lg:justify-end flex-wrap flex-1">
      {rightMenuMode === "Inline" && (
        <div className="flex flex-grow-1 gap-1 flex-wrap justify-end">
          {config.enableHelpButton1 && (
            <button
              onClick={() => {
                window.open(config.helpbutton1link, "_blank");
              }}
              className={`inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mr-2
							${
                config.helperMethodsActionSize === "small"
                  ? " text-xs my-1 mr-1 py-[2px] px-1"
                  : config.helperMethodsActionSize === "large"
                  ? " text-base my-2 mr-2 py-2 px-3"
                  : " text-sm my-2 mr-2 py-1 px-3"
              }
							disabled:bg-gray-300 disabled:text-white
							`}
            >
              <img
                src={"/cvlogo_white.svg"}
                alt="CV Logo"
                className="w-5 h-5 mr-3"
              />
              {config.helpbutton1}
            </button>
          )}

          {config.enableHelpButton2 && (
            <button
              onClick={() => {
                window.open(config.helpbutton2link, "_blank");
              }}
              className={`inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mr-2
							${
                config.helperMethodsActionSize === "small"
                  ? " text-xs my-1 mr-1 py-[2px] px-1"
                  : config.helperMethodsActionSize === "large"
                  ? " text-base my-2 mr-2 py-2 px-3"
                  : " text-sm my-2 mr-2 py-1 px-3"
              }
							disabled:bg-gray-300 disabled:text-white
							`}
            >
              <img
                src={"/cvlogo_white.svg"}
                alt="CV Logo"
                className="w-5 h-5 mr-3"
              />
              {config.helpbutton2}
            </button>
          )}

          {config.enableRightFileModalPanel && (
            <DisabledClickWrapper>
              <Tooltip text={config.rightActionPanelTooltip}>
                <button
                  id="folder-structure-button"
                  onClick={() => {
                    cadviewer.cvjs_hideOnlyPop();
                    setSelectedSpaceObjectID(undefined);
                    setRightFolderPanelOpen(true);
                  }}
                  className={`inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mr-2
										${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
										disabled:bg-gray-300 disabled:text-white
										`}
                  disabled={disableFeature}
                >
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
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25H11.69z"
                    />
                  </svg>
                  <span>{config.enableRightFileModalPanelText}</span>
                </button>
              </Tooltip>
            </DisabledClickWrapper>
          )}

          {config.enableRightEmployeePanel && (
            <DisabledClickWrapper>
              <button
                onClick={() => {
                  cadviewer.cvjs_hideOnlyPop();
                  setSelectedSpaceObjectID(undefined);
                  setRightEmployeePanelOpen(true);
                }}
                className={`inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mr-2
										${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
										disabled:bg-gray-300 disabled:text-white
										`}
                disabled={disableFeature}
              >
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span>{config.enableRightEmployeePanelText}</span>
              </button>
            </DisabledClickWrapper>
          )}

          {config.enableRightArchivePanel && (
            <DisabledClickWrapper>
              <button
                onClick={() => {
                  cadviewer.cvjs_hideOnlyPop();
                  setSelectedSpaceObjectID(undefined);
                }}
                className={`inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mr-2
										${
                      config.helperMethodsActionSize === "small"
                        ? " text-xs my-1 mr-1 py-[2px] px-1"
                        : config.helperMethodsActionSize === "large"
                        ? " text-base my-2 mr-2 py-2 px-3"
                        : " text-sm my-2 mr-2 py-1 px-3"
                    }
										disabled:bg-gray-300 disabled:text-white
										`}
                disabled={disableFeature}
              >
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
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span>{config.enableRightArchivePanelText}</span>
              </button>
            </DisabledClickWrapper>
          )}
        </div>
      )}

      <FolderListRightPanel
        rightFolderPanelOpen={rightFolderPanelOpen}
        setRightFolderPanelOpen={setRightFolderPanelOpen}
      />
      <EmployeesListRightPanel
        open={rightEmployeePanelOpen}
        setOpen={setRightEmployeePanelOpen}
      />
    </div>
  );
};

export default RightAction;
