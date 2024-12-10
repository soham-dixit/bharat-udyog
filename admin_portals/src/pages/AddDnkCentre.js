import React, { useState } from "react";
import { Label, Input, Button, Select } from "@windmill/react-ui";
import toast from "react-hot-toast";
import axios from "../axios/axios";

const AddDnkCentre = () => {
  const initialState = {
    email: "",
    officeName: "",
    phoneNumber: "",
    district: "",
    state: "",
    pincode: "",
    postMasterName: "",
  };
  const [details, setDetails] = useState(initialState);
  const [pincode, setPincode] = useState("");

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onPincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const autofillDetails = async () => {
    if (!pincode) {
      toast.error("Please enter a valid pincode");
      return;
    }
    toast.loading("Fetching details...");
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`, { withCredentials: false });
  
      const postOfficeData = res.data[0]?.PostOffice;
      if (postOfficeData?.length > 0) {
        const firstPostOffice = postOfficeData[0];
  
        setDetails({
          ...details,
          district: firstPostOffice.District || "",
          state: firstPostOffice.State || "",
          officeName: `${firstPostOffice.Name || ""} (${firstPostOffice.BranchType || ""})`,
          pincode: firstPostOffice.Pincode || "",
        });
  
        toast.remove();
        toast.success("Details fetched successfully");
      } else {
        toast.remove();
        toast.error("No data found for the given pincode");
      }
    } catch (error) {
      toast.remove();
      toast.error(
        error.response?.data?.message || "Error fetching details for pincode"
      );
    }
  };
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.loading("Loading...");

    await axios
      .post("/superAdmin/registerDnkCentre", details)
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        setDetails(initialState);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error.response?.data?.message || "Error submitting data");
      });
  };

  return (
    <div>
      <main className="flex-1 items-center justify-center p-6 sm:p-12 w-full">
        <form onSubmit={onSubmitHandler}>
          <div className="w-full">
            <h1 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Add Post Office
            </h1>
            <div className="flex gap-5">
              {/* Autofill Section */}
              <div style={{ flexGrow: 1 }}>
                <Label className="mt-4 text-lg">
                  <span>Enter Pincode to Autofill</span>
                  <div className="flex mt-2">
                    <Input
                      type="text"
                      placeholder="Enter Pincode"
                      onChange={onPincodeChange}
                      value={pincode}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={autofillDetails}
                      className="ml-2 bg-red-700 text-white font-Poppins text-lg"
                    >
                      Autofill
                    </Button>
                  </div>
                </Label>
              </div>
            </div>

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
      <span>Office Name</span>
      <Input
        className="mt-2"
        type="text"
        placeholder="Enter Office Name"
        required
        onChange={onChangeHandler}
        value={details?.officeName}
        name="officeName"
      />
    </Label>
  </div>

  <div style={{ flexGrow: 1 }}>
    <Label className="mt-5 text-lg">
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

    <Label className="mt-4 text-lg">
      <span>State</span>
      <Input
        className="mt-2"
        type="text"
        placeholder="Enter State"
        required
        onChange={onChangeHandler}
        value={details?.state}
        name="state"
      />
    </Label>
  </div>

  <div style={{ flexGrow: 1 }}>
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
      <span>Post Master Name</span>
      <Input
        className="mt-2"
        type="text"
        placeholder="Enter postmaster name"
        required
        onChange={onChangeHandler}
        value={details?.postMasterName}
        name="postMasterName"
      />
    </Label>
  </div>
</div>


            <Button
              className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
              block
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddDnkCentre;