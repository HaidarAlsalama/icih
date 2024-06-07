import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function Collapse({ children, title }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  return (
    <div>
      <h2>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-2 font-medium  shadow-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${
            openCollapse ? " rounded-t-md bg-slate-100 dark:bg-gray-800" : "rounded-md"
          }`}
          onClick={() => setOpenCollapse((prev) => !prev)}
        >
          <span>{title}</span>
          {openCollapse ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </h2>
      <div
        className={`${openCollapse ? "block" : "hidden"}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 shadow-md border-t-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-b-md dark:border-gray-700 ">
          {children}
        </div>
      </div>
    </div>
  );
}
