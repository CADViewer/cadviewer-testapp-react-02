import React, { useContext, useState } from "react";
import { CadviewerContext } from "../context/Cadviewer.Context";
import AlertModal from "./AlertModal/AlertModal";

interface DisabledClickWrapperProps {
  children: React.ReactNode;
  message?: string;
  className?: string;
}

const DEFAULT_MESSAGE =
  "Login or Register to access this fonction, actually you only have access to demo";

const DisabledClickWrapper = ({
  children,
  message = DEFAULT_MESSAGE,
  className = "",
}: DisabledClickWrapperProps) => {
  const { disableFeature } = useContext(CadviewerContext);
  const [isAlertOpen, setAlertOpen] = useState(false);

  // Affiche la modal lors du clic
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAlertOpen(true);
  };
  return (
    <>
      <span
        className={className}
        style={
          disableFeature ? { cursor: "not-allowed", position: "relative" } : {}
        }
      >
        {children}
        {disableFeature && (
          <>
            <div className="">
              <div
                className="absolute top-0 right-0 left-0 bottom-0 z-50"
                onClick={handleClick}
              />
            </div>
          </>
        )}
      </span>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setAlertOpen(false)}
        title="Access Restricted"
        description={message}
        closeText="Close"
      />
    </>
  );
};

export default DisabledClickWrapper;
