import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Label, Input, Button } from "@windmill/react-ui";

function OTP() {
  return (
    <div style={{ backgroundColor: "#FBF9F6" }}>
      <div className="flex items-center min-h-screen p-4 bg-gray-100">
        <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-5000">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-4xl font-semibold text-gray-700 dark:text-gray-200">
                  OTP Verification
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  An OTP has been sent to your email address. Please enter it
                  below.
                </p>

                <Label className="mt-6 text-lg">
                  <span>OTP</span>
                  <Input className="mt-2" type="text" placeholder="Enter OTP" />
                </Label>
                <Link to="/app">
                  <Button
                    className="mt-6 text-2xl bg-color text-white font-Poppins"
                    block
                    to="/app"
                  >
                    Verify OTP
                  </Button>
                </Link>
                <hr className="my-8" />

                <p className="mt-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    Didn't receive the OTP?
                  </span>
                  <button className="ml-1 text-lg font-medium text-color dark:text-white-400 hover:underline">
                    Resend OTP
                  </button>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
