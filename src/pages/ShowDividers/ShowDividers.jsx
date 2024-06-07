import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ContainerInputs, Spinner } from "../../components";

import axios from "axios";
import axiosErrorHandler from "../../components/axiosErrorHandler";
import { api_host, api_image_area } from "../../configs/api_host";
import areaImageDemo from "./../../images/eara.png";

export default function ShowDividers() {
  axios.interceptors.response.use((response) => response, axiosErrorHandler);

  const selectSectionRef = useRef(null);

  const [loadPage, setLoadPage] = useState(false);

  /** for areas */
  const [areasList, setAreasList] = useState([]);
  const [currentAreaId, setCurrentAreaId] = useState(0);
  const [areaImage, setAreaImage] = useState("");

  /** for section */
  const [sectionsList, setSectionsList] = useState([]);
  const [currentSectionId, setCurrentSectionId] = useState(0);
  const [sectionDetails, setSectionDetails] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
      axios
        .get(`${api_host}/earths/${currentAreaId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log("sections", response.data);
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
  }

  if (loadPage)
    return (
      <div className="flex justify-center items-center w-full md:p-2 mt-5 overflow-auto">
        <section className="w-full max-w-6xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            عرض المناطق و المقاسم
          </h2>
          <ContainerInputs title={"تفاصيل الخدمة"}>
            <p className="col-span-2 dark:text-white">
              عزيزي المستثمر، يمكنك من خلال هذه الخدمة عرض المقاسم المتوفرة
              للبيع، ويمكنك حجز مقسمك من خلال الخدمة المقدمة هنا بالضغط على هذا
              الرابط: "<Link className="text-blue-600" to={"/reservation-form"}>
                {" "}
                حجز مقسم
              </Link>" والبدء بالإجراءات التخصيص من خلال ملء الاستمارة
              الموجودة.
            </p>
          </ContainerInputs>
          <ContainerInputs title={"للاطلاع على المقاسم المتوفرة"}>
            <div className="flex flex-col col-span-2 md:col-span-1 h-auto md:h-[400]">
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
                          م²{" "}
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

          <ContainerInputs title={"ماذا عليك أن تعرف؟"}>
            <div className="col-span-2 dark:text-white">
              <ol>
                <li>
                  {" "}
                  1- نوع الصناعة المطلوبة وتصنيفها (
                  <a
                    href="http://ic-homs.sy/hajz/%d8%aa%d8%b5%d9%86%d9%8a%d9%81-%d8%a7%d9%84%d8%b5%d9%86%d8%a7%d8%b9%d8%a7%d8%aa/"
                    data-type="page"
                    data-id="85"
                  >
                    للاستفسار عن التصنيف انقر هنا
                  </a>
                  ).
                </li>
                <li>2- القوانين والمراسيم الصادرة</li>
                <li> 3- المساحة المطلوبة وكمية المياه والكهرباء اللازمة.</li>
                <li>4- الكيان القانوني للمنشأة.</li>
                <li>5- رأسمال المنشأة.</li>
              </ol>
            </div>
          </ContainerInputs>
          <ContainerInputs title={"للمزيد من المعلومات"}>
            <div className="col-span-2 dark:text-white">
              <p>يمكنك الاتصال بمكتب خدمات المستثمرين</p>

              <p>هاتف: 0993321200</p>

              <p>بريد الكتروني: investservice2023@gmail.com</p>
            </div>
          </ContainerInputs>
          <ContainerInputs title={"النفقات المالية المترتبة"}>
            <div className="col-span-2 dark:text-white">
              <ul>
                <li>
                  1- رسم طلب الاكتتاب <span className="font-bold">100,000</span>{" "}
                  ل.س.
                </li>

                <li>
                  2- مبلغ تأمين <span className="font-bold">2.5%</span> من قيمة
                  المقسم.
                </li>

                <li>
                  3- بعد التخصيص: يتم تسديد قيمة المقسم إمّا نقداً بدون فوائد أو
                  دفع <span className="font-bold">22.5%</span> من قيمة المقسم
                  والباقي أقساط نصف سنوية لمدة خمس سنوات بعمولة سنوية{" "}
                  <span className="font-bold">8%</span> على الأقساط المتبقية.
                </li>
              </ul>
            </div>
          </ContainerInputs>
          <div className="flex justify-end mt-5">
            <Link
              to={"/reservation-form"}
              className=" px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              هل تريد الحجز ؟
            </Link>
          </div>
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
