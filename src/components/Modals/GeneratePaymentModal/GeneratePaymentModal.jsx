import React, { useEffect, useState } from "react";
import ActionModal from "../ActionModal/ActionModal";
import { api_host } from "../../../configs/api_host";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

export default function GeneratePaymentModal({ open, close, id = 0 }) {
  const { token } = useSelector((state) => state.auth);
  const [paymentInfo, setPaymentInfo] = useState({});
const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    if (id != 0) {
      axios
        .post(
          `${api_host}/generate-payment/${id}`,
          { nemoo: "nemoo" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setPaymentInfo(response.data.data);
            setIsLoad(true)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if(!open) {
      setPaymentInfo({})
    } 
  }, [open]);

  return (
    <ActionModal
      open={open}
      title={" انشاء رابط دفع لطلب اكتتاب"}
      close={close}
    >
      {paymentInfo.payment && isLoad ? (
        <>
          <div className="flex gap-4 items-center flex-col ">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-300">
              رقم المعاملة:
            </span>
            <span className="font-bold text-3xl text-gray-900 dark:text-gray-300">
              {paymentInfo?.payment.orderKey}
            </span>
          </div>

          <div className="flex gap-4 items-center flex-col ">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-300">
              المبلغ:
            </span>
            <span className="font-bold text-3xl text-gray-900 dark:text-gray-300">
              {paymentInfo?.payment.amount} <span>ل.س</span>
            </span>
          </div>

          <a className="btn btn-info w-44 mx-auto" href={paymentInfo?.checkoutUrl}>
            ادفع
          </a>
        </>
      ) : <Spinner page />}
    </ActionModal>
  );
}
