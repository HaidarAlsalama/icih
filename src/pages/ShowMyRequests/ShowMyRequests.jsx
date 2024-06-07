import React, { useEffect, useState } from "react";
import { api_host } from "../../configs/api_host";
import axios from "axios";
import { useSelector } from "react-redux";
import { ActionModal, Spinner } from "../../components";
import PaperModalClient from "../../components/Modals/PaperModalClint/PaperModalClint";
import { useNavigate } from "react-router-dom";
import GeneratePaymentModal from "../../components/Modals/GeneratePaymentModal/GeneratePaymentModal";

export default function ShowMyRequests() {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [loadPage, setLoadPage] = useState(true);

  const [subscriberInfo, setSubscriberInfo] = useState({});
  const [randomNumber, setRandomNumber] = useState(0);

  const [requestId, setRequestId] = useState(0);

  const [openModalGeneratePayMent, setOpenModalGeneratePayMent] =
    useState(false);

  useEffect(() => {
    if (role == "guest") {
      navigate("/forbidden");
    } else {
      axios
        .get(`${api_host}/subscriptions/userSubscriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          if (response.status == 200) {
            setLoadPage(false);
            setDataList(response.data.data.reverse());
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  if (role == "guest") {
    return;
  }

  return (
    <div className="flex justify-center items-center w-full md:p-2 mt-5 min-h-96 ">
      <section className="w-full h-full max-w-6xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <h2 className="font-semibold text-gray-700 mb-5 capitalize dark:text-white">
          طلباتي
        </h2>
        <div className="relative  mx-auto overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  المنطقة
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  المقسم
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-nowrap hidden md:table-cell"
                >
                  ملاحظات
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  التاريخ
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0
                ? dataList.map((row, index) => (
                    <tr
                      className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 
                    ${
                      row.state_cancelled == 1
                        ? "!bg-red-200 dark:!bg-red-600 dark:!text-white"
                        : false
                    }
                    
                    `}
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
                        {row.state_cancelled == 1
                          ? "مرفوضة"
                          : row.state_checked == 0 &&
                            row.state_approval == 0 &&
                            row.state_specialize == 0 &&
                            row.state_complated == 0 &&
                            row.payment_status.subscription_fee == 0 &&
                            row.payment_status.insurance_fee == 0 &&
                            row.payment_status.thirdBatch == 0
                          ? "بانتظار تسديد رسم الاكتتاب"
                          : row.state_checked == 0 &&
                            row.state_approval == 0 &&
                            row.state_specialize == 0 &&
                            row.state_complated == 0 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 0 &&
                            row.payment_status.thirdBatch == 0
                          ? "بانتظار المراجعة المبدئية"
                          : row.state_checked == 1 &&
                            row.state_approval == 0 &&
                            row.state_specialize == 0 &&
                            row.state_complated == 0 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 0 &&
                            row.payment_status.thirdBatch == 0
                          ? "بانتظار الموافقة الامنية"
                          : row.state_approval == 1 &&
                            row.state_checked == 1 &&
                            row.state_specialize == 0 &&
                            row.state_complated == 0 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 0 &&
                            row.payment_status.thirdBatch == 0
                          ? "بحاجة استكمال الاوراق"
                          : row.state_approval == 1 &&
                            row.state_checked == 1 &&
                            row.state_specialize == 1 &&
                            row.state_complated == 0 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 0 &&
                            row.payment_status.thirdBatch == 0
                          ? "بحاجة اتمام دفع ال 2.5%"
                          : row.state_approval == 1 &&
                            row.state_checked == 1 &&
                            row.state_specialize == 1 &&
                            row.state_complated == 0 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 1 &&
                            row.payment_status.thirdBatch == 0
                          ? "بانتظار المراجعة"
                          : row.state_approval == 1 &&
                            row.state_checked == 1 &&
                            row.state_specialize == 1 &&
                            row.state_complated == 1 &&
                            row.state_data == 0 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 1 &&
                            row.payment_status.thirdBatch == 0
                          ? "بانتظار طلب التخصيص"
                          : row.state_approval == 1 &&
                            row.state_checked == 1 &&
                            row.state_specialize == 1 &&
                            row.state_complated == 1 &&
                            row.state_data == 1 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 1 &&
                            row.payment_status.thirdBatch == 0
                          ? "بانتظار دفع ال 22.5%"
                          : row.state_approval == 1 &&
                            row.state_checked == 1 &&
                            row.state_specialize == 1 &&
                            row.state_complated == 1 &&
                            row.state_data == 1 &&
                            row.payment_status.subscription_fee == 1 &&
                            row.payment_status.insurance_fee == 1 &&
                            row.payment_status.thirdBatch == 1
                          ? "تم التخصيص بنجاح"
                          : null}
                      </th>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {row.earth.area.name}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {row.earth.number}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {row.notes[0].description}
                      </td>
                      <td className="px-6 py-4 text-nowrap hidden md:table-cell">
                        {row.created_at}
                      </td>
                      <td className="px-6 py-4 flex flex-col justify-around items-center gap-2">
                        <button
                          onClick={() => {
                            setSubscriberInfo(row);
                            setRandomNumber(Math.random());
                          }}
                          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2.5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                        >
                          المزيد
                        </button>
                        {(row.state_cancelled == 0 &&
                          row.state_checked == 0 &&
                          row.state_approval == 0 &&
                          row.state_specialize == 0 &&
                          row.state_complated == 0 &&
                          row.payment_status.subscription_fee == 0 &&
                          row.payment_status.insurance_fee == 0 &&
                          row.payment_status.thirdBatch == 0) ||
                        (row.state_cancelled == 0 &&
                          row.state_approval == 1 &&
                          row.state_checked == 1 &&
                          row.state_specialize == 1 &&
                          row.state_complated == 0 &&
                          row.payment_status.subscription_fee == 1 &&
                          row.payment_status.insurance_fee == 0 &&
                          row.payment_status.thirdBatch == 0) ||
                        (row.state_cancelled == 0 &&
                          row.state_approval == 1 &&
                          row.state_checked == 1 &&
                          row.state_specialize == 1 &&
                          row.state_complated == 1 &&
                          row.state_data == 1 &&
                          row.payment_status.subscription_fee == 1 &&
                          row.payment_status.insurance_fee == 1 &&
                          row.payment_status.thirdBatch == 0) ? (
                          <button
                            onClick={() => {
                              setOpenModalGeneratePayMent(true);
                              setRequestId(row.id);
                            }}
                            className="block text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg text-sm px-2.5 py-1 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                            type="button"
                          >
                            تسديد
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {loadPage ? (
          <div className="w-full flex p-5">
            <Spinner />
          </div>
        ) : null}
        <GeneratePaymentModal
          open={openModalGeneratePayMent}
          close={() => {
            setOpenModalGeneratePayMent(false);
            setRequestId(0);
          }}
          id={requestId}
        ></GeneratePaymentModal>
        <PaperModalClient info={subscriberInfo} rand={randomNumber} />
      </section>
    </div>
  );
}
