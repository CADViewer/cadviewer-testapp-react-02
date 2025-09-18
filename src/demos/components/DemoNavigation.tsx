import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "../../components";
import { getActiveDemoInfo, getAllDemos } from "../index";

interface DemoNavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Petite icône de navigation (peut être remplacée par une icône plus adaptée)
const DemoNavIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1m-7 0 5 6H7Z"
    />
  </svg>
);

const DemoNavigation: React.FC<DemoNavigationProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [showNavigation, setShowNavigation] = useState(isOpen);
  const location = useLocation();
  const currentDemo = getActiveDemoInfo();
  const allDemos = getAllDemos();

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };
  /*
  const handleLinkClick = () => {
    setShowNavigation(false);
    onClose?.();
  };
*/

  const handleLinkClick = () => {
    setShowNavigation(false);
    onClose?.();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <>
      {/* Floating round button aligné à droite */}
      <div className="fixed right-4 top-1/2 mt-[-10px] transform -translate-y-1/2 z-40 flex flex-col items-center space-y-2">
        <Tooltip
          text={"Demo Navigation"}
          className={"!left-1/2 !-translate-x-full"}
        >
          <button
            onClick={toggleNavigation}
            className="p-3 bg-gradient-to-r from-[#6b6788] to-[#1a0a5e] text-white rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#090046] focus:ring-offset-2 transition-transform duration-150 ease-in-out"
            aria-label="Demo navigation"
            title={currentDemo.name}
          >
            <DemoNavIcon />
          </button>
        </Tooltip>
      </div>

      {/* Dropdown menu with links, styled as overlay à droite du bouton */}
      {showNavigation && (
        <div className="fixed right-20 top-1/2 transform -translate-y-1/2 z-50 w-80 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              CADViewer Demo Navigation
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Choose the sample and feature set you want to explore:
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {allDemos.map((demo) => {
              const isActive = location.pathname === demo.route;

              return (
                <Link
                  key={demo.id}
                  to={demo.route}
                  onClick={handleLinkClick}
                  className={`block w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    isActive
                      ? "bg-orange-50 border-l-4 border-l-orange-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {demo.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {demo.description}
                      </p>
                      <p className="text-xs text-orange-600 mt-1 font-mono">
                        {demo.route}
                      </p>
                    </div>
                    {isActive && (
                      <div className="ml-3">
                        <svg
                          className="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {showNavigation && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowNavigation(false)}
        />
      )}
    </>
  );
};

export default DemoNavigation;
