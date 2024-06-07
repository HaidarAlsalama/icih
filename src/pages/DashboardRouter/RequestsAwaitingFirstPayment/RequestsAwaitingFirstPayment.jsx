import axios from "axios";
import axiosErrorHandler from "./../../../components/axiosErrorHandler";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BreadcrumbContext, PaperModale, Spinner, TableForSubscriber } from "../../../components";
import { api_host } from "../../../configs/api_host";

/** @todo remove row from table after change status_approval  */

export default function RequestsAwaitingFirstPayment() {
  axios.interceptors.response.use((response) => response, axiosErrorHandler);
  const { token } = useSelector(state => state.auth);
  const [subscribers, setSubscribers] = useState([]);

  const [subscriberInfo, setSubscriberInfo] = useState({});
  const [randomNumber, setRandomNumber] = useState(0);
  const [loadPage, setLoadPage] = useState(false);

  // const navigate = useNavigate()

  // useEffect(() => {
  //   return () => {
  //     navigate('/waiting')
  //   }
  // },[])

  useEffect(() => {
    axios
      .get(`${api_host}/subscriptions/orderUnpaid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setSubscribers(response.data.data);
          setLoadPage(true);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleAfterProcessingInModal = (obj) => {
    if (subscribers.length <= 0) return;

    let objectToReplace = obj;
    let index = subscribers.findIndex((item) => item.id === objectToReplace.id);
    if (index !== -1) {
      subscribers[index] = objectToReplace;
    }

    setSubscribers(subscribers); // ستطبع المصفوفة بعد التحديث
  };

  const handleAfterChangeStatusingInModal = (obj) => {
    if (subscribers.length <= 0) return;

    const updatedSubscripers = subscribers.filter((item) => item.id !== obj.id);
    setSubscribers(updatedSubscripers);
  };

  return (
    <div className="w-full p-4">
      <TableForSubscriber
        loadPage={loadPage}
        data={subscribers}
        action1={setSubscriberInfo}
        action2={setRandomNumber}
      />

      {!loadPage ? (
        <div className="w-ful flex p-5">
          <Spinner />
        </div>
      ) : null}
       <PaperModale
        info={subscriberInfo}
        rand={randomNumber}
        // overWrite={handleAfterProcessingInModal}
        overDelete={() =>  false}
        urlUpdateStatus={""}
      />
    </div>
  );
}
