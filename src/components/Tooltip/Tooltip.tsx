import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

const Tooltip = ({ children, text, className }: TooltipProps) => {
  const [show, setShow] = useState<boolean>(false);

  const showTip = () => {
    setShow(true);
  };

  const hideTip = () => {
    setShow(false);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {show && (
        <div
          className={
            "absolute rounded-md shadow-md  bg-gray-800 p-2 text-xs text-white min-w-32 text-center " +
            (className ?? "")
          }
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000000,
          }}
        >
          {text}
        </div>
        // <span className="absolute top-10 scale-100 rounded bg-gray-800 p-2 text-xs text-white">{text}</span>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
