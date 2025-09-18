import * as cadviewer from "cadviewer";
import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Scrollbar from "react-scrollbars-custom";
import { CadviewerContext } from "../../context/Cadviewer.Context";
import useConfig from "../../demos/hooks/useConfig";
import { Image, TenantInfo } from "../../types";
import { SpaceInfo } from "../../types/plan";
import { accordionGroups } from "../../utils/accordionGroups";
import { transformDate } from "../../utils/date";

const iconsSizeClass = "w-4 h-4";

const SpaceAreaIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-square-dashed-icon lucide-square-dashed ${iconsSizeClass}`}
    >
      <path d="M5 3a2 2 0 0 0-2 2" />
      <path d="M19 3a2 2 0 0 1 2 2" />
      <path d="M21 19a2 2 0 0 1-2 2" />
      <path d="M5 21a2 2 0 0 1-2-2" />
      <path d="M9 3h1" />
      <path d="M9 21h1" />
      <path d="M14 3h1" />
      <path d="M14 21h1" />
      <path d="M3 9v1" />
      <path d="M21 9v1" />
      <path d="M3 14v1" />
      <path d="M21 14v1" />
    </svg>
  );
};

const InfoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-list-collapse-icon lucide-list-collapse ${iconsSizeClass}`}
    >
      <path d="m3 10 2.5-2.5L3 5" />
      <path d="m3 19 2.5-2.5L3 14" />
      <path d="M10 6h11" />
      <path d="M10 12h11" />
      <path d="M10 18h11" />
    </svg>
  );
};

const MoneyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign ${iconsSizeClass}`}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
};

const PropertyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-building2-icon lucide-building-2 ${iconsSizeClass}`}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
};

const TwoUsersIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-users-icon lucide-users ${iconsSizeClass}`}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
};

const CalendarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-days-icon lucide-calendar-days ${iconsSizeClass}`}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
};

const RulerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-ruler-icon lucide-ruler ${iconsSizeClass}`}
    >
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </svg>
  );
};

const PercentageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-percent-icon lucide-percent ${iconsSizeClass}`}
    >
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
};

const HandshakeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-handshake-icon lucide-handshake ${iconsSizeClass}`}
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
};

const DealPermanentIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-receipt-text-icon lucide-receipt-text ${iconsSizeClass}`}
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M14 8H8" />
      <path d="M16 12H8" />
      <path d="M13 16H8" />
    </svg>
  );
};

const CalendarStartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-arrow-up-icon lucide-calendar-arrow-up ${iconsSizeClass}`}
    >
      <path d="m14 18 4-4 4 4" />
      <path d="M16 2v4" />
      <path d="M18 22v-8" />
      <path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
    </svg>
  );
};

const CalendarEndIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-arrow-down-icon lucide-calendar-arrow-down ${iconsSizeClass}`}
    >
      <path d="m14 18 4 4 4-4" />
      <path d="M16 2v4" />
      <path d="M18 14v8" />
      <path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
    </svg>
  );
};

const CalendarExpirationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-clock-icon lucide-calendar-clock ${iconsSizeClass}`}
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.3V14" />
      <circle cx="16" cy="16" r="6" />
    </svg>
  );
};

const CalendarKickoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-x2-icon lucide-calendar-x-2 ${iconsSizeClass}`}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="m17 22 5-5" />
      <path d="m17 17 5 5" />
    </svg>
  );
};

const ShoppingCartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-shopping-cart-icon lucide-shopping-cart ${iconsSizeClass}`}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
};

const ChevronDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-down ${iconsSizeClass}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

const ChevronUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-up ${iconsSizeClass}`}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-phone-icon lucide-phone ${iconsSizeClass}`}
    >
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
  );
};

export const EmailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-mail-icon lucide-mail ${iconsSizeClass}`}
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
};

const PersonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-square-user-icon lucide-square-user ${iconsSizeClass}`}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    </svg>
  );
};

// Helper function to find the group for a key
const findGroupForKey = (key: string): string => {
  for (const [group, keys] of Object.entries(accordionGroups)) {
    if (keys.some((k) => key.toLowerCase().includes(k.toLowerCase()))) {
      return group;
    }
  }
  return "Others";
};

const AccordionSection = ({
  title,
  children,
  isOpen,
  toggleOpen,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-2 px-4 text-left  text-[#091b2e]"
      >
        <span className="text-md font-semibold">{title}</span>
        <span className="">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>
      {isOpen && <div className="py-2">{children}</div>}
    </div>
  );
};

const determineIconPerInfo = (title: string, value: string | number) => {
  if (
    value.toString().includes("m²") ||
    title.toLocaleLowerCase().includes("gla") ||
    title.toLocaleLowerCase().includes("footprint")
  ) {
    return <SpaceAreaIcon />;
  } else if (value.toString().includes("$")) {
    return <MoneyIcon />;
  } else if (
    title.toLocaleLowerCase().includes("property") ||
    title.toLocaleLowerCase().includes("mall name") ||
    title.toLocaleLowerCase().includes("space")
  ) {
    return <PropertyIcon />;
  } else if (title.toLocaleLowerCase().includes("gla")) {
    return <TwoUsersIcon />;
  } else if (
    title.toLocaleLowerCase().includes("deal") &&
    value.toString().toLocaleLowerCase().includes("permanent")
  ) {
    return <DealPermanentIcon />;
  } else if (title.toLocaleLowerCase().includes("deal")) {
    return <HandshakeIcon />;
  } else if (
    /\d{2}\/\d{2}\/\d{4}/.test(value.toString()) &&
    title.toLocaleLowerCase().includes("start")
  ) {
    return <CalendarStartIcon />;
  } else if (
    /\d{2}\/\d{2}\/\d{4}/.test(value.toString()) &&
    title.toLocaleLowerCase().includes("end")
  ) {
    return <CalendarEndIcon />;
  } else if (
    /\d{2}\/\d{2}\/\d{4}/.test(value.toString()) &&
    title.toLocaleLowerCase().includes("expiration")
  ) {
    return <CalendarExpirationIcon />;
  } else if (/\d{2}\/\d{2}\/\d{4}/.test(value.toString())) {
    return <CalendarIcon />;
  } else if (value.toString().includes("%")) {
    return <PercentageIcon />;
  } else if (value.toString().includes("ft")) {
    return <RulerIcon />;
  } else if (title.toLocaleLowerCase().includes("kickout")) {
    return <CalendarKickoutIcon />;
  } else if (title.toLocaleLowerCase().includes("merchandise")) {
    return <ShoppingCartIcon />;
  } else if (title.toLocaleLowerCase().includes("employee")) {
    /* 
  "Room #",
    "Square Footage",
    "Employee",
    "Email",
    "Phone",
    "Title",
    "Employye Type Code",
    "Department",
    "Department Description",
    */
    return <PersonIcon />;
  } else if (title.toLocaleLowerCase().includes("department")) {
    return <PropertyIcon />;
  } else if (title.toLocaleLowerCase().includes("department description")) {
    return <PropertyIcon />;
  } else if (title.toLocaleLowerCase().includes("title")) {
    return <PersonIcon />;
  } else if (title.toLocaleLowerCase().includes("employe type code")) {
    return <PersonIcon />;
  } else if (title.toLocaleLowerCase().includes("phone")) {
    return <PhoneIcon />;
  } else if (title.toLocaleLowerCase().includes("email")) {
    return <EmailIcon />;
  } else if (title.toLocaleLowerCase().includes("square footage")) {
    return <RulerIcon />;
  } else if (title.toLocaleLowerCase().includes("room")) {
    return <PropertyIcon />;
  }
  return <InfoIcon />;
};

const InfoItemCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="flex flex-col justify-start items-start p-2">
      <dt className="flex gap-2 items-center text-xs font-medium text-bottom-panel-title truncate text-[#3a5064]">
        {determineIconPerInfo(title, value)}
        {title}
      </dt>
      <dd className="text-sm font-semibold line-clamp-2 text-[#091b2e] pl-6">
        {value}
      </dd>
    </div>
  );
};

const allEqual = (arr: any[]) => arr.every((val) => val === arr[0]);

const CompareInfoItemCard = ({
  title,
  currentSpaceInfo,
  value,
}: {
  title: string;
  currentSpaceInfo: SpaceInfo;
  value: string | number;
}) => {
  const firstValue =
    currentSpaceInfo.detailTabs[0]?.detail[title as keyof TenantInfo];
  const allValuesAreEqual = allEqual(
    currentSpaceInfo.detailTabs.map(
      (detailTab: any) => detailTab.detail[title as keyof TenantInfo]
    )
  );

  return (
    <div className="flex flex-col justify-start items-start p-2">
      <dt className="flex gap-2 items-center text-xs font-medium text-bottom-panel-title truncate text-[#3a5064]">
        {determineIconPerInfo(title, firstValue ?? "")}
        {title}
      </dt>
      <dd className="text-sm font-semibold line-clamp-2 text-[#091b2e] pl-6 flex items-center">
        {
          // @ts-ignore
          allValuesAreEqual ? (
            // @ts-ignore
            firstValue === 0 ? (
              0
            ) : (
              transformDate(firstValue) || "N/A"
            )
          ) : (
            <>
              {
                // @ts-ignore
                currentSpaceInfo.detailTabs
                  .map(
                    (detailTab: any) =>
                      detailTab.detail[title as keyof TenantInfo]
                  )
                  .map((value: any, idx: number) => (
                    <>
                      {!!idx && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 fill-current mx-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                          />
                        </svg>
                      )}
                      <span>
                        {![undefined, ""].includes((value || "").toString())
                          ? transformDate(value)
                          : "N/A"}
                      </span>
                    </>
                  ))
              }
            </>
          )
        }
      </dd>
    </div>
  );
};

interface SpaceObjectInfoProps {
  showInLeftPanel?: boolean;
}

const SpaceObjectInfo = (props: SpaceObjectInfoProps) => {
  const { showInLeftPanel } = props;
  const { config } = useConfig();
  let { ServerBackEndUrl } = config;
  const [images, setImages] = useState<Image[] | null>(null);

  const {
    employees,
    spaceObjects,
    selectedSpaceObjectID,
    setSelectedSpaceObjectID,
    tabIndex,
    setTabIndex,
  } = useContext(CadviewerContext);

  const employee = useMemo(() => {
    if (employees === undefined || selectedSpaceObjectID === undefined)
      return undefined;
    return employees.find(
      (employee) => `${employee.room_id}` === selectedSpaceObjectID
    );
  }, [employees, selectedSpaceObjectID]);

  const spaceObject = useMemo(() => {
    if (spaceObjects === undefined || selectedSpaceObjectID === undefined)
      return undefined;
    const spaceObject = spaceObjects.find(
      (spaceObject) =>
        `${spaceObject.id}`.replaceAll(".", "_").replaceAll(" ", "_") ===
        selectedSpaceObjectID
    );
    return spaceObject;
  }, [spaceObjects, selectedSpaceObjectID]);

  const fetchImages = useCallback(
    async (objectID: string) => {
      try {
        setImages(null);
        const response = await fetch(
          //9.73.1  add /database/ to the url

          ServerBackEndUrl + "/database/photos/" + objectID
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImages(data);
      } catch (error: any) {
        console.error(error.message);
      }
    },
    [ServerBackEndUrl]
  );

  useEffect(() => {
    if (selectedSpaceObjectID) fetchImages(selectedSpaceObjectID);
  }, [fetchImages, selectedSpaceObjectID]);

  if (config.debugMode) console.log({ selectedSpaceObjectID });

  const [accordionState, setAccordionState] = useState<Record<string, boolean>>(
    {
      "Tenant Overview": true,
      Overview: true,
      "Tenant & Space Info": false,
      "Lease Financials": false,
      "Sales Performance": false,
      "Lease Terms": false,
      "Important Dates": false,
      "Legal Triggers & Flags": false,
      Others: false,
    }
  );

  const toggleAccordion = (section: string) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={classNames({
        "h-full overflow-y-hidden overflow-x-hidden transform transition-transform ease-in duration-150 text-bottom-panel-title":
          true,
        "bg-bottom-panel": !showInLeftPanel,
      })}
    >
      <div
        id="SpaceObjectInfoPanelID"
        className="h-full flex flex-col overflow-y-hidden relative"
      >
        <Scrollbar
          style={{ position: "relative" }}
          className="h-full"
          removeTracksWhenNotUsed={false}
          trackYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  ref={elementRef}
                  className="ScrollbarsCustom-Track ScrollbarsCustom-TrackY !bg-bottom-panel-scrollbar-background"
                />
              );
            },
          }}
          thumbYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  ref={elementRef}
                  className="ScrollbarsCustom-Thumb ScrollbarsCustom-ThumbY !bg-bottom-panel-scrollbar-thumb"
                />
              );
            },
          }}
        >
          <div className="px-4 py-4 sm:px-6 absolute right-0 z-50">
            <div className="flex items-start justify-between">
              <div />
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white text-bottom-panel-subtitle hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
                  onClick={() => {
                    setSelectedSpaceObjectID(undefined);
                    cadviewer.cvjs_clearSpaceLayer();
                    // 9.27.3
                    cadviewer.cvjs_hideOnlyPop();
                    // to do
                    // 10.46.9

                    // force a resize of the CADViewer canvas after the space object panel is collapsed

                    //										/*

                    const myDiv = document.getElementById(
                      "SpaceObjectInfoPanelID"
                    ) as HTMLElement;
                    //const computedStyle = window.getComputedStyle(myDiv);
                    const rect = myDiv.getBoundingClientRect();

                    //            							const spaceobjectwidth = parseFloat(computedStyle.getPropertyValue("width"));
                    //            							const spaceobjectheight = parseFloat(computedStyle.getPropertyValue("height"));
                    const spaceobjectwidth = rect.width;
                    const spaceobjectheight = rect.height;
                    // var newheight = cadviewer_height + spaceobjectheight;
                    //										window.alert("Space Object Cleared"+cadviewer_width+" "+cadviewer_height+"  "+newheight+"  "+currentCanvasInstance+ "  "+spaceobjectwidth+"  "+spaceobjectheight);
                    //										cadviewer.cvjs_resizeWindow_fixedSize(cadviewer_width, newheight, currentCanvasInstance as string);

                    /*
										let timeout = setTimeout(async () => {

											console.log("Space Object Cleared"+cadviewer_width+" "+cadviewer_height+"  "+newheight+"  "+currentCanvasInstance+ "  "+spaceobjectwidth+"  "+spaceobjectheight);
											cadviewer.cvjs_resizeWindow_fixedSize(cadviewer_width, cadviewer_height, currentCanvasInstance as string);
											console.log("resize1");
										}, 500);

										console.log("Space Object Cleared"+cadviewer_width+" "+cadviewer_height+"  "+newheight+"  "+currentCanvasInstance+ "  "+spaceobjectwidth+"  "+spaceobjectheight);
										cadviewer.cvjs_resizeWindow_fixedSize(cadviewer_width, cadviewer_height, currentCanvasInstance as string);
										console.log("resize2");
*/
                    //										*/
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
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
        </Scrollbar>
      </div>
    </div>
  );
};

export default SpaceObjectInfo;
