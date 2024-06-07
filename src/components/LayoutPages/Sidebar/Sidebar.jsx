import { CgMenuLeft } from "react-icons/cg";
import { FaRegSmile } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { LuLayoutDashboard, LuLayoutList } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { PiGearBold, PiMapPinArea } from "react-icons/pi";

import { useSelector } from "react-redux";
import "./Sidebar.scss";
import GroupLinks from "./sidebarCompo/SidebarGroupLinks/SidebarGroupLinks.component";

import { HiOutlineDocumentCheck } from "react-icons/hi2";

import { BiTable } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuFileWarning } from "react-icons/lu";
import {
  MdOutlineDashboardCustomize,
  MdOutlineDocumentScanner,
  MdOutlineLocalPolice,
} from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";

import { useState } from "react";
import logo from "./../../../images/logo2.png";

const listLinks = [
  {
    title: "لوحة التحكم",
    url: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "الطلبات الجديدة",
    url: "#",
    icon: LuLayoutList,
    type: "list",
    content: [
      {
        title: "إتمام دفع الرسوم",
        url: "/dashboard/requests-awaiting-first-payment",
        icon: LiaFileInvoiceDollarSolid,
        count: 5
      },
      {
        title: "بانتظار التدقيق",
        url: "/dashboard/requests-are-pending-review",
        icon: HiOutlineDocumentCheck,
        count: 0
      },
      {
        title: "بانتظار الموافقة الأمنية",
        url: "/dashboard/requests-awaiting-security-approval",
        icon: MdOutlineLocalPolice,
      },
      {
        title: "بانتظار اتمام الاوراق",
        url: "/dashboard/requests-awaiting-compleat-papers",
        icon: TiDocumentAdd,
      },
      {
        title: "بانتظار مراجعة الاوراق",
        url: "/dashboard/requests-awaiting-paper-review",
        icon: MdOutlineDocumentScanner,
      },
      {
        title: "بانتظار قرار التخصيص",
        url: "/dashboard/requests-awaiting-allocation-decision",
        icon: MdOutlineDashboardCustomize,
      },
    ],
  },

  {
    title: "جدول المستثمرين",
    url: "#",
    icon: BiTable,
  },
  {
    title: "الطلبات التي تم رفضها",
    url: "/dashboard/requests-canceled",
    icon: LuFileWarning,
  },
  {
    title: "إدارة المناطق والمقاسم",
    url: "/dashboard/management-areas-and-sections",
    icon: PiMapPinArea,
  },
];

const listLinks2 = [
  { title: "Profile", url: "/dashboard/#", icon: FaRegSmile },
  { title: "Settings", url: "/dashboard/settings", icon: PiGearBold },
  { title: "Logout", url: "/logout", icon: MdLogout },
];

export default function Sidebar({ handleStateSidebar }) {
  const sidebarState = useSelector((state) => state.layout.layoutState);
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <>
      {sidebarState == "openSmall" ? (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-gray-900/50 right-0"
          onClick={() => handleStateSidebar()}
        ></div>
      ) : null}
      <aside
        className={`${sidebarState} fixed top-0 ltr:left-0 rtl:right-0-0 z-40 lg:w-64 md:w-16 w-0 h-full duration-150 sidebar`}
      >
        <div
          className="grid grid-cols-1 h-full md:px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800  duration-150 sidebar-content"
          style={{ gridTemplateRows: "min-content auto min-content" }}
        >
          <div
            className={`w-full flex md:flex-col lg:flex-row items-center justify-between overflow-hidden sidebar-head`}
          >
            <button
              className="text-xl hover:bg-red-600 hover:text-white rounded-md p-2 duration-200 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
              onClick={handleStateSidebar}
            >
              <CgMenuLeft />
            </button>
            <h1 className="text-4xl font-extrabold mb-1 text-red-600 dark:text-blue-600">
              <img
                src={logo}
                alt=""
                className="dark:filter dark:invert dark:grayscale"
              />
            </h1>
            {/* <button
              onClick={() => setOpenNotifications((prev) => !prev)}
              className={`relative invisible_ lg:visible text-xl hover:bg-red-600 hover:text-white rounded-md p-2 duration-200 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600 notification`}
            >
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full -top-[2px] -left-[2px] dark:border-gray-900 dark:bg-blue-600">
                2
              </div>
              <FiBell />
            </button> */}
          </div>
          <GroupLinks list={listLinks} />
          <GroupLinks list={listLinks2} />
        </div>
      </aside>
    </>
  );
}
