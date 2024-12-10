import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import DNKlogo from "../assets/img/logo.png";
import axios from "../axios/axios";

import { Label, Input, Button, Select } from "@windmill/react-ui";
import UserContext from "../context/User/UserContext";
import { ModalContext } from "../context/modal/ModalContext";

function Login() {
  const { dispatch } = useContext(UserContext);
  const { dispatchModal } = useContext(ModalContext);

  const history = useHistory();

  const initialState = {
    email: "",
    password: "",
    role: "",
  };
  const [details, setDetails] = useState(initialState);
  const userRole =
    details.role === "Admin"
      ? "admin"
      : details.role === "Post Master"
      ? "postMaster"
      : "custom";

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");

    await axios
      .post("/auth/login", details)
      .then((res) => {
        if (res.data.user.role != details.role) {
          toast.remove();
          toast.error("User doesn't exists.");
          return;
        }
        dispatch({
          type: "LOGIN",
          payload: res.data.user,
        });
        toast.remove();
        toast.success(res?.data.message);

        setDetails(initialState);
        history.push(`/app/${userRole}/dashboard`);
      })
      .catch((error) => {
        toast.remove();
        toast.error(`${error.response?.data.message} Login Again!!`);

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
                      value={details.password}
                      name="password"
                    />
                  </Label>

                  <Label className="mt-4 text-lg">
                    <span>Role</span>
                    <Select
                      className="mt-1"
                      onChange={onChangeHandler}
                      value={details?.role}
                      required
                      name="role"
                    >
                      <option>--Select--</option>
                      <option value="Admin">Admin</option>
                      <option value="Custom Officer">Custom Officer</option>
                      <option value="Post Master">Post Master</option>
                    </Select>
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
