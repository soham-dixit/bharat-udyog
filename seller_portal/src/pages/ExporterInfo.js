import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, AddIcon } from "../icons";
import { Card, CardBody, Label, Textarea, Button } from "@windmill/react-ui";
import UserContext from "../context/User/UserContext";
import { toast } from "react-hot-toast";
import axios from "../axios/axios";

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const ExporterInfo = () => {
  const { state } = useContext(UserContext);
  const initialState = {
    aboutBusiness: "",
    aboutProducts: "",
    rangeSpecs: "",
    exporterId: state.user.id, // Assuming exporterId is tied to the logged-in user
  };
  const [details, setDetails] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const CHARACTER_LIMIT = 1000;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `/exporter/getExporterInfo/${state.user.id}`
        );
        setDetails(response.data.data);
        // Concatenate details for the chatbot data
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [state.user.id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (value.length <= CHARACTER_LIMIT) {
      setDetails({ ...details, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `/exporter/addDetails/${details.exporterId}`,
        details
      );
      toast.success(response.data.message);
      const concatenatedData = `
        About Business: ${details.aboutBusiness}
        About Products: ${details.aboutProducts}
        Range & Specifications: ${details.rangeSpecs}
      `.trim();

      // Submit chatbot data
      const chatbotResponse = await axios.post(
        "https://c2b9-49-249-229-42.ngrok-free.app/addChatBotData",
        {
          seller_id: details.exporterId,
          data: concatenatedData,
        }
      );
      toast.success(
        chatbotResponse.data.message || "Chatbot data submitted successfully!"
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageTitle>Exporter Information</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-color">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" color="red-600" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Exporter Info</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-2">
          <Card className="col-span-2">
            <CardBody>
              <FormTitle>About Your Business</FormTitle>
              <Label>
                <Textarea
                  className="mb-4"
                  required
                  rows="5"
                  placeholder="Describe your business, mission, and operations."
                  name="aboutBusiness"
                  value={details.aboutBusiness}
                  onChange={onChangeHandler}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {CHARACTER_LIMIT - details.aboutBusiness.length} characters
                  remaining
                </p>
              </Label>

              <FormTitle>About Your Products</FormTitle>
              <Label>
                <Textarea
                  className="mb-4"
                  required
                  rows="5"
                  placeholder="Provide details about the products you sell."
                  name="aboutProducts"
                  value={details.aboutProducts}
                  onChange={onChangeHandler}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {CHARACTER_LIMIT - details.aboutProducts.length} characters
                  remaining
                </p>
              </Label>

              <FormTitle>Range & Specifications</FormTitle>
              <Label>
                <Textarea
                  className="mb-4"
                  required
                  rows="5"
                  placeholder="Detail the range and specifications of your products."
                  name="rangeSpecs"
                  value={details.rangeSpecs}
                  onChange={onChangeHandler}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {CHARACTER_LIMIT - details.rangeSpecs.length} characters
                  remaining
                </p>
              </Label>

              <div className="w-full">
                <Button
                  type="submit"
                  className="bg-color"
                  size="large"
                  iconLeft={AddIcon}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Info"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default ExporterInfo;
