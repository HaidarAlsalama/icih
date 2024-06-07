import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { api_host } from "../../../configs/api_host";
import { createAlert } from "../../Alert/Alert";
import Spinner from "../../Spinner/Spinner";
import SubscriptionAppInformation from "../../subscription/SubscriptionAppInformation";
import ActionModal from "../ActionModal/ActionModal";
import "./PaperModalClint.scss";
import InputField from "../../InputField/InputField";
import ContainerInputs from "../../ContainerInputs/ContainerInputs";
export default function PaperModalClient({ info, rand, overDelete }) {
  const { token } = useSelector((state) => state.auth);

  const [onDeleteImage, setOnDeleteImage] = useState(false); // for show waiting
  const [allowChange, setAllowChange] = useState(false); //
  const [allowContinueAddImage, setContinueAddImage] = useState(false); //
  const [onSendForm, setOnSendForm] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paperInfo, setPaperInfo] = useState({});
  const [images, setImages] = useState([]);

  const body = document.querySelector("body");

  const [image, setImage] = useState("");

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  const ref = useRef();
  useEffect(() => {
    if (paperInfo.state_checked) {
      if (paperInfo.state_checked == 0 && paperInfo.state_cancelled == 0)
        setAllowChange(true);
      if (
        paperInfo.state_checked == 1 &&
        paperInfo.state_cancelled == 0 &&
        paperInfo.state_approval == 1 &&
        paperInfo.state_specialize == 0
      )
        setContinueAddImage(true);
    }
  }, [paperInfo]);

  const cleanModal = () => {
    setIsModalOpen(false);
    setImages([]);
    setPaperInfo({});
    setAllowChange(false);
    setContinueAddImage(false);
  };

  const closeModalOverWrite = () => {
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
      .delete(`${api_host}/subscriptions/delete-image/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
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
   * This function does make request to the server for add image.
   */
  const handleAddImage = () => {
    axios
      .post(`${api_host}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
   * This function combines images after modification with the information object.
   * @returns {paperInfo}  object of data after modification.
   */
  const returnData = () => {
    paperInfo.images = images;
    return paperInfo;
  };

  const handleContinueAddImage = async (e) => {
    e.preventDefault()
    setOnSendForm(false);

    const formData = new FormData();
    formData.append("url[0]", image1);
    formData.append("url[1]", image2);
    formData.append("url[2]", image3);
    formData.append("url[3]", image4);

    await axios
      .post(`${api_host}/subscriptions/upload_documents/${paperInfo.id}`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.type == "Success") {
            createAlert(response.data.type, response.data.message);
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
      setOnSendForm(true);

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
          <div className="relative w-full max-w-6xl h-full">
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
                  allowEditImage={allowChange}
                />
                {allowContinueAddImage ? (
                  <div>
                    <form onSubmit={handleContinueAddImage}>
                      <ContainerInputs title={"المرفقات"}>
                        <InputField
                          type="file"
                          title={"القرار الصناعي"}
                          onChange={setImage1}
                          required
                        />
                        <InputField
                          type="file"
                          title={"السجل التجاري أوعقد الشراكة"}
                          onChange={setImage2}
                          required
                        />
                        <InputField
                          type="file"
                          title={"صورة تعهد من كاتب العدل"}
                          onChange={setImage3}
                          required
                        />
                        <InputField
                          type="file"
                          title={"مرفقات اخرى"}
                          onChange={setImage4}
                        />
                      </ContainerInputs>
                      {onSendForm ? (
                        <div className="flex justify-end mt-6">
                          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            ارسال
                          </button>
                        </div>
                      ) : (
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 mt-5 rounded-lg">
                          <span
                            style={{ width: `${uploadProgress}%` }}
                            className="h-full text-white font-medium bg-blue-500 dark:bg-blue-700 mt-2 rounded-lg flex items-center justify-center"
                          >
                            {uploadProgress}%
                          </span>
                        </div>
                      )}
                    </form>{" "}
                  </div>
                ) : null}
                {paperInfo.state_checked == 0 ? (
                  <div>
                    <form onSubmit={handleAddImage}>
                    <ContainerInputs title={"مرفقات جديدة"}>
                        <InputField
                        pull
                          type="file"
                          title={"اضف مرفق"}
                          onChange={setImage}
                        />
                      </ContainerInputs>
                      {onSendForm ? (
                        <div className="flex justify-end mt-6">
                          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            ارسال
                          </button>
                        </div>
                      ) : (
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 mt-5 rounded-lg">
                          <span
                            style={{ width: `${uploadProgress}%` }}
                            className="h-full text-white font-medium bg-blue-500 dark:bg-blue-700 mt-2 rounded-lg flex items-center justify-center"
                          >
                            {uploadProgress}%
                          </span>
                        </div>
                      )}
                    </form>{" "}
                  </div>
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
