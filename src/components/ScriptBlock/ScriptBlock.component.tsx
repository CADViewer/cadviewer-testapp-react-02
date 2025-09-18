import { useEffect } from "react";
import useConfig from "../../demos/hooks/useConfig";

const ScriptBlock = () => {
  const { config } = useConfig();
  let scriptsString = ``;

  if (config.customHtmlHeaderContent) {
    scriptsString += config.customHtmlHeaderContent;
  }

  useEffect(() => {
    if (!scriptsString) return;

    // Create a container div to parse the HTML string
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = scriptsString;

    // Process each script element
    const scriptElements = tempDiv.getElementsByTagName("script");
    const scriptArray = Array.from(scriptElements);

    // We need to create new script elements for execution to work properly
    scriptArray.forEach((originalScript) => {
      const newScript = document.createElement("script");

      // Copy all attributes
      Array.from(originalScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Copy inline script content
      if (originalScript.innerHTML) {
        newScript.innerHTML = originalScript.innerHTML;
      }

      // Add the new script to the document head
      document.head.appendChild(newScript);
    });
  }, [scriptsString]); // Re-run when the scriptsString changes

  return null; // No visible rendering
};

export default ScriptBlock;
