import React, { useEffect, useRef, useState } from "react";

/** @todo make validate to all inputs */

import {
  ContainerInputs,
  InputField,
  Spinner,
  createAlert,
} from "../../components";

import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosErrorHandler from "../../components/axiosErrorHandler";
import { api_host, api_image_area } from "../../configs/api_host";
import areaImageDemo from "./../../images/eara.png";

let personInformation = {
  name: "",
  fatherName: "",
  motherName: "",
  personalId: "",
  birthday: "",
  address: "",
  email: "",
  mobilePhone: "",
  phone: "",
};

let facilityInformation = {
  factoryName: "",
  industryName: "",
  factoryEnt: "منشأة فردية",
  areaSpace: "",
  qElectricity: "",
  classificationId: "",
};

let generalInformation = {
  mony: "",
  workerNumber: "",
  numYearWorks: "",
  numExce: "",
  equipmentValue: "",
  qWater: "",
};

export default function ReservationForm() {
  axios.interceptors.response.use((response) => response, axiosErrorHandler);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [onSendForm, setOnSendForm] = useState(true);

  const navigate = useNavigate();
  const selectSectionRef = useRef(null);
  const { auth } = useSelector((status) => status);

  const [isEmployee, setIsEmployee] = useState(false);
  const [loadPage, setLoadPage] = useState(false);
  const [startFilling, setStartFilling] = useState(false); // to allow the start filling the rest of the fields

  const [person, setPerson] = useState(personInformation);
  const [facility, setFacility] = useState(facilityInformation);
  const [generalInfoProject, setGeneralInfoProject] =
    useState(generalInformation);

  /** for earas */
  const [areasList, setAreasList] = useState([]);
  const [currentAreaId, setCurrentAreaId] = useState(0);
  const [areaImage, setAreaImage] = useState("");

  /** for sction */
  const [sectionsList, setSectionsList] = useState([]);
  const [currentSectionId, setCurrentSectionId] = useState(0);
  const [sectionDetails, setSectionDetails] = useState(null);

  /** for images */
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");

  useEffect(() => {
    if (auth.role == "subscriper") {
      axios
        .get(`${api_host}/areas`)
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
    } else if (auth.role == "employee") {
      setIsEmployee(true);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setSectionsList([]);
    setSectionDetails(null);
    setCurrentSectionId(0);

    if (currentAreaId > 0) {
      console.log(currentAreaId);
      if (selectSectionRef.current) {
        // Step 4: Set the value property to the desired value
        selectSectionRef.current.value = "0"; // Change to the desired value
      }
      const { url } = areasList.find((item) => item.id == currentAreaId);
      setAreaImage(url);
      console.log(`${api_host}/subscriptions/get/${currentAreaId}`);
      console.log(auth.token);
      axios
        .get(`${api_host}/subscriptions/get/${currentAreaId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("sections", response.data);
            createAlert(response.data.type, response.data.message);
            if (response.data.data.length > 0) {
              setSectionsList(response.data.data);
            } else setSectionsList([]);
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    } else {
      setAreaImage("");
      setSectionsList([]);
    }
  }, [currentAreaId]);

  useEffect(() => {
    if (currentSectionId > 0) {
      findObjectById(currentSectionId);
    }
  }, [currentSectionId]);

  function findObjectById(id) {
    const temp = sectionsList.find((item) => item.id == id);
    setSectionDetails(temp);
    setFacility((prev) => ({ ...prev, areaSpace: temp.space }));
  }

  const handleStartFilling = () => {
    // setStartFi lling(true);
    // return;
    if (currentSectionId > 0 && currentAreaId > 0) setStartFilling(true);
    else createAlert("Warning", "يجب تحديد الأرض والمقسم أولاً");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (currentSectionId <= 0 || currentAreaId <= 0) {
      createAlert("Warning", "يجب تحديد الأرض والمقسم أولاً");
      return;
    }
    // if (
    //   person.name == "" ||
    //   person.fatherName == "" ||
    //   person.motherName == "" ||
    //   person.birthday == "" ||
    //   person.personalId == "" ||
    //   person.address == "" ||
    //   person.mobilePhone == "" ||
    //   person.email == ""
    // ) {
    //   return;
    // }

    // console.log(person, facilityInformation, personInformation);
    // console.log(facility);
    // console.log(generalInfoProject);
    // console.log(currentAreaId);
    // console.log(currentSectionId);

    let formData = new FormData();
    formData.append("name", person.name);
    formData.append("father_name", person.fatherName);
    formData.append("mother_name", person.motherName);
    formData.append("birth", person.birthday);
    formData.append("ID_personal", person.personalId);
    formData.append("address", person.address);
    formData.append("phone1", person.mobilePhone);
    formData.append("phone2", person.phone);
    formData.append("email", person.email);

    formData.append("factory_name", facility.factoryName);
    formData.append("factory_ent", facility.factoryEnt);
    formData.append("Industry_name", facility.industryName);
    formData.append("ID_classification", facility.classificationId);
    formData.append("Q_Electricity", parseFloat(facility.qElectricity));

    formData.append("Money", parseFloat(generalInfoProject.mony));
    formData.append("Num_Worker", parseFloat(generalInfoProject.workerNumber));
    formData.append(
      "Value_equipment",
      parseFloat(generalInfoProject.equipmentValue)
    );
    formData.append(
      "Num_Year_Worker",
      parseFloat(generalInfoProject.numYearWorks)
    );
    formData.append("Num_Exce", parseFloat(generalInfoProject.numExce));
    formData.append("Q_Water", parseFloat(generalInfoProject.qWater));

    formData.append("area_id", currentAreaId);
    formData.append("earth_id", currentSectionId);

    /** images */
    formData.append("url[0]", image1);
    formData.append("url[1]", image2);
    formData.append("url[2]", image3);
    formData.append("url[3]", image4);
    formData.append("url[4]", image5);
    formData.append("url[5]", image6);

    const formDataJson = {};
    formData.forEach((value, key) => {
      formDataJson[key] = value;
    });

    // Log the JSON object to the console
    console.log(formDataJson);
    setOnSendForm(false);

    // return;
    await axios
      .post(`${api_host}/subscriptions/add_form`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.type == "Success") {
            createAlert(response.data.type, response.data.message);
            clearThisForm();
            navigate('/show-my-requests')
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    setOnSendForm(true);
    setUploadProgress(0);
  };

  const handlePersonalInfoChange = (event) => {
    setPerson((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  const handleFacilityInfoChange = (event) => {
    setFacility((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  const handleGeneralInfoChange = (event) => {
    setGeneralInfoProject((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  const clearThisForm = () => {
    setPerson(personInformation);
    setFacility(facilityInformation);
    setGeneralInfoProject(generalInformation);
    setCurrentAreaId(0);
    setStartFilling(false);
  };

  if (isEmployee)
    return (
      <div className="flex self-start justify-center items-center w-full p-2 mt-5 overflow-auto ">
        <section className="alert alert-danger h-fit w-full max-w-6xl p-6 mx-auto ">
          <h1 className="font-semibold mx-auto">
            هذه الصفحة مخصصة للمستثمرين فقط
          </h1>
        </section>
      </div>
    );
  if (loadPage)
    return (
      <div className="flex justify-center items-center w-full md:p-2 mt-5 overflow-auto ">
        <section className="w-full max-w-6xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            استمارة حجز مقسم
          </h2>
          <ContainerInputs title={"المناطق و المقاسم"}>
            <div className="flex flex-col col-span-2 md:col-span-1 h-[400]">
              <div className="">
                <label className="text-sm font-medium dark:text-white text-gray-700">
                  المناطق
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={(e) => setCurrentAreaId(e.target.value)}
                  required
                >
                  <option key={0} value={0}>
                    حدد المنطقة...
                  </option>
                  {areasList.length > 0
                    ? areasList.map((eara, index) => {
                        return (
                          <option key={index} value={eara.id}>
                            {eara.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              {sectionsList.length > 0 ? (
                <div>
                  <label className="dark:text-white text-gray-700">
                    رقم المقسم
                  </label>
                  <select
                    ref={selectSectionRef}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    onChange={(e) => setCurrentSectionId(e.target.value)}
                    required
                  >
                    <option key={0} value={0}>
                      حدد المقسم...
                    </option>
                    {sectionsList.map((section, index) => {
                      return (
                        <option key={index} value={section.id}>
                          {section.number}
                        </option>
                      );
                    })}
                  </select>
                  {sectionDetails ? (
                    <div className="bg-gray-200 dark:bg-gray-600 mt-5 flex flex-col md:flex-row justify-around rounded-lg p-2">
                      <div>
                        <h3 className="dark:text-white text-gray-700">
                          المساحة:{" "}
                          <span className="font-bold">
                            {sectionDetails.space}
                          </span>{" "}
                          م²
                        </h3>
                        <h3 className="dark:text-white text-gray-700">
                          الكهرباء:{" "}
                          <span className="font-bold">
                            {sectionDetails.electricity}
                          </span>
                        </h3>
                      </div>
                      <div>
                        <h3 className="dark:text-white text-gray-700">
                          سعر المتر:{" "}
                          <span className="font-bold">
                            {Math.floor(sectionDetails.price).toLocaleString()}
                          </span>{" "}
                          ل.س
                        </h3>
                        <h3 className="dark:text-white text-gray-700">
                          رقم المقسم:{" "}
                          <span className="font-bold">
                            {sectionDetails.number}
                          </span>
                        </h3>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="hidden md:flex h-60 justify-center col-span-2 md:col-auto bg-cover overflow-hidden">
              <a
                href={areaImage == "" ? areaImageDemo : `${api_image_area}/${areaImage}`}
                target="_blank"
              >
                <img
                  src={areaImage == "" ? areaImageDemo : `${api_image_area}/${areaImage}`}
                  alt="earaImage"
                  className="md:w-full h-full rounded-lg max-h-80"
                />
              </a>
            </div>
          </ContainerInputs>
          {!startFilling ? (
            <button
              className="float-left mt-5 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              // disabled={currntsectionId > 0 && currntEaraId > 0 ? false : true}
              onClick={handleStartFilling}
            >
              بدء ملء الاستمارة
            </button>
          ) : (
            <form className="mt-5" onSubmit={handleSubmitForm}>
              <ContainerInputs title={"مقدم الطلب"}>
                <InputField
                  title={"الاسم"}
                  id={"name"}
                  value={person.name}
                  onChange={handlePersonalInfoChange}
                  required
                />
                <InputField
                  title={"اسم الاب"}
                  id={"fatherName"}
                  value={person.fatherName}
                  onChange={handlePersonalInfoChange}
                  required
                />
                <InputField
                  title={"اسم الام"}
                  id={"motherName"}
                  value={person.motherName}
                  onChange={handlePersonalInfoChange}
                  required
                />
                <InputField
                  title={"الرقم الوطني"}
                  id={"personalId"}
                  direction="ltr"
                  value={person.personalId}
                  onChange={handlePersonalInfoChange}
                  required
                />
                <InputField
                  title={"البريد الاكتروني"}
                  id={"email"}
                  type="email"
                  value={person.email}
                  onChange={handlePersonalInfoChange}
                  required
                />
                <InputField
                  title={"تاريخ الميلاد"}
                  id={"birthday"}
                  type="date"
                  value={person.birthday}
                  onChange={handlePersonalInfoChange}
                  required
                />

                <InputField
                  title={"رقم الجوال"}
                  id={"mobilePhone"}
                  value={person.mobilePhone}
                  onChange={handlePersonalInfoChange}
                  required
                />

                <InputField
                  title={"رقم الهاتف"}
                  id={"phone"}
                  value={person.phone}
                  onChange={handlePersonalInfoChange}
                />

                <InputField
                  title={"العنوان الكامل"}
                  id={"address"}
                  value={person.address}
                  onChange={handlePersonalInfoChange}
                  pull={true}
                  required
                />
              </ContainerInputs>

              <ContainerInputs title={"معلومات المنشأة"}>
                <InputField
                  title={"الاسم المقترح"}
                  id={"factoryName"}
                  value={facility.factoryName}
                  onChange={handleFacilityInfoChange}
                />
                <InputField
                  title={"نوع الصناعة"}
                  id={"industryName"}
                  value={facility.industryName}
                  onChange={handleFacilityInfoChange}
                  required
                />
                <InputField
                  title={"كيان المنشأة القانوني"}
                  value={["منشأة فردية", "يوجد شراكات"]}
                  id={"factoryEnt"}
                  onChange={handleFacilityInfoChange}
                  type="select"
                  required
                />
                <InputField
                  title={"المساحة المطلوبة"}
                  value={facility.areaSpace}
                  isDisabled
                  required
                />
                <InputField
                  title={"استطاعة الطاقة الكهربائية المطلوبة KVA"}
                  value={facility.qElectricity}
                  id={"qElectricity"}
                  onChange={handleFacilityInfoChange}
                  type="number"
                  required
                />
                <InputField
                  title={"رقم التصنيف"}
                  value={facility.classificationId}
                  id={"classificationId"}
                  onChange={handleFacilityInfoChange}
                  // pull={true}
                  required
                />
              </ContainerInputs>

              <ContainerInputs title={"معلومات عامة عن المشروع"}>
                <InputField
                  title={"رأس المال الكلي"}
                  type="number"
                  value={generalInfoProject.mony}
                  id={"mony"}
                  onChange={handleGeneralInfoChange}
                  required
                />
                <InputField
                  title={"عدد العاملين الكلي"}
                  type="number"
                  value={generalInfoProject.workerNumber}
                  id={"workerNumber"}
                  onChange={handleGeneralInfoChange}
                  required
                />
                <InputField
                  title={"عدد أيام العمل السنوية"}
                  type="number"
                  value={generalInfoProject.numYearWorks}
                  id={"numYearWorks"}
                  onChange={handleGeneralInfoChange}
                  required
                />
                <InputField
                  title={"مدة التنفيذ"}
                  value={generalInfoProject.numExce}
                  id={"numExce"}
                  onChange={handleGeneralInfoChange}
                  required
                />
                <InputField
                  title={"قيمة الآلات والمعدات التقديرية"}
                  value={generalInfoProject.equipmentValue}
                  id={"equipmentValue"}
                  onChange={handleGeneralInfoChange}
                  required
                />
                <InputField
                  title={"الحاجة السنوية من المياه بالمتر المكعب"}
                  type="number"
                  value={generalInfoProject.qWater}
                  id={"qWater"}
                  onChange={handleGeneralInfoChange}
                  required
                />
              </ContainerInputs>

              <ContainerInputs title={"المرفقات"}>
                <InputField
                  type="file"
                  title={"اضف صورة الهوية"}
                  onChange={setImage1}
                  required
                />
                <InputField
                  type="file"
                  title={"اضف صورة هوية الشريك في حال توفره"}
                  onChange={setImage2}
                />
                <InputField
                  type="file"
                  title={"مرفقات اخرى"}
                  onChange={setImage3}
                />
                <InputField
                  type="file"
                  title={"مرفقات اخرى"}
                  onChange={setImage4}
                />
                <InputField
                  type="file"
                  title={"مرفقات اخرى"}
                  onChange={setImage5}
                />
                <InputField
                  type="file"
                  title={"مرفقات اخرى"}
                  onChange={setImage6}
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
            </form>
          )}
        </section>
      </div>
    );
  else
    return (
      <section className=" self-start h-fit w-full flex justify-center max-w-5xl p-6 mx-auto ">
        <Spinner />
      </section>
    );
}
