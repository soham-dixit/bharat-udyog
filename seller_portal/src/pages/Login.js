import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DNKlogo from "../assets/img/logo.png";
import axios from "../axios/axios";

import { Label, Input, Button, Select } from "@windmill/react-ui";
import UserContext from "../context/User/UserContext";
import { ModalContext } from "../context/modal/ModalContext";
const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "mr", text: "Marathi" },
  { value: "hi", text: "Hindi" },
];

function Login() {
  const { dispatch } = useContext(UserContext);
  const { dispatchModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const [lang, setLang] = useState("en");
  const history = useHistory();

  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:3000/";
    window.location.replace(loc + "?lng=" + e.target.value);
  };

  const initialState = {
    email: "",
    password: "",
    role: "Exporter",
  };
  const [details, setDetails] = useState(initialState);

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post("/auth/login", details)
      .then((res) => {
        const user = res.data.user;

        if (user.role !== "Exporter") {
          toast.error("User doesn't exist.");
          return;
        }

        if (user.isDenied) {
          history.push(`/login`);
          toast.error("Your application has been rejected");
          return;
        }

        if (!user.isKycSubmitted) {
          console.log(user);
          history.push(`/kyc/${user.id}`);
          toast.warning("Please complete your KYC process.");
          return;
        }

        if (user.isKycSubmitted && !user.isVerified) {
          history.push(`/login`);
          toast.error("Your KYC is not yet Verified");
          return;
        }

        dispatch({
          type: "LOGIN",
          payload: user,
        });
        toast.success(res.data.message);

        setDetails(initialState);
        history.push(`/app/dashboard`);
      })
      .catch((error) => {
        toast.error(
          `${error.response?.data?.message || "Login failed"}! Login Again.`
        );
        setDetails(initialState);
      });
  };

  return (
    <div className=" bg-yellow-50">
      {/* Login form */}
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-yellow-50">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-contain w-full h-full dark:hidden"
                src={DNKlogo}
                alt="logo"
              />
            </div>
            <main className="flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
              <form onSubmit={onSubmitHandler}>
                <div className="w-full">
                  <h1 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Login
                  </h1>
                  <Label className="mt-5 text-lg">
                    <span>Email</span>
                    <Input
                      className="mt-2"
                      type="email"
                      placeholder="john@gmail.com"
                      required
                      onChange={onChangeHandler}
                      value={details?.email}
                      name="email"
                    />
                  </Label>

                  <Label className="mt-4 text-lg">
                    <span>Password</span>
                    <Input
                      className="mt-2"
                      type="password"
                      placeholder="Min. 8 Characters"
                      minLength={8}
                      required
                      onChange={onChangeHandler}
                      value={details?.password}
                      name="password"
                    />
                  </Label>

                  <div className="flex items-center justify-between mt-4">
                    <div className="ml-auto">
                      <p
                        className="text-sm font-medium text-red-600 dark:text-white-400 hover:underline cursor-pointer"
                        // to="/register"
                        onClick={() =>
                          dispatchModal({
                            type: "OPEN_MODAL",
                          })
                        }
                      >
                        Register
                      </p>
                    </div>
                  </div>

                  {/* <Link to="/otp"> */}
                  <Button
                    className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
                    block
                    type="submit"
                  >
                    Log in
                  </Button>

                  {/* </Link> */}
                </div>
              </form>

              {/* <Button
                className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
                block
                onClick={getLocation}
              >
                Get location
              </Button> */}

              {/* <label>{t("choose")}</label>
              <select value={lang} onChange={handleChange}>
                {languages.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  );
                })}
              </select> */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
