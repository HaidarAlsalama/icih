import React from "react";

export default function TableForSubscriber({
  children,
  loadPage,
  data,
  action1,
  action2,
}) {
  return (
    <div className="relative  mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              الاسم
            </th>
            <th scope="col" className="px-6 py-3">
              المنطقة
            </th>
            <th scope="col" className="px-6 py-3">
              المقسم
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              نوع الصناعة
            </th>
            <th scope="col" className="px-6 py-3">
              التاريخ
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loadPage && data.length > 0
            ? data.map((subscriber, index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope=""
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-nowrap text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {subscriber.name}
                  </th>
                  <td className="px-6 py-4">{subscriber.earth.area.name}</td>
                  <td className="px-6 py-4">{subscriber.earth.number}</td>
                  <td className="px-6 py-4">{subscriber.Industry_name}</td>
                  <td className="px-6 py-4 text-nowrap">
                    {subscriber.created_at}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        action1(subscriber);
                        action2(Math.random());
                      }}
                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2.5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      المزيد
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {loadPage && !data.length > 0 ? (
        <div className="w-full text-center p-5 font-semibold dark:text-white">
          <h1>لا يوجد بيانات</h1>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
