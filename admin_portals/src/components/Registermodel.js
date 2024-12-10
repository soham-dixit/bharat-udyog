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

const RegisterModal = () => {
  const { modalState, dispatchModal } = useContext(ModalContext);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    password: "",
    email: "",
  });

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        selectedRole === "Post Master"
          ? "/details/getAllDnkCentre"
          : "/details/getAllCustomOffices"
      );
      toast.success("Locations Fetched");
      setLocations(response.data.data);
    } catch (error) {
      toast.error("Error fetching locations.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedRole) {
      fetchLocations();
    }
  }, [selectedRole]);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setRegistrationStep(2);
  };

  const handleLocationSelection = (e) => {
    e.preventDefault();
    let selectedLocationDetails;

    if (selectedRole === "Post Master") {
      selectedLocationDetails = locations.filter(
        (location) => location.pincode == selectedLocation
      )[0];
    } else {
      selectedLocationDetails = locations.filter(
        (location) => location.district == selectedLocation
      )[0];
    }

    setRegistrationDetails({
      ...registrationDetails,
      email: selectedLocationDetails.email,
    });

    if (selectedLocationDetails?.isAssigned) {
      toast.error(
        `${
          selectedRole === "Post Master" ? "Post Master" : "Custom Officer"
        } already assigned to this location`
      );
      return;
    }

    setRegistrationStep(3);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Loading...");

    await axios
      .post(
        selectedRole === "Post Master"
          ? "/postMaster/registerPostMaster"
          : "/customOfficer/registerCustomOfficer",
        registrationDetails
      )
      .then((res) => {
        toast.remove();
        toast.success(res.data.message);
        // Close the modal and reset state
        dispatchModal({ type: "CLOSE_MODAL" });
        setRegistrationStep(1);
        setSelectedRole("");
        setLocations([]);
        setSelectedLocation("");
        setRegistrationDetails({ name: "", password: "", email: "" });
      })
      .catch((error) => {
        toast.remove();
        toast.error(`${error.response.data.message} Failed!!`);
        setRegistrationStep(1);
        setSelectedRole("");
        setLocations([]);
        setSelectedLocation("");
        setRegistrationDetails({ name: "", password: "", email: "" });
      });
  };

  return (
    <>
      <Modal
        isOpen={modalState.isModalOpen}
        onClose={() => dispatchModal({ type: "CLOSE_MODAL" })}
      >
        <ModalHeader>{modalState.modalHeader}</ModalHeader>
        <ModalBody>
          {registrationStep === 1 && (
            <>
              <Label className="mb-3">Select Role:</Label>
              <Select
                value={selectedRole}
                onChange={(e) => handleRoleSelection(e.target.value)}
              >
                <option value="">-- Select Role --</option>
                <option value="Post Master">Post Master</option>
                <option value="Custom Officer">Custom Officer</option>
              </Select>
            </>
          )}
          {registrationStep === 2 && selectedRole && (
            <form onSubmit={handleLocationSelection}>
              <Label className="mb-3">
                Select {selectedRole === "Post Master" ? "Pincode" : "District"}
                :
              </Label>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
              >
                <option value="">
                  -- Select{" "}
                  {selectedRole == "Post Master" ? "Pincode" : "District"} --
                </option>
                {locations?.map((location, i) => (
                  <option
                    value={
                      selectedRole === "Post Master"
                        ? location.pincode
                        : location.district
                    }
                    key={i}
                  >
                    {selectedRole === "Post Master"
                      ? location.pincode
                      : location.district}
                  </option>
                ))}
              </Select>
              <Button
                className="mt-4 mr-4"
                onClick={() => setRegistrationStep(1)}
              >
                Back
              </Button>
              <Button className="mt-4" type="submit">
                Next
              </Button>
            </form>
          )}
          {registrationStep === 3 && selectedRole && selectedLocation && (
            <form onSubmit={handleRegistrationSubmit}>
              <Label className="mb-2">Name:</Label>
              <Input
                className="mb-4"
                type="text"
                required
                value={registrationDetails.name}
                onChange={(e) =>
                  setRegistrationDetails({
                    ...registrationDetails,
                    name: e.target.value,
                  })
                }
              />
              <Label className="mb-2">Password:</Label>
              <Input
                type="password"
                className="mb-4"
                value={registrationDetails.password}
                required
                onChange={(e) =>
                  setRegistrationDetails({
                    ...registrationDetails,
                    password: e.target.value,
                  })
                }
              />
              <Button className="mt-4" type="submit">
                Submit
              </Button>
            </form>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default RegisterModal;
