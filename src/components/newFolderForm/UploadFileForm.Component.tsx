import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { useAlert } from "react-alert";
import useConfig from "../../demos/hooks/useConfig";

const NewFolderForm = ({
  onFinished,
  open,
  path,
}: {
  onFinished: Function;
  open: boolean;
  path: string;
}) => {
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [folderName, setFolderName] = useState("");
  const alert = useAlert();

  const handleCreateFolder = useCallback(async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const response = await fetch(
        ServerBackEndUrl +
          (ServerBackEndUrl.endsWith("/") ? "" : "/") +
          "upload/folder",
        {
          method: "POST",
          body: JSON.stringify({ folder_name: folderName, path }),
          headers,
        }
      );
      const data = await response.json();
      // check if status is not 200
      console.log({ data, response });
      if (!response.ok) {
        alert.error(data.error);
        setError(data.error);
        setSuccess("");
      } else {
        onFinished();
        setError("");
        alert.success("Folder created successfully.");
      }
    } catch (error: any) {
      console.log({ error });
      setError("Something went wrong. Please try again later.");
      alert.error("Something went wrong. Please try again later.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  }, [ServerBackEndUrl, folderName, path]);

  return (
    <Fragment>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          style={{ zIndex: 100000000 }}
          onClose={() => onFinished()}
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
                          onClick={() => onFinished()}
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
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        Create new folder
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
                      <div className="my-4">
                        <div>
                          <label
                            htmlFor="folder_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Folder name
                          </label>
                          <div className="mt-2">
                            <input
                              id="folder_name"
                              name="folder_name"
                              type="text"
                              onChange={(e) => setFolderName(e.target.value)}
                              value={folderName}
                              required
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={handleCreateFolder}
                      disabled={loading || !folderName}
                      className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                    >
                      Create folder
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

export default NewFolderForm;
