import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosErrorHandler from "../../../components/axiosErrorHandler";
import { InputField, Spinner, createAlert } from "../../../components";
import { api_host } from "../../../configs/api_host";
import { login } from './../../../store/reducers/authReducer';
import { useDispatch } from "react-redux";

export default function Register() {
  axios.interceptors.response.use((response) => response, axiosErrorHandler);
  const navigate = useNavigate()
const dispatch = useDispatch()
  const [onSendRequest, setOnSendRequest] = useState(false);

  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (onSendRequest) return;
    setOnSendRequest(true);
    if (
      person.firstName === "" ||
      person.lastName === "" ||
      person.phone === "" ||
      person.email === "" ||
      person.password === "" ||
      person.password_confirmation === ""
    ) {
      createAlert("Warning", "جميع الحقول مطلوبة");
      setOnSendRequest(false);
      return;
    }
    if (isNaN(person.phone)) {
      createAlert("Warning", "رقم الهاتف يجب ان يكون مكون من ارقام");
      setOnSendRequest(false);
      return;
    }
    if (person.phone.length != 10) {
      createAlert("Warning", "رقم الهاتف يجب ان يكون مكون من 10 ارقام");
      setOnSendRequest(false);
      return;
    }
    if (person.password.length < 8) {
      createAlert(
        "Warning",
        "يجب ان تكون كلمة المرور على الاقل مكونة من 8 محارف"
      );
      setOnSendRequest(false);
      return;
    }
    if (person.password.length !== person.password_confirmation.length) {
      createAlert(
        "Warning",
        "لا يوجد تطابق بين كلمة المرور وتأكيد كلمة المرور"
      );
      setOnSendRequest(false);
      return;
    }

    try {
      await axios
        .post(`${api_host}/register`, person, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response == undefined) return;
          // Handle the response
          console.log(response.data);
          if (response.status === 200) {
            createAlert("Success", "تم إنشاء حساب جديد ");
            dispatch(login(response.data.data));
            navigate("/");
            setOnSendRequest(false);
          }
        })
        .catch((error) => {
          // Handle error
          createAlert("Error", error.response.status);
          setOnSendRequest(false);
          // console.log(error.response.data.staus);
        });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    setOnSendRequest(false);
  };

  const handleFieldsChange = (event) => {
    setPerson({
      ...person,
      [event.name]: event.value,
    });
  };

  return (
    <div className="flex justify-center items-center w-full md:p-2 mt-5 overflow-auto">
      <section className="w-full max-w-6xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          تسجيل مستخدم جديد
        </h2>

        <form onSubmit={handleSubmitRegister}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <InputField
              title={"الاسم الأول"}
              id={"firstName"}
              value={person.firstName}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"الاسم الثاني"}
              id={"lastName"}
              value={person.lastName}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"بريد إلكتروني"}
              id={"email"}
              type="email"
              value={person.email}
              onChange={handleFieldsChange}
              direction="ltr"
              required
            />
            <InputField
              title={"رقم الجوال"}
              id={"phone"}
              value={person.phone}
              onChange={handleFieldsChange}
              direction="ltr"
              required
            />
            <InputField
              title={"كلمة المرور"}
              id={"password"}
              type="password"
              value={person.password}
              onChange={handleFieldsChange}
              direction="ltr"
              required
            />
            <InputField
              title={"تأكيد كلمة المرور"}
              id={"password_confirmation"}
              type="password"
              value={person.password_confirmation}
              onChange={handleFieldsChange}
              direction="ltr"
              required
            />
          </div>

          <h1 className="text-xs mt-6 text-center cursor-context-menu text-gray-700 dark:text-white">
            هل لديك حساب؟{" "}
            <Link to={"/login"} className="text-blue-500 font-semibold">
              تسجيل الدخول
            </Link>
          </h1>

          <div className="flex justify-end mt-6">
            {!onSendRequest ? (
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                تسجيل
              </button>
            ) : (
              <Spinner />
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
