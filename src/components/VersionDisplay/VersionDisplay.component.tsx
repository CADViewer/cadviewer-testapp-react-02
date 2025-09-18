import React, { useContext } from "react";
import { CadviewerContext } from "../../context/Cadviewer.Context";

interface VersionDisplayProps {
  className?: string;
  showLabel?: boolean;
}

const VersionDisplay: React.FC<VersionDisplayProps> = ({
  className = "",
  showLabel = true,
}) => {
  const { appVersion } = useContext(CadviewerContext);

  return (
    <div className={`text-xs text-gray-500 ${className}`}>
      {showLabel && <span>Version: </span>}
      <span className="font-mono">{appVersion}</span>
    </div>
  );
};

export default VersionDisplay;
