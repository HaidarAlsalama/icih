import React, { useEffect, useState } from "react";
import logo from "./../../images/logoHassia.png";
import { api_image } from "../../configs/api_host";
export default function PrintPage() {
  const [paper, setPaper] = useState(
    localStorage.getItem("paperInfo")
      ? JSON.parse(localStorage.getItem("paperInfo"))
      : null
  );
  const body = document.querySelector("body");

  useEffect(() => {
    if (body.classList.contains("overflow-hidden")) {
      body.classList.remove("overflow-hidden");
    }
    return () => {
      localStorage.removeItem("paperInfo");
    };
  }, []);

  if (paper == null) return <div className="w-full mt-7 text-center"> <h1>لا يوجد بيانات</h1> </div>; 

  return (
    <div className="w-full dark:bg-white">
      <div className="w-full flex flex-col max-w-6xl mx-auto pt-1 px-4">
        <div className="flex text-md justify-between">
          <div className="font-bold">
            <h5>الجمهورية العربية السورية</h5>
            <h5>وزارة الإدارة المحلية والبيئة</h5>
            <h5>المدينة الصناعية بحسياء</h5>
          </div>
          <div className="">
            <img src={logo} alt="" width={75} />
          </div>
          <div className="font-bold leading-5" style={{ direction: "ltr" }}>
            <h5>Syrian Arab Republic</h5>
            <h5>MINISTRY of LOCAL</h5>
            <h5>ADMINISTRATION</h5>
            <h5>The Industrial City in Hassia</h5>
          </div>
        </div>

        <div className="flex text-sm justify-between mt-1">
          <div className="text-sm leading-7">
            <h5>الرقم:</h5>
            <h5>التاريخ:</h5>
          </div>
          <div className=" text-sm text-left w-72">
            <h5>Website: www.ic-homs.sy</h5>
            <h5>Email: info@ic-homs.sy</h5>
            <h5>Email: customer@ic-homs.sy</h5>
          </div>
          <div className="leading-7" style={{ direction: "ltr" }}>
            <h5>Phone: 5960007 , 5960008</h5>
            <h5>Fax: 5960003 , 5960014</h5>
          </div>
        </div>

        <div className="mt-1 border p-1 text-center font-bold">
          <h5>طلب ترخيص واكتتاب على مقسم صناعي في المدينة الصناعية بحسياء</h5>
        </div>

        <div className="p-2 text-center font-bold">
          <h5>إلى إدارة المدينة الصناعية بحسياء</h5>
        </div>

        <div className="container mx-auto text-sm ">
          <table className="min-w-full border-4 border-black ">
            <tbody>
              <tr>
                <td className="px-4 py-2 border-2 text-center border-gray-300 w-1/4">
                  مقدم الطلب
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-3/4">
                  <div className="flex gap-10">
                    <h5>
                      الاسم: <span>{paper.name}</span>
                    </h5>
                    <h5>
                      بن: <span>{paper.father_name}</span>
                    </h5>
                    <h5>
                      والدته: <span>{paper.mother_name}</span>
                    </h5>
                  </div>
                  <div className="flex gap-10 mt-3">
                    <h5>
                      مواليد: <span>{paper.birth}</span>
                    </h5>
                    <h5>
                      هوية رقم: <span>{paper.ID_personal}</span>
                    </h5>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center border-gray-300 w-1/4">
                  العنوان الكامل
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-3/4">
                  <div className="flex flex-col gap-1">
                    <h5>
                      الموطن المختار: <span>{paper.address}</span>
                    </h5>
                    <h5>
                      ارقام الهواتف: <span>{paper.phone1}</span> |{" "}
                      <span>{paper.phone2}</span>
                    </h5>
                    <h5>
                      البريد الالكتروني: <span>{paper.email}</span>
                    </h5>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center border-gray-300 w-1/4">
                  الاسم المقترح
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-3/4">
                  {" "}
                  الشركة المتحدة لتصنيع المطاط{" "}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center border-gray-300 w-1/4">
                  كيان المنشأء القانوني
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-3/4">
                  {paper.factory_ent}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center border-gray-300 w-1/4">
                  مكان اقامة المنشأة
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-3/4">
                  محافظة حمص - المدينة الصناعية في حسياء
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center border-gray-300 w-1/4">
                  المساحة المطلوبة
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-3/4">
                  <div className="flex gap-4">
                    <h5>
                      {paper.earth.space} <span>م²</span>
                    </h5>
                    <h5>
                      مقسم رقم <span>{paper.earth.number}</span>
                    </h5>
                    <h5>{paper.earth.area.name}</h5>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3_ container mx-auto  leading-7 p-2 ">
          <h5>
            بعد التحية: نتقدم إليكم بطلب الترخيص بإقامة منشأة صناعية لصناعة:{" "}
            <span className="font-semibold">{paper.Industry_name}</span>
          </h5>
          <h5>
            رقم التصنيف:{" "}
            <span className="font-semibold">{paper.ID_classification}</span>
          </h5>
        </div>

        <div className="container text-sm mx-auto ">
          <table className="min-w-full border-4 border-black ">
            <tbody>
              <tr>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  رأس المال الكلي
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Money} ل.س
                </td>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  عدد أيام العمل السنوية
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Num_Year_Worker} يوم
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  عدد العاملين
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Num_Worker}
                </td>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  مدة التنفيذ
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Num_Exce} سنوات
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  عدد ساعات العمل اليومية
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">16 يوم</td>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  الحاجة السنوية من المياه
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Q_Water} م³
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  قيمة الالات و المعدات التقديرية
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Value_equipment} ل.س
                </td>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  استطاعة الكهرباء المطلوبة
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  {paper.Q_Electricity} kw
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  سددت الرسوم بإيصال مالي رقم
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  8750021542200025
                </td>
                <td className="px-4 py-2 border-2 text-center font-semibold border-gray-300 w-1/4">
                  بتاريخ
                </td>
                <td className="px-4 py-2 border-2 border-gray-300 w-1/4">
                  10/6/2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container  mx-auto p-2 ">
          <h5 className="text-sm">
            أتعهد بالالتزام بتعليمات وزارة الصناعة وأحكام القانون رقم 12 لعام
            2012 وتعليماته التنفيذية الخاصة بالبيئة والأنظمة والقوانين المعمول
            بها في المديمة الصماعية وخاصة نضام الاستثمار رقم 1536/ق لعام 2012
            وكامل مواده وفقراته وتعديلاته وأتعهد بأن تكون مواصفات المنتج مطابقة
            للمعايير و المواصفات القياسية السورية.
          </h5>
          <h5 className="text-sm">
            - أصرح بأنه: أنا - وجميع الشركاء غير موظف لدى الجهات العامة في
            الدولة.
          </h5>
          <h5 className="text-sm">
            - أصرح بأن جميع المعلومات المقدمة من قبلي والمتعلقة بهذا المشروع هي
            صحيحة ومطابقة للواقع.
          </h5>
        </div>
        <div className="mx-auto flex flex-col gap-2 mt-4">
          {paper.images.length > 0
            ? paper.images.map((image,index) => {
                return <img key={index} src={`${api_image}/${image.url}`} alt="" />;
              })
            : null}
        </div>
      </div>
    </div>
  );
}
