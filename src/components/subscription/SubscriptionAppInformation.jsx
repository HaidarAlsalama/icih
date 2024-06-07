import React from "react";
import ContainerInputs from "../ContainerInputs/ContainerInputs";
import Spinner from "../Spinner/Spinner";
import { api_image } from "../../configs/api_host";
import Collapse from "../Collapse/Collapse";
import { useSelector } from "react-redux";

export default function SubscriptionAppInformation({
  data,
  images,
  handleDeleteImage,
  onDeleteImage,
  allowEditImage = false,
}) {
  const { role } = useSelector((state) => state.auth);
  return (
    <>
      {role == "employee" && (
        <ContainerInputs title={"حالة الطلب"}>
          <div className="flex font-semibold col-span-2 md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
            <h1>
              {data.state_cancelled == 1
                          ? "مرفوضة"
                          : data.state_checked == 0 &&
                            data.state_approval == 0 &&
                            data.state_specialize == 0 &&
                            data.state_complated == 0 &&
                            data.payment_status.subscription_fee == 0 &&
                            data.payment_status.insurance_fee == 0 &&
                            data.payment_status.thirdBatch == 0
                          ? "بانتظار تسديد رسم الاكتتاب"
                          : data.state_checked == 0 &&
                            data.state_approval == 0 &&
                            data.state_specialize == 0 &&
                            data.state_complated == 0 &&
                            data.payment_status.subscription_fee == 1 &&
                            data.payment_status.insurance_fee == 0 &&
                            data.payment_status.thirdBatch == 0
                          ? "بانتظار المراجعة المبدئية"
                          : data.state_checked == 1 &&
                            data.state_approval == 0 &&
                            data.state_specialize == 0 &&
                            data.state_complated == 0 &&
                            data.payment_status.subscription_fee == 1 &&
                            data.payment_status.insurance_fee == 0 &&
                            data.payment_status.thirdBatch == 0
                          ? "بانتظار الموافقة الامنية"
                          : data.state_approval == 1 &&
                            data.state_checked == 1 &&
                            data.state_specialize == 0 &&
                            data.state_complated == 0 &&
                            data.payment_status.subscription_fee == 1 &&
                            data.payment_status.insurance_fee == 0 &&
                            data.payment_status.thirdBatch == 0
                          ? "بحاجة استكمال الاوراق"
                          : data.state_approval == 1 &&
                            data.state_checked == 1 &&
                            data.state_specialize == 1 &&
                            data.state_complated == 0 &&
                            data.payment_status.subscription_fee == 1 &&
                            data.payment_status.insurance_fee == 0 &&
                            data.payment_status.thirdBatch == 0
                          ? "بحاجة اتمام دفع ال 2.5%"
                          : data.state_approval == 1 &&
                            data.state_checked == 1 &&
                            data.state_specialize == 1 &&
                            data.state_complated == 0 &&
                            data.payment_status.subscription_fee == 1 &&
                            data.payment_status.insurance_fee == 1 &&
                            data.payment_status.thirdBatch == 0
                          ? "بانتظار المراجعة"
                          : data.state_approval == 1 &&
                          data.state_checked == 1 &&
                          data.state_specialize == 1 &&
                          data.state_complated == 1 &&
                          data.state_data == 0 &&
                          data.payment_status.subscription_fee == 1 &&
                          data.payment_status.insurance_fee == 1 &&
                          data.payment_status.thirdBatch == 0
                        ? "بانتظار طلب التخصيص"
                        : data.state_approval == 1 &&
                          data.state_checked == 1 &&
                          data.state_specialize == 1 &&
                          data.state_complated == 1 &&
                          data.state_data == 1 &&
                          data.payment_status.subscription_fee == 1 &&
                          data.payment_status.insurance_fee == 1 &&
                          data.payment_status.thirdBatch == 0
                        ? "بانتظار دفع ال 22.5%"
                        : data.state_approval == 1 &&
                          data.state_checked == 1 &&
                          data.state_specialize == 1 &&
                          data.state_complated == 1 &&
                          data.state_data == 1 &&
                          data.payment_status.subscription_fee == 1 &&
                          data.payment_status.insurance_fee == 1 &&
                          data.payment_status.thirdBatch == 1
                        ? `تم تخصيص المقسم رقم ${data.earth.number}`
                          : null}
            </h1>
          </div>
        </ContainerInputs>
      )}
      <ContainerInputs title={"المعلومات الشخصية"}>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>الاسم:</h1>
          <h1>{data.name}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>اسم الاب:</h1>
          <h1>{data.father_name}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>اسم الام:</h1>
          <h1>{data.mother_name}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>الرقم الوطني:</h1>
          <h1>{data.ID_personal}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>البريد الالكتروني:</h1>
          <h1>{data.email}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>تاريخ الميلاد:</h1>
          <h1>{data.birth}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>رقم الجوال:</h1>
          <h1>{data.phone1}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>رقم الهاتف:</h1>
          <h1>{data.phone2}</h1>
        </div>
      </ContainerInputs>
      <ContainerInputs title={"معلومات المنشأة"}>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>الاسم المقترح:</h1>
          <h1>{data.factory_name}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>نوع الصناعة:</h1>
          <h1>{data.Industry_name}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>كيان المنشأة القانوني:</h1>
          <h1>{data.factory_ent}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>المساحة المطلوبة:</h1>
          <h1>{data.earth.space}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>رقم التصنيف:</h1>
          <h1>{data.ID_classification}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>الارض:</h1>
          <h1>{data.earth.area.name}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>المقسم:</h1>
          <h1>{data.earth.number}</h1>
        </div>
      </ContainerInputs>
      <ContainerInputs title={"معلومات عامة عن المشروع"}>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>رأس المال الكلي:</h1>
          <h1>{data.Money}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>عدد العمال الكلي:</h1>
          <h1>{data.Num_Worker}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>عدد ايام الععمل السنوية:</h1>
          <h1>{data.Num_Year_Worker}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>مدة التنفيذ:</h1>
          <h1>{data.Num_Exce}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>قيمة الآلات والمعدات التقديرية:</h1>
          <h1>{data.Value_equipment}</h1>
        </div>
        <div className="flex font-semibold md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
          <h1>الحاجة السنوية من المياه:</h1>
          <h1>{data.Q_Water}</h1>
          <h1>متر مكعب</h1>
        </div>
      </ContainerInputs>
      {data.notes && data.notes.length > 0 ? (
        <ContainerInputs title={"الملاحظات"} >
          <div className="flex font-semibold col-span-2 md:justify-center text-base leading-relaxed text-gray-500 dark:text-gray-50 gap-2">
            <h1 key={1}>{data.notes[0].description}</h1>
          </div>
        </ContainerInputs>
      ) : null}

      {data.payments &&
      data.payments.length > 0 &&
      data.payments[0].amountRef != null ? (
        <ContainerInputs title={"معلومات خاصة بالدفعات المالية"}>
          <div className="col-span-2">
            <Collapse title={"عرض"}>
              <div
                className="flex gap-4 justify-center _md:justify-start flex-wrap"
                key={1}
              >
                {data.payments.map((pay, index) => {
                  if (pay.amountRef != null)
                    return (
                      <div
                        key={index}
                        className="w-64 bg-gray-200/80 dark:bg-gray-800 dark:text-white rounded-md p-1"
                      >
                        <h5 className=" grid grid-cols-2 border border-t-0 border-r-0 border-l-0 pb-1">
                          <span>رقم المعاملة </span>
                          {pay.orderRef}
                        </h5>
                        <h5 className=" grid grid-cols-2 border border-t-0 border-r-0 border-l-0 pb-1">
                          <span>المبلغ </span>
                          {pay.amount} ل.س
                        </h5>
                        <h5 className=" grid grid-cols-2 border border-t-0 border-r-0 border-l-0 pb-1">
                          <span>رقم الحوالة </span>
                          {pay.transactionNo}
                        </h5>
                        <h5 className=" grid grid-cols-2 border border-t-0 border-r-0 border-l-0 pb-1">
                          <span>التاريخ </span>
                          {pay.paidDate}
                        </h5>
                      </div>
                    );
                })}{" "}
              </div>
            </Collapse>
          </div>
        </ContainerInputs>
      ) : null}

      <ContainerInputs title={"المرفقات"}>
        {images.length > 0 ? (
          images.map((row) => (
            <div className="relative group min-h-40 w-fit mx-auto" key={row.id}>
              <img
                src={`${api_image}/${row.url}`}
                alt="earaImage"
                className="m-auto h-full rounded-lg max-h-72"
              />

              <div className="group-hover:flex duration-1000 hidden absolute top-0 bottom-0 left-0 rounded-lg right-0 bg-gray-500/40 flex-col items-center justify-center gap-4">
                {onDeleteImage ? (
                  <Spinner />
                ) : (
                  <>
                    <a
                      href={`${api_image}/${row.url}`}
                      target="_blank"
                      className="btn btn-primary w-20"
                    >
                      عرض
                    </a>
                    {allowEditImage ? (
                      <button
                        className="btn btn-danger w-20"
                        onClick={() => handleDeleteImage(row.id)}
                      >
                        حذف
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-base leading-relaxed text-gray-500 dark:text-gray-5 font-semibold mx-auto">
            لايوجد مرفقات
          </h5>
        )}
      </ContainerInputs>
    </>
  );
}
