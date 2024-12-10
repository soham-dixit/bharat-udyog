import React, { useState } from "react";
import { Link } from "react-router-dom";

import DNKlogo from "../assets/img/logo.png";
import { Input, Label, Button } from "@windmill/react-ui";

function CreateAccount() {
  // const [imagePreview, setImagePreview] = useState(null);

  // const handleImagePreview = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size <= 500 * 1024) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setImagePreview(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       alert('Image size should be below 500 KB.');
  //     }
  //   }
  // };

  return (
    <div>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 ">
        <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-5000">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-4xl font-semibold text-gray-700 dark:text-gray-200">
                  Create Account
                </h1>

                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Company Details
                </h1>
                <Label className="mt-5 text-lg">
                  <span>Name</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter your company name"
                    maxLength={50}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>Email ID</span>
                  <Input
                    className="mt-2"
                    type="email"
                    placeholder="Enter your company Email ID"
                    required
                  />
                </Label>

                <Label className="mt-4 text-lg">
                  <span>Phone Number</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter your Phone Number"
                    maxLength={10}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>Address</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter your company address"
                    maxLength={100}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>City</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter city name"
                    maxLength={25}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>Pincode</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter pincode"
                    maxLength={6}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>Password</span>
                  <Input
                    className="mt-2"
                    type="password"
                    placeholder="Min. 8 Character"
                    maxLength={6}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>Confirm Password</span>
                  <Input
                    className="mt-2"
                    type="password"
                    placeholder="**********"
                    maxLength={6}
                    required
                  />
                </Label>

                <Link to="/kyc">
                  <Button
                    className="mt-6 text-2xl bg-color text-white font-Poppins"
                    block
                  >
                    Register
                  </Button>
                </Link>

                <hr className="my-8" />

                <p className="mt-4">
                  <span className="text-black">Already have an account? </span>
                  <Link
                    className="text-lg font-medium text-color dark:text-white-400 hover:underline"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
