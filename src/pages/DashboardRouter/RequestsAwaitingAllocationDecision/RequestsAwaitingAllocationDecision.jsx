import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BreadcrumbContext,
  PaperModale,
  Spinner,
  TableForSubscriber,
} from "../../../components";
import axiosErrorHandler from "../../../components/axiosErrorHandler";
import { api_host } from "../../../configs/api_host";
import { useSelector } from "react-redux";

export default function RequestsAwaitingAllocationDecision() {
  axios.interceptors.response.use((response) => response, axiosErrorHandler);
  const { auth } = useSelector((state) => state);
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
      .get(`${api_host}/subscriptions/waitingCustomization`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
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

  const handleAfterChangeStatusInModal = (obj) => {
    if (subscribers.length <= 0) return;

    const updatedSubscribers = subscribers.filter((item) => item.id !== obj.id);
    setSubscribers(updatedSubscribers);
  };

  return (
    <div className="w-full max-w-7xl_">
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
        overDelete={handleAfterChangeStatusInModal}
        urlUpdateStatus={"afterCustomization"}
      />
    </div>
  );
}
