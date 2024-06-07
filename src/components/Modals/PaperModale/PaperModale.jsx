import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { api_host } from "../../../configs/api_host";
import { createAlert } from "../../Alert/Alert";
import Spinner from "../../Spinner/Spinner";
import SubscriptionAppInformation from "../../subscription/SubscriptionAppInformation";
import ActionModal from "../ActionModal/ActionModal";
import "./PaperModale.scss";
import { Link, useNavigate } from "react-router-dom";
export default function PaperModale({
  info,
  rand,
  isOverWrite = false,
  overWrite,
  overDelete,
  urlUpdateStatus,
}) {
  const { auth } = useSelector(state => state)
const navigate = useNavigate()
  const [onDeleteImage, setOnDeleteImage] = useState(false); // for show waiting
  const [onSend, setOnSend] = useState(false); // for show waiting

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paperInfo, setPaperInfo] = useState({});
  const [images, setImages] = useState([]);

  /** for write message */
  const [sendMessage, setSendMessage] = useState("");
  const [sendMessageOk, setSendMessageOk] = useState("");
  const [sendMessageRej, setSendMessageRej] = useState("");

  /** for open modals */
  const [openModalSendMessage, setOpenModalSendMessage] = useState(false);
  const [openModalAgreeRequest, setOpenModalAgreeRequest] = useState(false);
  const [openModalRejectRequest, setOpenModalRejectRequest] = useState(false);

  const body = document.querySelector("body");

  const ref = useRef();

  const cleanModal = () => {
    setIsModalOpen(false);
    setImages([]);
    setPaperInfo({});
    setSendMessage("");
    setSendMessageOk("");
    setSendMessageRej("");
  };

  const closeModalOverWrite = () => {
    if (isOverWrite) overWrite(returnData());
    cleanModal();
  };
  const closeModalOverDelete = () => {
    overDelete(returnData());
    cleanModal();
  };

  /**
   * This function closes modale after click on esc key .
   * @param {event} event
   */
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModalOverWrite(); // Close the modal or perform any other action
    }
  };

  /**
   * This function closes modale after click on edge modal.
   * @param {Event} e target
   */
  const handleClick = (e) => {
    if (e.target === ref.current) {
      closeModalOverWrite();
    }
  };

  /**
   * This Effect run when this modal open & close for stop background scrolling .
   */
  useEffect(() => {
    if (isModalOpen) {
      body.classList.add("overflow-hidden");
      ref.current.focus();
    } else if (body.classList.contains("overflow-hidden")) {
      body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!rand == 0) {
      setIsModalOpen(true);
      setImages(info.images);
      setPaperInfo(info);
    }
    console.log(info);
  }, [info, rand]);

  /**
   * This function does make request to the server for delete image.
   * @param {number} id imageId
   */
  const handleDeleteImage = (id) => {
    if (onDeleteImage) return;
    setOnDeleteImage(true);
    axios
      .delete(`${api_host}/status/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setOnDeleteImage(false);
          createAlert(response.data.type, response.data.message);
          handleDeleteImageFromObject(id);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setOnDeleteImage(false);
      });
  };

  /**
   * This function does delete image was selected from images array.
   * @param {number} id imageId
   * @returns update the state of images array
   */
  function handleDeleteImageFromObject(id) {
    // Filter out the object with the given id
    const updatedArray = images.filter((obj) => obj.id !== id);
    // Update the state with the updated array
    setImages(updatedArray);
    // Return the updated array
  }

  /**
   * This function make request to server for change state_chake to true.
   */
  const handleAgreeRequest = async () => {
    if (onSend) return;
    setOnSend(true);
    const data = { description: sendMessageOk };
    await axios
      .patch(`${api_host}/status/${urlUpdateStatus}/${paperInfo.id}`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          createAlert(response.data.type, response.data.message);
          setSendMessageOk("");
          setOpenModalAgreeRequest(false);
          closeModalOverDelete();
        }
        if (response.status == 201) {
          createAlert(response.data.type, response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setOnSend(false);
  };

  /**
   * This function make request to server for cancel request.
   */
  const handleRejectRequest = async () => {
    if (onSend) return;
    setOnSend(true);
    const data = { description: sendMessageRej };
    await axios
      .patch(`${api_host}/status/cancelled/${paperInfo.id}`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          createAlert(response.data.type, response.data.message);
          setSendMessageRej("");
          setOpenModalAgreeRequest(false);
          closeModalOverDelete();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setOnSend(false);
  };

  /**
   * This function make request to server for change state_chake to true.
   */
  const handleSendMessage = async () => {
    if (onSend) return;
    setOnSend(true);
    const data = { description: sendMessage };
    await axios
      .post(
        `${api_host}/status/message/${paperInfo.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log('sendMessage',response.data);
        if (response.status == 200) {
          createAlert(response.data.type, response.data.message);
          setSendMessage("");
          setOpenModalSendMessage(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setOnSend(false);
  };

  /**
   * This function combines images after modification with the information object.
   * @returns {paperInfo}  object of data after modification.
   */
  const returnData = () => {
    paperInfo.images = images;
    return paperInfo;
  };

  return (
    <div>
      {isModalOpen && (
        <div
          id="default-modal"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ref={ref}
          tabIndex="-1"
          aria-hidden="true"
          className="show-info-modal p-4 fixed top-0 right-0 bottom-0 left-0 z-40 flex md:justify-center items-center bg-gray-600 bg-opacity-50"
        >
          <div className="relative w-full max-w-5xl h-full">
            <div
              className="relative h-full bg-white rounded-lg shadow-md dark:bg-gray-900 grid grid-cols-1"
              style={{ gridTemplateRows: "min-content auto min-content" }}
            >
              <div className="flex items-center justify-between h-12 px-4 md:px-5 p-1 md:p-2 border-b rounded-t dark:border-gray-600">
                <h3 className="text-مل font-semibold text-gray-900 dark:text-white">
                  معلومات طلب الاكتتاب
                </h3>
                <button
                  onClick={closeModalOverWrite}
                  type="button"
                  className=" bg-transparent hover:bg-gray-200 dark:text-gray-50 text-gray-900 rounded-lg text-2xl w-8 h-8 ms-auto inline-flex md:justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <IoClose />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="body-modal flex flex-col gap-2 px-4 md:px-5 p-1 md:p-2 space-y-4 overflow-auto">
                <SubscriptionAppInformation
                  data={paperInfo}
                  handleDeleteImage={handleDeleteImage}
                  onDeleteImage={onDeleteImage}
                  images={images}
                  allowEditImage={isOverWrite}
                />
                {urlUpdateStatus.length > 0 ? (
                  <>
                    <button
                      className="btn btn-secondary w-52 mx-auto"
                      onClick={() => {
                        localStorage.setItem('paperInfo',JSON.stringify(paperInfo))
                        navigate('/print-page')
                      }}
                    >
                      طباعة
                    </button>
                    <button
                      className="btn btn-success w-52 mx-auto"
                      onClick={() => setOpenModalAgreeRequest(true)}
                    >
                      قبول الطلب
                    </button>

                    <button
                      className="btn btn-primary  w-52 mx-auto"
                      onClick={() => setOpenModalSendMessage(true)}
                    >
                      ارسال رسالة
                    </button>

                    <button
                      className="btn btn-danger  w-52 mx-auto "
                      onClick={() => setOpenModalRejectRequest(true)}
                    >
                      رفض الطلب
                    </button>

                    <br />

                    <ActionModal
                      title="ارسل رسالة"
                      open={openModalSendMessage}
                      close={setOpenModalSendMessage}
                    >
                      {onSend ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          <h5 className="mb-2 text-sm font-medium text-blue-600 dark:text-gray-400 ">
                            هذه الرسالة تظهر في جدول طلبات الاكتتاب لدى المستخدم
                          </h5>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            نص الرسالة:
                          </label>

                          <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="نص الرسالة ..."
                            onChange={(e) => setSendMessage(e.target.value)}
                          ></textarea>
                          <div>
                            <button
                              className="btn btn-primary w-32 mx-auto mb-2"
                              onClick={handleSendMessage}
                              disabled={
                                sendMessage.trim().length > 0 ? false : true
                              }
                            >
                              ارسال
                            </button>
                          </div>
                        </>
                      )}
                    </ActionModal>

                    <ActionModal
                      title="قبول الطلب"
                      open={openModalAgreeRequest}
                      close={setOpenModalAgreeRequest}
                    >
                      {onSend ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          {" "}
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ملاحظات / سبب القبول
                          </label>
                          <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="يرجى كتابة ملاحظة ..."
                            onChange={(e) => setSendMessageOk(e.target.value)}
                          ></textarea>
                          <div>
                            <button
                              className="btn btn-success w-32 mx-auto  mb-2"
                              onClick={handleAgreeRequest}
                            >
                              قبول الطلب
                            </button>
                          </div>
                        </>
                      )}
                    </ActionModal>

                    <ActionModal
                      title="رفض الطلب"
                      open={openModalRejectRequest}
                      close={setOpenModalRejectRequest}
                    >
                      {onSend ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ملاحظات / سبب الرفض
                          </label>
                          <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="يرجى كتابة ملاحظة او سبب الرفض وعدم تركه فارغاً ..."
                            onChange={(e) => setSendMessageRej(e.target.value)}
                          ></textarea>
                          <div>
                            <button
                              className="btn btn-danger w-32 mx-auto mb-2"
                              disabled={
                                sendMessageRej.trim().length > 0 ? false : true
                              }
                              onClick={handleRejectRequest}
                            >
                              رفض الطلب
                            </button>
                          </div>{" "}
                        </>
                      )}
                    </ActionModal>
                  </>
                ) : null}
              </div>
              <div className="flex items-center justify-center h-12 px-4 md:px-5 p-1 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={closeModalOverWrite}
                  type="button"
                  className="py-1 px-5 pb-1.5 text-sm font-bold text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:hover:bg-gray-800 dark:text-gray-50 dark:border-gray-600 dark:hover:text-white dark:bg-gray-700"
                >
                  اغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
