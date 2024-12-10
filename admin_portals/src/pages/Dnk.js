import { Input, Label, Button, Select } from "@windmill/react-ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DNKlogo from "../assets/img/logo.png";

function Dnk() {
  return (
    <div>
      <header className="bg-red-600 text-white p-3 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <img
              aria-hidden="true"
              className="w-20 h-15 mr-2"
              src={DNKlogo}
              alt="logo"
            />
            <div>
              <h1 className="text-2xl font-medium">
                <label>Post Master Portal</label>
              </h1>
              <h4 className="text-s font-medium">
                <label>India Post</label>
              </h4>
            </div>
          </div>

          <nav className="mt-3 text-xl text-right">
            <ul className="flex space-x-10">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex items-center min-h-screen p-4 bg-gray-100">
        <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-5000">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  Post Office
                </h2>

                <Label className="mt-5 text-lg">
                  <span>Pincode</span>
                  <Input
                    className="mt-2"
                    type="text"
                    placeholder="Enter Post Office pincode"
                    maxLength={6}
                    required
                  />
                </Label>

                {/* fetch through API */}
                <Label className="mt-5 text-lg">
                  <span>City</span>
                  <Input
                    className="mt-2"
                    type="text"
                    readOnly
                    placeholder="City name"
                    maxLength={25}
                    required
                  />
                </Label>

                <Label className="mt-5 text-lg">
                  <span>DNK Center</span>
                  <Input
                    className="mt-2"
                    type="text"
                    readOnly
                    placeholder="Dnk  name"
                    maxLength={25}
                    required
                  />
                </Label>

                {/* Dropdown box */}
                {/* <Label className="mt-6 text-lg">
                        <span>Select Document</span>
                        <Select
                            className="mt-2"
                            value={selectedDocument}
                            onChange={(e) => setSelectedDocument(e.target.value)}
                        >
                            <option value="IEC">Adhaar Card</option>
                            <option value="AD Code">AD Code</option>
                            <option value="Other">Other</option>
                        </Select>
                        </Label> */}

                <Link to="/otp">
                  <Button
                    className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
                    block
                    // onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dnk;
