import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./../../images/logo2.png";

export default function Home() {
  const { auth } = useSelector((status) => status);
  useEffect(() => {
    // console.log(userAuth);s
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="dark:filter dark:invert dark:grayscale px-2">
        <img src={logo} className="h-auto" alt="Flowbite Logo" />
      </div>
      {auth.role == "employee" ? (
        <Link
          className="px-6 py-2 leading-5 text-center w-56 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-semibold mt-4"
          to={"/dashboard"}
        >
          لوحة التحكم
        </Link>
      ) : auth.role == "subscriper" ? (
        <>
          <div className="flex gap-2">
            
            <Link
              className="px-6 py-2 w-56 leading-5 text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-semibold mt-4"
              to={"/show-dividers"}
            >
              عرض المناطق و المقاسم
            </Link>
            <Link
              className="px-6 py-2 w-56 leading-5 text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-semibold mt-4"
              to={"/show-my-requests"}
            >
              عرض الطلبات المقدمة
            </Link>
          </div>
          <div className="flex gap-2">
            
            <Link
              className="px-6 py-2 w-56 leading-5 text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-semibold mt-4"
              to={"/fatora-payment"}
            >
              تسديد الفواتير
            </Link>
            <Link
              className="px-6 py-2 w-56 leading-5 text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-semibold mt-4"
              to={"/fatora-payment"}
            >
              تسديد الاقساط
            </Link>
          </div>
        </>
      ) : (
        <Link
          className="px-6 py-2 leading-5 w-56 text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-semibold mt-4"
          to={"/login"}
        >
          سجل الدخول
        </Link>
      )}
    </div>
  );
}
