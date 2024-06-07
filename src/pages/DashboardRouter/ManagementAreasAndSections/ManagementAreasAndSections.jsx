import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  ActionModal,
  Collapse,
  InputField,
  Spinner,
  createAlert,
} from "../../../components";
import axiosErrorHandler from "../../../components/axiosErrorHandler";
import { api_host, api_image_area } from "../../../configs/api_host";
import { FaSearch } from "react-icons/fa";

export default function ManagementAreasAndSections() {
  axios.interceptors.response.use((response) => response, axiosErrorHandler);

  const searchResultRef = useRef();

  const [reloadCount, setReloadCount] = useState(0);

  const { token } = useSelector((state) => state.auth);

  const [areasList, setAreasList] = useState([]);
  const [loadPage, setLoadPage] = useState(false);

  const [onSendRequest, setOnSendRequest] = useState(false);

  const [isOpenModalEditSection, setIsOpenModalEditSection] = useState(false);
  const [isOpenModalEditArea, setIsOpenModalEditArea] = useState(false);
  const [isOpenModalAddArea, setIsOpenModalAddArea] = useState(false);
  const [isOpenModalAddSection, setIsOpenModalAddSection] = useState(false);

  const [dataModalEditSection, setDataModalEditSection] = useState({});
  const [dataModalAddSection, setDataModalAddSection] = useState({
    number: null,
    price: null,
    space: null,
    electricity: "توتر متوسط",
  });

  const [areaId, setAreaId] = useState(0);
  const [areaName, setAreaName] = useState("");
  const [areaOldImage, setAreaOldImage] = useState("");
  const [areaNewImage, setAreaNewImage] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (
      !isOpenModalEditSection &&
      !isOpenModalEditArea &&
      !isOpenModalAddArea &&
      !isOpenModalAddSection
    ){
      setAreaOldImage("") ;setAreaId(0);setAreaName("");setDataModalEditSection({})
      setDataModalAddSection({
        number: null,
        price: null,
        space: null,
        electricity: "توتر متوسط",
      });}
  }, [
    isOpenModalEditSection,
    isOpenModalEditArea,
    isOpenModalAddArea,
    isOpenModalAddSection,
  ]);

  const reLoadPage = () => {
    setReloadCount((prev) => prev + 1);
  };

  const openModalAddSection = (id) => {
    setAreaId(id);
    setIsOpenModalAddSection(true);
  };

  const openModalEditSection = (data) => {
    setDataModalEditSection(data);
    setIsOpenModalEditSection(true);
  };

  const openModalEditArea = (data) => {
    setAreaId(data.id);
    setAreaName(data.name);
    setAreaOldImage(data.url_image);
    setIsOpenModalEditArea(true);
  };

  useEffect(() => {
    if (areasList.length > 0 && searchInput != "") {
      const mergedSection = areasList.reduce((acc, obj) => {
        return acc.concat(
          obj.details.filter((detail) => detail.number.includes(searchInput))
        );
      }, []);
      setSearchResult(mergedSection);
    }
    if (searchInput == "") {
      setSearchResult([]);
    }
  }, [searchInput]);

  useEffect(() => {
    setLoadPage(false);
    axios
      .get(`${api_host}/areaWithEarths`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("area", response.data);
          setAreasList(response.data.data);
          setLoadPage(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reloadCount]);

  const handleSubmitAddSectionInfo = async (e) => {
    e.preventDefault();
    setOnSendRequest(true);

    if (
      dataModalAddSection.number == null ||
      dataModalAddSection.price == null ||
      dataModalAddSection.space == null ||
      dataModalAddSection.electricity == ""
    ) {
      createAlert("Warning", "يرجى كتابة اسم المنطقة");
      setOnSendRequest(false);
      return;
    }
    console.log(dataModalAddSection);

    await axios
      .post(`${api_host}/addEarth/${areaId}`, dataModalAddSection, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          createAlert(response.data.type, response.data.message);
          setAreaId(0);
          setDataModalAddSection({
            number: null,
            price: null,
            space: null,
            electricity: "توتر متوسط",
          });
          reLoadPage();
          setIsOpenModalAddSection(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setOnSendRequest(false);
  };

  const handleSubmitEditSectionInfo = async (e) => {
    e.preventDefault();
    setOnSendRequest(true);
    console.log(dataModalEditSection);

    await axios
      .post(
        `${api_host}/updateEarth/${dataModalEditSection.id}`,
        dataModalEditSection,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          createAlert(response.data.type, response.data.message);
          setDataModalEditSection({});
          reLoadPage();
          setIsOpenModalEditSection(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setOnSendRequest(false);
  };

  const handleSubmitAddAreaInfo = async (e) => {
    e.preventDefault();
    setOnSendRequest(true);

    if (areaNewImage == "") {
      createAlert("Warning", "يرجى تحديد صورة");
      setOnSendRequest(false);
      return;
    }
    if (areaName == "") {
      createAlert("Warning", "يرجى كتابة اسم المنطقة");
      setOnSendRequest(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", areaName);
    formData.append("url_image", areaNewImage);

    await axios
      .post(`${api_host}/addArea`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          createAlert(response.data.type, response.data.message);
          setAreaId(0);
          setAreaName("");
          setAreaNewImage("");
          reLoadPage();
          setIsOpenModalAddArea(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setOnSendRequest(false);
  };

  const handleSubmitEditAreaInfo = async (e) => {
    e.preventDefault();
    setOnSendRequest(true);

    if (areaName == "") {
      createAlert("Warning", "يرجى كتابة اسم المنطقة");
      setOnSendRequest(false);
      return;
    }

    const formData = new FormData();

    formData.append("name", areaName);
    if (areaNewImage !== "") formData.append("url_image", areaNewImage);

    await axios
      .post(`${api_host}/updateArea/${areaId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          createAlert(response.data.type, response.data.message);
          setAreaId(0);
          setAreaName("");
          setAreaNewImage("");
          reLoadPage();
          setIsOpenModalEditArea(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setOnSendRequest(false);
  };

  const handleEditSectionInfo = (event) => {
    setDataModalEditSection((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  const handleCloseSearchResult = (e) => {
    if (e.target !== searchResultRef) {
      setSearchInput("");
    }
  };

  if (!loadPage) return <Spinner />;

  return (
    <div
      className="w-full min-h-full max-w-7xl_ flex flex-col gap-2"
      id="area-and-earths-page"
      onClick={handleCloseSearchResult}
    >
      <div class="max-w-5xl w-full relative mx-auto mb-2">
        <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch />
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="ادخل رقم المقسم"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>
        <ul
          className="w-full absolute z-10 shadow-lg rounded-lg overflow-x-hidden mt-1 max-h-48"
          ref={searchResultRef}
        >
          {searchResult.length > 0
            ? searchResult.map((item) => (
                <li
                  className="p-2 hover:bg-gray-300 bg-gray-100 cursor-pointer border"
                  onClick={() => openModalEditSection(item)}
                >
                  {item.number}
                </li>
              ))
            : null}
        </ul>
      </div>

      <div
        className="pb-4 w-full flex flex-wrap justify-center md:justify-start
              gap-4"
      >
        <button
          onClick={() => setIsOpenModalAddArea(true)}
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 btn"
        >
          اضافة منطقة
        </button>
      </div>
      {areasList.length > 0 ? (
        areasList.map((area, index) => (
          <Collapse key={index} title={area.name}>
            <div
              className="pb-4 w-full flex flex-wrap justify-center md:justify-start
              gap-4"
            >
              <button
                onClick={() => openModalEditArea(area)}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 btn"
              >
                تعديل المنطقة
              </button>
              <button
                onClick={() => openModalAddSection(area.id)}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 btn"
              >
                اضافة مقسم{" "}
              </button>
            </div>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              {area.details.length > 0
                ? area.details.map((section) => (
                    <div
                      key={section.id}
                      onClick={() => openModalEditSection(section)}
                      className={`w-40 h-40 duration-200 cursor-pointer  dark:text-white rounded-md flex flex-col shadow-lg items-center justify-between p-2 ${
                        section.available == 1
                          ? "bg-red-200 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-500"
                          : "bg-slate-200 hover:bg-slate-300  dark:bg-gray-900 dark:hover:bg-gray-800"
                      } `}
                    >
                      <div className="w-full text-center border-l-0 border-t-0 border-r-0 border border-white dark:border-gray-700">
                        <h5 className="text-2xl font-bold">{section.number}</h5>
                      </div>
                      <div className="w-full text-center border-l-0 border-t-0 border-r-0 border border-white dark:border-gray-700">
                        <h5>{section.space} م²</h5>
                      </div>
                      <div className="w-full text-center border-l-0 border-t-0 border-r-0 border border-white dark:border-gray-700">
                        <h5>{section.price} ل.س</h5>
                      </div>
                      <div>
                        <h5>{section.electricity}</h5>
                      </div>
                    </div>
                  ))
                : false}
            </div>
          </Collapse>
        ))
      ) : (
        <h1>لا يوجد بيانات</h1>
      )}

      <ActionModal
        open={isOpenModalAddSection}
        title={"اضافة مقسم"}
        close={setIsOpenModalAddSection}
      >
        <form onSubmit={handleSubmitAddSectionInfo}>
          <InputField
            type="number"
            title={"رقم المقسم"}
            required
            id={"number"}
            value={dataModalAddSection?.number}
            onChange={(e) =>
              setDataModalAddSection((prev) => ({
                ...prev,
                number: e.value,
              }))
            }
          />
          <InputField
            type="number"
            title={"المساحة"}
            required
            value={dataModalEditSection?.space}
            id={"space"}
            onChange={(e) =>
              setDataModalAddSection((prev) => ({
                ...prev,
                space: e.value,
              }))
            }
          />
          <InputField
            type="number"
            title={"سعر المتر"}
            required
            value={dataModalAddSection?.price}
            id={"price"}
            onChange={(e) =>
              setDataModalAddSection((prev) => ({
                ...prev,
                price: e.value,
              }))
            }
          />
          <div>
            <label className="text-sm font-medium dark:text-white text-gray-700">
              {"نوع التوتر الكهربا"}
            </label>
            <span className="text-red-600 font-bold dark:text-green-600">
              *
            </span>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              // onChange={(e) => onChange(e.target.value)}
              value={dataModalAddSection?.electricity}
              onChange={(e) =>
                setDataModalAddSection((prev) => ({
                  ...prev,
                  electricity: e.target.value,
                }))
              }
            >
              <option d value={"توتر مرتفع"}>
                {"توتر مرتفع"}
              </option>
              ;<option value={"توتر متوسط"}>{"توتر متوسط"}</option>;
              <option value={"توتر منخفض"}>{"توتر منخفض"}</option>;
            </select>
          </div>
          {!onSendRequest ? (
            <div className="w-full my-2 flex justify-center">
              <button className="px-6 py-2  leading-5 transform rounded-md  btn btn-success">
                اضافة
              </button>
            </div>
          ) : (
            <Spinner />
          )}
        </form>
      </ActionModal>

      <ActionModal
        open={isOpenModalEditSection}
        title={"تعديل معلومات مقسم"}
        close={setIsOpenModalEditSection}
      >
        <form onSubmit={handleSubmitEditSectionInfo}>
          <InputField
            type="number"
            title={"رقم المقسم"}
            required
            id={"number"}
            value={dataModalEditSection?.number}
            onChange={handleEditSectionInfo}
          />
          <InputField
            type="number"
            title={"المساحة"}
            required
            value={dataModalEditSection?.space}
            id={"space"}
            onChange={handleEditSectionInfo}
          />
          <InputField
            type="number"
            title={"سعر المتر"}
            required
            value={dataModalEditSection?.price}
            id={"price"}
            onChange={handleEditSectionInfo}
          />
          <InputField
            type="number"
            title={"عامل التثقيل"}
            value={dataModalEditSection?.weighting}
            id={"weighting"}
            onChange={handleEditSectionInfo}
          />
          <div>
            <label className="text-sm font-medium dark:text-white text-gray-700">
              {"نوع التوتر الكهربا"}
            </label>
            <span className="text-red-600 font-bold dark:text-green-600">
              *
            </span>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              // onChange={(e) => onChange(e.target.value)}
              value={dataModalEditSection?.electricity}
              onChange={(e) =>
                setDataModalEditSection((prev) => ({
                  ...prev,
                  electricity: e.target.value,
                }))
              }
            >
              <option value={"توتر مرتفع"}>{"توتر مرتفع"}</option>;
              <option value={"توتر متوسط"}>{"توتر متوسط"}</option>;
              <option value={"توتر منخفض"}>{"توتر منخفض"}</option>;
            </select>
          </div>
          {!onSendRequest ? (
            <div className="w-full my-2 flex justify-center">
              <button className="px-6 py-2  leading-5 transform rounded-md  btn btn-success">
                تعديل
              </button>
            </div>
          ) : (
            <Spinner />
          )}
        </form>
      </ActionModal>

      <ActionModal
        open={isOpenModalAddArea}
        title={"اضافة منطقة"}
        close={setIsOpenModalAddArea}
      >
        <form onSubmit={handleSubmitAddAreaInfo}>
          <InputField
            title={"اسم المنطقة"}
            required
            id={"area name"}
            value={areaName}
            onChange={(e) => setAreaName(e.value)}
          />
          <InputField type="file" title={"الصورة"} onChange={setAreaNewImage} />

          {!onSendRequest ? (
            <div className="w-full my-2 flex justify-center">
              <button className="px-6 py-2  leading-5 transform rounded-md  btn btn-success">
                اضافة
              </button>
            </div>
          ) : (
            <Spinner />
          )}
        </form>
      </ActionModal>

      <ActionModal
        open={isOpenModalEditArea}
        title={"تعديل معلومات منطقة"}
        close={setIsOpenModalEditArea}
      >
        <div className=" p-4  w-full max-w-48 mx-auto">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            الصورة الحالية
          </span>
          <img
            src={`${api_image_area}/${areaOldImage}`}
            alt=""
            className="w-full mt-2"
          />
        </div>{" "}
        <form onSubmit={handleSubmitEditAreaInfo}>
          <InputField
            title={"اسم المنطقة"}
            required
            id={"area name"}
            value={areaName}
            onChange={(e) => setAreaName(e.value)}
          />
          <InputField
            type="file"
            title={"الصورة الجديدة"}
            onChange={setAreaNewImage}
          />

          {!onSendRequest ? (
            <div className="w-full my-2 flex justify-center">
              <button className="px-6 py-2  leading-5 transform rounded-md  btn btn-success">
                تعديل
              </button>
            </div>
          ) : (
            <Spinner />
          )}
        </form>
      </ActionModal>
    </div>
  );
}
