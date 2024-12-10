import React, { useState } from "react";
import { Label, Input, Button, Select } from "@windmill/react-ui";
import toast from "react-hot-toast";
import axios from "../axios/axios";

const AddCustomOffice = () => {
  const initialState = {
    email: "",
    phoneNumber: "",
    district: "",
    state: "",
    pincode: "",
  };
  const [details, setDetails] = useState(initialState);

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.loading("Loading...");

    await axios
      .post("/superAdmin/registerCustomOffice", details)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        setDetails(initialState);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <main className="flex-1 items-center justify-center p-6 sm:p-12 w-full">
        <form onSubmit={onSubmitHandler}>
          <div className="w-full">
            <h1 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Add Custom Office
            </h1>
            <div className="flex gap-5">
              <div style={{ flexGrow: 1 }}>
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
                  <span>Phone Number</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter Phone Number"
                    minLength={10}
                    required
                    onChange={onChangeHandler}
                    value={details?.phoneNumber}
                    name="phoneNumber"
                  />
                </Label>
                <Label className="mt-4 text-lg">
                  <span>District</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter district"
                    required
                    onChange={onChangeHandler}
                    value={details?.district}
                    name="district"
                  />
                </Label>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Label className="mt-4 text-lg">
                  <span>State</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter State"
                    minLength={8}
                    required
                    onChange={onChangeHandler}
                    value={details?.state}
                    name="state"
                  />
                </Label>

                <Label className="mt-4 text-lg">
                  <span>Pincode</span>
                  {/* <Select
                    className="mt-1"
                    onChange={onChangeHandler}
                    value={details?.pincode}
                    required
                    name="pincode"
                  >
                    <option>--Select--</option>
                    <option name="411037">411037</option>
                    <option name="411038">411038</option>
                    <option name="411039">411039</option>
                  </Select> */}
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter Pincode"
                    required
                    onChange={onChangeHandler}
                    value={details?.pincode}
                    name="pincode"
                  />
                </Label>
              </div>
            </div>

            {/* <Link to="/otp"> */}
            <Button
              className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
              block
              type="submit"
            >
              Submit
            </Button>

            {/* </Link> */}
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddCustomOffice;
