import * as cadviewer from "cadviewer";
import { useCallback, useContext, useEffect, useState } from "react";
import Scrollbar from "react-scrollbars-custom";
import SwipeableViews from "react-swipeable-views";
import { CadviewerContext } from "../../context/Cadviewer.Context";
import useConfig from "../../demos/hooks/useConfig";
import { SpaceObjectProps } from "../../types";
import { classNames } from "../../utils/css";
import DisabledClickWrapper from "../DisabledClickWrapper";
import SpaceObjectInfo from "../SpaceObjectInfo";
import VersionDisplay from "../VersionDisplay/VersionDisplay.component";

interface SideBarLeftPanelProps {
  leftPanelOpen: boolean;
  setLeftPanelOpen: any;
}

const SideBarLeftPanel = ({ leftPanelOpen }: SideBarLeftPanelProps) => {
  const { selectedSpaceObjectID } = useContext(CadviewerContext);

  const { config } = useConfig();

  return (
    <aside
      className={
        "h-screen max-h-screen transform transition-transform ease-in duration-150 bg-sidebar-background flex flex-col overflow-hidden"
      }
    >
      {leftPanelOpen &&
        (true ? (
          <SwipeableViews
            className="h-screen max-h-screen overflow-hidden"
            index={
              config.ShowInformativeLeftPanel && selectedSpaceObjectID ? 1 : 0
            }
          >
            <div className="h-screen max-h-screen overflow-hidden">
              <SpaceObjectList />
            </div>
            <div className="h-screen max-h-screen overflow-hidden">
              <SpaceObjectInfo showInLeftPanel />
            </div>
          </SwipeableViews>
        ) : (
          <SpaceObjectList />
        ))}
      <div className="absolute bottom-0 left-0 right-0">
        <VersionDisplay className="mx-auto mb-2 text-center w-full text-white" />
      </div>
    </aside>
  );
};

const SpaceObjectList = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const {
    spaceObjects,
    selectedSpaceObjectID,
    setSelectedSpaceObjectID,
    disableFeature,
  } = useContext(CadviewerContext);

  // Scroll to the select object item
  useEffect(() => {
    const element = document.getElementById(
      "space-object-" +
        `${selectedSpaceObjectID}`.replaceAll(".", "_").replaceAll(" ", "_")
    );
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [selectedSpaceObjectID]);
  return (
    <div className="h-full flex flex-col  py-4">
      <form
        className="bg-white/30 p-2 m-2 rounded-md relative flex flex-1"
        action="#"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-sidebar-title"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <DisabledClickWrapper>
          <input
            id="search-field"
            className="bg-transparent block h-full w-full border-0 py-0 pl-8 pr-0 text-sidebar-title placeholder:text-sidebar-title/80 focus:ring-0 sm:text-sm outline-none  focus:outline-none"
            placeholder="Search..."
            type="text"
            name="search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            disabled={disableFeature}
          />
        </DisabledClickWrapper>
        {searchKeyword && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            onClick={() => setSearchKeyword("")}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cursor-pointer absolute inset-y-0 right-2 h-full w-5 text-sidebar-title"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </form>
      <div className="h-full overflow-y-hidden">
        <Scrollbar
          style={{ position: "relative" }}
          className="h-full"
          removeTracksWhenNotUsed={false}
          thumbYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  ref={elementRef}
                  className="ScrollbarsCustom-Thumb ScrollbarsCustom-ThumbY"
                  style={{ background: "white" }}
                />
              );
            },
          }}
        >
          {spaceObjects === undefined ? (
            <ul className="divide-y divide-white/5">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (spaceObject) => (
                  <div
                    className="max-w-sm w-full mx-auto py-4"
                    key={spaceObject}
                  >
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="bg-slate-700 rounded w-2 h-2 p-1"></div>
                            <div className="bg-slate-700 rounded h-2 w-2/5"></div>
                            <div className="flex-1" />
                            <div className="bg-slate-700 rounded-full h-5 w-1/6"></div>
                          </div>
                          <div className="h-2 bg-slate-700 rounded w-2/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </ul>
          ) : (
            <ul className="divide-y divide-white/5">
              {(spaceObjects ?? [])
                .filter((spaceObject: SpaceObjectProps) =>
                  searchKeyword.trim() === ""
                    ? true
                    : spaceObject.id
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                )
                .map((spaceObject: SpaceObjectProps) => (
                  <SpaceObject
                    selected={
                      selectedSpaceObjectID ===
                      spaceObject.id.replaceAll(".", "_").replaceAll(" ", "_")
                    }
                    setSelectedSpaceObjectID={setSelectedSpaceObjectID}
                    key={spaceObject.id}
                    spaceObject={spaceObject}
                  />
                ))}
            </ul>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};

interface SpaceObjectCompProps {
  selected: boolean;
  setSelectedSpaceObjectID: (id: string | undefined) => void;
  spaceObject: SpaceObjectProps;
}

// Space object component
const SpaceObject = ({
  spaceObject,
  setSelectedSpaceObjectID,
  selected,
}: SpaceObjectCompProps) => {
  const { config } = useConfig();
  const { disableFeature } = useContext(CadviewerContext);
  const focusSpaceObject = useCallback(() => {
    cadviewer.cvjs_hideOnlyPop();
    if (config.ShowInformativeBottomPanelWhenClickInLeftPanel) {
      setSelectedSpaceObjectID(spaceObject.id);
    }
    //cadviewer.cvjs_highlightRoomImmediate(spaceObject.id, true);
    cadviewer.cvjs_changeSpaceFixedLocation(
      spaceObject.id.replaceAll(".", "_"),
      null
    );

    // 9.44.2
    //	cadviewer.cvjs_zoomHere_ObjectId(spaceObject.id, config.ZoomFactor);
  }, [setSelectedSpaceObjectID, spaceObject.id]);

  return (
    <DisabledClickWrapper>
      <li
        key={spaceObject.id}
        id={"space-object-" + spaceObject.id}
        className={classNames(
          "relative flex items-center space-x-4 py-4 px-2",
          !disableFeature && "cursor-pointer hover:bg-sidebar-item-hover",
          "transition-colors duration-300 ease-in-out",
          // selected
          selected ? "bg-sidebar-item-hover" : ""
        )}
        onClick={() => {
          if (!disableFeature) {
            focusSpaceObject();
          }
        }}
      >
        <div className="min-w-0 flex-auto">
          <div className="flex items-center gap-x-3">
            <div
              className={classNames(
                selected
                  ? "text-sidebar-active-item bg-green-400/10"
                  : "text-sidebar-subtitle bg-gray-100/10",
                "flex-none rounded-full p-1"
              )}
            >
              <div className="h-2 w-2 rounded-full bg-current" />
            </div>
            <h2 className="min-w-0 text-sm font-semibold leading-6 text-sidebar-title">
              {/* <span className="truncate">{spaceObject.node}</span>
					<span className="text-sidebar-subtitle">/</span> */}
              <span className="whitespace-nowrap">{spaceObject.name}</span>
              <span className="absolute inset-0" />
            </h2>
          </div>
          <div className="mt-3 text-xs leading-5 text-sidebar-subtitle">
            <p
              className="flex-1 w-full"
              dangerouslySetInnerHTML={{
                __html: (spaceObject.type ?? "").replace("<br>", ""),
              }}
            />
          </div>
        </div>
        <div
          className={classNames(
            "text-primary-300 bg-primary-300/30 ring-primary-300",
            "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
          )}
        >
          {spaceObject.id}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 flex-none text-sidebar-subtitle"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </li>
    </DisabledClickWrapper>
  );
};

export default SideBarLeftPanel;
