import { StepType, TourProvider } from "@reactour/tour";
import { useEffect, useState } from "react";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ScriptBlock from "./components/ScriptBlock";
import { CadviewerContextProvider } from "./context/Cadviewer.Context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import config from "./utils/config";
import { NotFound } from "./views/NotFound/NotFound";

// Wrapper for each demo that forces re-render with the right config
const DemoWrapper: React.FC<{ demoId: string }> = ({ demoId }) => {
  return <App key={demoId} />;
};

const steps = [
  !config.hideLeftHamburgerMenu
    ? {
        selector: "#hamburger-menu",
        content: (
          <div>
            This part is to expose linked content with Spaces on the floorplan.
            (used for Visual Query but not for CADViewer demo)
            <img src="/cvlogo.svg" alt="cvlogo" />
            <a
              href="https://www.visualquery.com"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about Visual Query
            </a>
          </div>
        ),
      }
    : undefined,
  config.enableRightFileModalPanel
    ? {
        selector: "#folder-structure-button",
        content:
          "Use the Folder Structure button to browse the available demo files and upload your own files. Note that there is a limit of 8 files and 10MB total file-size per user. Have fun! -and contact us if you need an extension - we are happy to help!",
      }
    : undefined,
];

const BuildRoute = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  if (!mounted) {
    return <div />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path={"/"} element={<DemoWrapper demoId="default" />} />

        {/* Demo routes */}
        {config.enableDemoNavigation && (
          <>
            <Route path={"/demo1"} element={<DemoWrapper demoId="demo1" />} />
            <Route path={"/demo2"} element={<DemoWrapper demoId="demo2" />} />
            <Route path={"/demo3"} element={<DemoWrapper demoId="demo3" />} />
            <Route path={"/demo4"} element={<DemoWrapper demoId="demo4" />} />
          </>
        )}

        <Route
          path={"/:file1/:file2"}
          element={<DemoWrapper demoId="default" />}
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

root.render(
  <TourProvider
    steps={steps.filter((step) => step !== undefined) as StepType[]}
    scrollSmooth
    styles={{
      popover: (base) => ({
        ...base,
        "--reactour-accent": "#0f3557",
        borderRadius: 10,
      }),
      badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
      close: (base) => ({ ...base, right: "auto", left: 8, top: 8 }),
    }}
  >
    <AlertProvider template={AlertTemplate} {...options}>
      <ScriptBlock />
      <CadviewerContextProvider>
        <BuildRoute />
      </CadviewerContextProvider>
    </AlertProvider>
  </TourProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
