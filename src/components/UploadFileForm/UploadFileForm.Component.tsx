import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import useConfig from "../../demos/hooks/useConfig";

const UploadFileForm = ({
  onFinished,
  hideButton,
  defaultOpen,
  path,
  onClose,
}: {
  onFinished: Function;
  hideButton?: boolean;
  defaultOpen?: boolean;
  path?: string;
  onClose?: Function;
}) => {
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;
  const [open, setOpen] = useState(defaultOpen || false);
  const [currentTab, setCurrentTab] = useState(
    path ? "Global Folder" : "Personal Folder"
  );
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragState, setDragState] = useState({
    message: "Drop your files here",
    class: "text-primary-500",
  });

  const handleChange = (files: FileList) => {
    setFiles((temps) => [...temps, ...Array.from(files)]);
    setDragState({
      message: "Files dropped",
      class: "text-green-500",
    });
  };
  const handleUpload = useCallback(async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      let formdata = new FormData();
      for (let i = 0; i < files.length; i++) {
        formdata.append("files", files[i], files[i].name);
      }
      if (currentTab === "Global Folder") {
        formdata.append("global", "true");
        formdata.append("path", path ?? "");
      }
      const headers = new Headers();

      const response = await fetch(
        ServerBackEndUrl +
          (ServerBackEndUrl.endsWith("/") ? "" : "/") +
          "upload/files",
        {
          method: "POST",
          body: formdata,
          headers,
        }
      );
      const data = await response.json();
      // check if status is not 200
      console.log({ data, response });
      if (!response.ok) {
        setError(data.error);
        setSuccess("");
      } else {
        onFinished();
        setError("");
        setSuccess("Files uploaded successfully.");
        setFiles([]);
      }
    } catch (error: any) {
      console.log({ error });
      setError("Something went wrong. Please try again later.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  }, [ServerBackEndUrl, setOpen, files]);

  useEffect(() => {
    if (!open) {
      setError("");
      setSuccess("");
      if (onClose) {
        onClose();
      }
    }
  }, [open, onClose]);

  console.log({ files });

  return (
    <Fragment>
      {hideButton ? (
        <div />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-primary-500 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white mr-2 mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          {config.UploadNewFile}
        </button>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          style={{ zIndex: 100000000 }}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 sm:mt-5">
                      <div className="absolute right-2 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-primary-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      {!path && (
                        <div className="border-b border-gray-200 mb-4">
                          <nav
                            aria-label="Tabs"
                            className="-mb-px flex space-x-8"
                          >
                            {["Personal Folder", "Global Folder"].map((tab) => (
                              <span
                                key={tab}
                                onClick={() => setCurrentTab(tab)}
                                className={classNames(
                                  currentTab == tab
                                    ? "border-primary-500 text-primary-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium cursor-pointer"
                                )}
                              >
                                {tab}
                              </span>
                            ))}
                          </nav>
                        </div>
                      )}
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        {path
                          ? "Upload new files"
                          : currentTab === "Personal Folder"
                          ? "Upload new files to your personal directory"
                          : "Upload new files to the global directory"}
                      </Dialog.Title>
                      {error !== "" && (
                        <div className="rounded-md bg-red-50 p-4 mt-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-red-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">
                                {error}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
                      {success !== "" && (
                        <div className="rounded-md bg-green-100 p-4 mt-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-green-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-green-500">
                                {success}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="mt-4">
                        <FileUploader
                          handleChange={handleChange}
                          name="files"
                          multiple
                          required
                          hoverTitle={"Drop your files here"}
                          maxSize={config.maxUploadSize}
                          minSize={0}
                          classes={
                            "min-h-56 flex items-center justify-center border-custom "
                          }
                          children={
                            <span className={dragState.class}>
                              {dragState.message}
                            </span>
                          }
                          onTypeError={(msg: string) => {
                            setDragState({
                              message: msg,
                              class: "text-red-500",
                            });
                          }}
                          onSizeError={(msg: string) => {
                            setDragState({
                              message: msg,
                              class: "text-red-500",
                            });
                          }}
                          onDrop={(msg: string) => {
                            setDragState({
                              message: "Files dropped",
                              class: "text-green-500",
                            });
                          }}
                        />
                      </div>
                      {/*	List current selected files */}
                      {files.map((file, index) => (
                        <div key={index + file.name} className="mt-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              {file.name}
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setFiles(files.filter((f, i) => i !== index));
                                }}
                                className="inline-flex items-center justify-center rounded-md bg-red-500 text-white w-6 h-6"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={files.length === 0 || loading}
                      className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                    >
                      Upload
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export default UploadFileForm;
