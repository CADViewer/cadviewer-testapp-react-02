import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { useNavigate } from "react-router-dom";

import { Header, VersionDisplay } from "../../components";

import * as cadviewer from "cadviewer";
import { useAlert } from "react-alert";
import { FileUploader } from "react-drag-drop-files";
import useConfig from "../../demos/hooks/useConfig";
import EventSystem from "../../events/EventSystem";

function Settings() {
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;

  const navigate = useNavigate();

  const [licenceData, setLicenceData] = useState("");
  const [leftPanelOpen, setLeftPanelOpen] = useState(
    config.defaultLeftPanelOpen
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [axlicFile, setAxlicFile] = useState<File | null>(null);
  const [ll_licFile, setLl_licFile] = useState<File | null>(null);
  const [dl_licFile, setDl_licFile] = useState<File | null>(null);
  const [cvjsContent, setCvjsContent] = useState<string>("");
  const alert = useAlert();

  const [dragStateAxLic, setDragStateAxLic] = useState({
    message: "Drop your axlic.key here",
    class: "text-primary-500",
  });

  const [dragStateDwmergeLic, setDragStateDwmergeLic] = useState({
    message: "Drop your ll_lic.key here",
    class: "text-primary-500",
  });

  const [dragStateLinklistLic, setDragStateLinklistLic] = useState({
    message: "Drop your dl_lic.key here",
    class: "text-primary-500",
  });

  const checkLicence = useCallback(async (initial: boolean = false) => {
    try {
      var endpoint = "licences/verify";
      if (ServerBackEndUrl.substring(ServerBackEndUrl.length - 1) == "/") {
        // do nothing
      } else {
        endpoint = "/" + endpoint;
      }

      const response = await fetch(ServerBackEndUrl + endpoint, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("Network response issue: " + response.statusText);
        throw new Error("Network response issue (see console log)");
      }
      const data = await response.json();
      if (!initial) setLicenceData(data.stdout);
      setCvjsContent(data.cvjs);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  const handleAxlicChange = (file: File) => {
    if (file.name !== "axlic.key") {
      setDragStateAxLic({
        message: "The filename should be axlic.key",
        class: "text-orange-500",
      });
    } else {
      setAxlicFile(file);
      setDragStateAxLic({
        message: "licence key file dropped",
        class: "text-green-500",
      });
    }
  };

  const handlellLicChange = (file: File) => {
    if (file.name !== "ll_lic.key") {
      setDragStateLinklistLic({
        message: "The filename should be ll_lic.key",
        class: "text-orange-500",
      });
    } else {
      setLl_licFile(file);
      setDragStateLinklistLic({
        message: "licence key file dropped",
        class: "text-green-500",
      });
    }
  };

  const handleDlLicChange = (file: File) => {
    if (file.name !== "dl_lic.key") {
      setDragStateDwmergeLic({
        message: "The filename should be dl_lic.key",
        class: "text-orange-500",
      });
    } else {
      setDl_licFile(file);
      setDragStateDwmergeLic({
        message: "licence key file dropped",
        class: "text-green-500",
      });
    }
  };

  const uploadLicenceFile = async (file: File, path: string, msg: string) => {
    const formData = new FormData();
    formData.append("file", file);
    setSubmitting(true);

    try {
      const response = await fetch(
        config.ServerBackEndUrl +
          (config.ServerBackEndUrl.endsWith("/") ? "" : "/") +
          path,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      // check if status is not 200
      console.log({ data, response });
      if (!response.ok) {
        alert.error(data.error);
      } else {
        alert.success(msg);
        setLicenceData(data.stdout);
        setError(null);
      }
    } catch (error: any) {
      console.log({ error });
      // setFormData(form => ({...form, error: "Something went wrong. Please try again later."}))
      alert.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const applyCvjsLicence = async () => {
    setSubmitting(true);
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        config.ServerBackEndUrl +
          (config.ServerBackEndUrl.endsWith("/") ? "" : "/") +
          "licences/cvjs/applylicense",
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            cvjs: cvjsContent,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert.error(data.error);
      } else {
        alert.success("Cvjs licence applied successfully");
      }
    } catch (error: any) {
      console.log({ error });
      alert.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    checkLicence(true);
  }, []);

  return (
    <div
      className={classNames({
        "h-screen max-h-screen overflow-y-hidden": true,
        "min-h-screen h-full w-full": true,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <PanelGroup
        autoSaveId="main-content-panel"
        direction="horizontal"
        onLayout={(sizes) => cadviewer.cvjs_hideOnlyPop()}
      >
        <Panel order={2}>
          {/* Main conntent */}
          <div className="h-screen max-h-screen overflow-y-hidden flex flex-col">
            <Header
              leftPanelOpen={leftPanelOpen}
              setLeftPanelOpen={setLeftPanelOpen}
            />
            <main
              className={classNames({
                "h-full relative flex-1  overflow-x-hidden": true,
              })}
            >
              <PanelGroup autoSaveId="right-content-panel" direction="vertical">
                <Panel
                  order={1}
                  onResize={(size) => {
                    EventSystem.publish("cadviewer.handle_resize", "");
                  }}
                >
                  <div className={"flex flex-col h-full overflow-y-auto"}>
                    <div className="mx-5 md:mx-96 my-8 space-y-8 sm:space-y-8">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                              Licence
                            </h2>
                            <p className="mt-1 text-base leading-6 text-gray-700">
                              Get licence information and server details.
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                navigate("/");
                              }}
                              className={`inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mr-2
							        ${
                        config.helperMethodsActionSize === "small"
                          ? " text-xs my-1 mr-1 py-[2px] px-1"
                          : config.helperMethodsActionSize === "large"
                          ? " text-base my-2 mr-2 py-2 px-3"
                          : " text-sm my-2 mr-2 py-1 px-3"
                      }`}
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
                                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                              </svg>
                              <span>{config.settingsGoHomepageButtonText}</span>
                            </button>
                          </div>
                        </div>

                        <pre className="mt-1 text-base leading-6 text-gray-500">
                          {licenceData}
                        </pre>

                        <button
                          onClick={() => checkLicence()}
                          type="submit"
                          className="rounded-md bg-primary-500 px-3 my-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          Check licence
                        </button>
                      </div>
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Update CVJS licence content
                        </h2>
                        <p className="mt-1 text-base leading-6 text-gray-700"></p>
                        <div className="mt-4">
                          <textarea
                            rows={4}
                            name="cvjs"
                            id="cvjs"
                            value={cvjsContent}
                            onChange={(e) => setCvjsContent(e.target.value)}
                            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>

                        <button
                          disabled={submitting}
                          onClick={applyCvjsLicence}
                          type="submit"
                          className="rounded-md bg-primary-500 px-3 my-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          Apply cvjs licence
                        </button>
                      </div>

                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Update AutoXchange licence
                        </h2>
                        <p className="mt-1 text-base leading-6 text-gray-700">
                          Drag and drop your AutoXchange axlic.key licence down
                          below.
                        </p>
                        <div className="mt-4">
                          <FileUploader
                            handleChange={handleAxlicChange}
                            name="file"
                            required
                            hoverTitle={"Drop your file axlic.key file here"}
                            minSize={0}
                            classes={
                              "min-h-56 flex items-center justify-center border-custom "
                            }
                            children={
                              <span className={dragStateAxLic.class}>
                                {dragStateAxLic.message}
                              </span>
                            }
                            onTypeError={(msg: string) => {
                              setDragStateAxLic({
                                message: msg,
                                class: "text-red-500",
                              });
                            }}
                            onSizeError={(msg: string) => {
                              setDragStateAxLic({
                                message: msg,
                                class: "text-red-500",
                              });
                            }}
                            onDrop={(msg: string) => {
                              // setDragStateAxLic({
                              //   message: 'Licence file dropped',
                              //   class: "text-green-500"
                              // })
                            }}
                          />
                        </div>

                        <button
                          disabled={!axlicFile || submitting}
                          onClick={async () => {
                            if (axlicFile) {
                              await uploadLicenceFile(
                                axlicFile,
                                "licences/autoxchange/applylicense",
                                "AutoXchange licence file updated successfully"
                              );
                            }
                          }}
                          type="submit"
                          className="rounded-md bg-primary-500 px-3 my-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          Upload {axlicFile && <span>{axlicFile.name}</span>}
                        </button>
                      </div>

                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Update Linklist licence
                        </h2>
                        <p className="mt-1 text-base leading-6 text-gray-700">
                          Drag and drop your Linklist licence down below.
                        </p>
                        <div className="mt-4">
                          <FileUploader
                            handleChange={handlellLicChange}
                            name="file"
                            required
                            hoverTitle={"Drop your file ll_lic.key file here"}
                            minSize={0}
                            classes={
                              "min-h-56 flex items-center justify-center border-custom "
                            }
                            children={
                              <span className={dragStateLinklistLic.class}>
                                {dragStateLinklistLic.message}
                              </span>
                            }
                            onTypeError={(msg: string) => {
                              setDragStateLinklistLic({
                                message: msg,
                                class: "text-red-500",
                              });
                            }}
                            onSizeError={(msg: string) => {
                              setDragStateLinklistLic({
                                message: msg,
                                class: "text-red-500",
                              });
                            }}
                            onDrop={(msg: string) => {}}
                          />
                        </div>

                        <button
                          disabled={!ll_licFile || submitting}
                          onClick={async () => {
                            if (ll_licFile) {
                              await uploadLicenceFile(
                                ll_licFile,
                                "licences/linklist/applylicense",
                                "Linklist licence file updated successfully"
                              );
                            }
                          }}
                          type="submit"
                          className="rounded-md bg-primary-500 px-3 my-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          Upload {ll_licFile && <span>{ll_licFile.name}</span>}
                        </button>
                      </div>

                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Update Dwgmerge licence
                        </h2>
                        <p className="mt-1 text-base leading-6 text-gray-700">
                          Drag and drop your Dwgmerge licence down below.
                        </p>
                        <div className="mt-2">
                          <VersionDisplay showLabel={true} />
                        </div>
                        <div className="mt-4">
                          <FileUploader
                            handleChange={handleDlLicChange}
                            name="file"
                            required
                            hoverTitle={"Drop your file dl_lic.key file here"}
                            minSize={0}
                            classes={
                              "min-h-56 flex items-center justify-center border-custom "
                            }
                            children={
                              <span className={dragStateDwmergeLic.class}>
                                {dragStateDwmergeLic.message}
                              </span>
                            }
                            onTypeError={(msg: string) => {
                              setDragStateDwmergeLic({
                                message: msg,
                                class: "text-red-500",
                              });
                            }}
                            onSizeError={(msg: string) => {
                              setDragStateDwmergeLic({
                                message: msg,
                                class: "text-red-500",
                              });
                            }}
                            onDrop={(msg: string) => {}}
                          />
                        </div>

                        <button
                          disabled={!dl_licFile || submitting}
                          onClick={async () => {
                            if (dl_licFile) {
                              await uploadLicenceFile(
                                dl_licFile,
                                "licences/dwgmerge/applylicense",
                                "Dwgmerge licence file updated successfully"
                              );
                            }
                          }}
                          type="submit"
                          className="rounded-md bg-primary-500 px-3 my-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          Upload {dl_licFile && <span>{dl_licFile.name}</span>}
                        </button>
                      </div>
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </main>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Settings;
