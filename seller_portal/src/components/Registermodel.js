import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  Input,
  Label,
} from "@windmill/react-ui";
import { ModalContext } from "../context/modal/ModalContext";
import toast from "react-hot-toast";
import axios from "../axios/axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterModal = () => {
  const initialState = {
    companyName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    password: "",
    latitude: "",
    longitude: "",
    isKycSubmitted: false,
  };
  const { modalState, dispatchModal } = useContext(ModalContext);
  const [details, setDetails] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);
  const history = useHistory();

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // const getLocation = () => {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         resolve(position.coords);
  //       },
  //       (error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // };

  // const getLocation = ({ onLocationReceived, onLocationError }) => {
  //   useEffect(() => {
  //     // Check if geolocation is supported
  //     if ("geolocation" in navigator) {
  //       // Request location permission and get coordinates
  //       navigator.geolocation.getCurrentPosition(
  //         // Success callback
  //         (position) => {
  //           const { latitude, longitude } = position.coords;

  //           // Call the callback with location data
  //           onLocationReceived({
  //             latitude,
  //             longitude
  //           });
  //         },
  //         // Error callback
  //         (error) => {
  //           let errorMessage;
  //           switch(error.code) {
  //             case error.PERMISSION_DENIED:
  //               errorMessage = "User denied the request for Geolocation.";
  //               break;
  //             case error.POSITION_UNAVAILABLE:
  //               errorMessage = "Location information is unavailable.";
  //               break;
  //             case error.TIMEOUT:
  //               errorMessage = "The request to get user location timed out.";
  //               break;
  //             default:
  //               errorMessage = "An unknown error occurred.";
  //           }

  //           // Call the error callback
  //           onLocationError(errorMessage);
  //         },
  //         // Options
  //         {
  //           enableHighAccuracy: true, // Request most accurate position
  //           timeout: 5000, // 5 seconds timeout
  //           maximumAge: 0 // Don't use cached location
  //         }
  //       );
  //     } else {
  //       // Geolocation is not supported
  //       onLocationError("Geolocation is not supported by this browser.");
  //     }
  //   }, []); // Empty dependency array means this runs once on mount

  //   // No render method - this component works behind the scenes
  //   return null;
  // };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDetails((prevDetails) => ({
            ...prevDetails,
            latitude,
            longitude,
          }));
          setIsLocationAllowed(true);
          toast.success("Location retrieved successfully!");
        },
        (error) => {
          setIsLocationAllowed(false);
          let errorMessage = "An unknown error occurred.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied by user.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information unavailable.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "Location request timed out.";
          }
          toast.error(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setIsLocationAllowed(false);
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Request location
    getLocation();
    // Delay submission to allow geolocation state update
    setTimeout(async () => {
      if (!isLocationAllowed) {
        toast.error("Location is required to submit the form.");
        return;
      }

      toast.success("Got the location and submitted the form.");
      await axios
        .post("/exporter/registerExporter", details)
        .then((res) => {
          toast.success(res.data.message);
          setDetails(initialState);
          dispatchModal({
            type: "CLOSE_MODAL",
          });
          history.push(`/kyc/${res?.data?.id}`);
          toast.error("Please complete your KYC");
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Error submitting the form."
          );
        });
    }, 1000); // Adjust delay as necessary to sync with `getLocation`
  };

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  // try {
  //   // const coords = await getLocation();
  //   // if (coords !== null) {
  //   //   setDetails({
  //   //     ...details,
  //   //     latitude: coords.latitude,
  //   //     longitude: coords.longitude,
  //   //   });

  //   // Rest of your form submission logic
  //   const res = await axios.post("/exporter/registerExporter", details);
  //   toast.success("Got the location and submitted the form");
  //   setDetails(initialState);
  //   dispatchModal({
  //     type: "CLOSE_MODAL",
  //   });
  //   history.push(`/kyc/${res?.data?.id}`);
  //   toast.error("Please complete your KYC..");
  // } catch (error) {
  //   console.error("Error getting location:", error);
  //   toast.error("Error getting location. Please try again.");
  // }

  // await axios
  //   .post("/exporter/registerExporter", details)
  //   .then((res) => {
  //     toast.success(res.data.message);
  //     setDetails(initialState);
  //     dispatchModal({
  //       type: "CLOSE_MODAL",
  //     });
  //     history.push(`/kyc/${res?.data?.id}`);
  //     toast.error("Please complete your KYC");
  //     // getLocation();
  //     // toast.success("Got the location and submitted the form");
  //   })
  //   .catch((error) => {
  //     toast.error(error.response.data.message);
  //   });
  //};

  // useEffect(() => {
  //   if (location !== null) {
  //     // Here you can perform actions that depend on the location.
  //     // handleFormSubmission();
  //     console.log(
  //       "Location inside useEffect is: ",
  //       location.latitude,
  //       location.longitude
  //     );
  //   }
  // }, [location]);

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   getLocation();
  // };

  return (
    <>
      <Modal
        isOpen={modalState.isModalOpen}
        onClose={() => dispatchModal({ type: "CLOSE_MODAL" })}
      >
        <ModalHeader className="text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center">
          Register
        </ModalHeader>
        <ModalBody>
          <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-yellow-50">
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <main className="flex-1 items-center justify-center pr-3 pl-3 md:w-1/2">
                <form onSubmit={onSubmitHandler}>
                  <div className="w-full">
                    <div className="w-full grid grid-cols-2 gap-2">
                      <Label className="mt-2 text-lg">
                        <span>Company Name</span>
                        <Input
                          className="mt-1"
                          type="text"
                          placeholder="Enter your Company Name"
                          required
                          onChange={onChangeHandler}
                          value={details?.companyName}
                          name="companyName"
                        />
                      </Label>
                      <Label className="mt-2 text-lg">
                        <span>Email</span>
                        <Input
                          className="mt-1"
                          type="email"
                          placeholder="Enter your Email"
                          required
                          onChange={onChangeHandler}
                          value={details?.email}
                          name="email"
                        />
                      </Label>
                      <Label className="mt-2 text-lg">
                        <span>Phone No.</span>
                        <Input
                          className="mt-1"
                          type="text"
                          placeholder="Enter your Phone Number"
                          required
                          onChange={onChangeHandler}
                          value={details?.phoneNumber}
                          name="phoneNumber"
                        />
                      </Label>

                      <Label className="mt-2 text-lg">
                        <span>City</span>
                        <Input
                          className="mt-1"
                          type="text"
                          placeholder="Enter your City"
                          required
                          onChange={onChangeHandler}
                          value={details?.city}
                          name="city"
                        />
                      </Label>

                      <Label className="mt-2 text-lg">
                        <span>Pincode</span>
                        <Input
                          className="mt-1"
                          type="text"
                          placeholder="Enter your Pincode"
                          required
                          onChange={onChangeHandler}
                          value={details?.pincode}
                          name="pincode"
                        />
                      </Label>

                      <Label className="mt-2 text-lg">
                        <span>Password</span>
                        <Input
                          className="mt-1"
                          type="password"
                          placeholder="Min. 8 Characters"
                          minLength={8}
                          required
                          onChange={onChangeHandler}
                          value={details?.password}
                          name="password"
                        />
                      </Label>
                    </div>
                    <Label className="mt-2 text-lg">
                      <span>Address</span>
                      <Input
                        className="mt-1"
                        type="text"
                        placeholder="Enter your full Address"
                        required
                        onChange={onChangeHandler}
                        value={details?.address}
                        name="address"
                      />
                    </Label>
                    {/* <Link to="/otp"> */}
                    <Button
                      className="mt-6 text-2xl bg-red-700 text-white font-Poppins"
                      block
                      type="submit"
                    >
                      Register
                    </Button>

                    {/* </Link> */}
                  </div>
                </form>
              </main>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RegisterModal;
