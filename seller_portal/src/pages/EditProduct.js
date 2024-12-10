import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";
import { Card, CardBody, Button, Input, Textarea } from "@windmill/react-ui";
import axios from "../axios/axios";
import toast from "react-hot-toast";

const EditProduct = () => {
  const history = useHistory();
  const { id } = useParams();
  const [editedProduct, setEditedProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/exporter/getProductDetails/${id}`);
        toast.success(response.data.message);
        setEditedProduct(response.data.product);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  const updateDetails = async () => {
    try {
      const response = await axios.put(
        `/exporter/updateProductDetails/${id}`,
        editedProduct
      );
      toast.success(response.data.message);
      setEditedProduct(response.data.product);
      setIsEditing(false); // Exit edit mode after a successful update
      history.push("/app/all-products");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    updateDetails();
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <PageTitle className="text-gray-700">Product Details</PageTitle>

      <div className="flex text-gray-700 dark:text-gray-300 mb-4 space-x-2">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        <span className="mx-2 text-purple-600">&gt;</span>
        <NavLink exact to="/app/all-products" className="mx-2 text-purple-600">
          All Products
        </NavLink>
        <span className="mx-2 text-purple-600">Product Details</span>
      </div>

      <Card className="my-8 shadow-md border border-gray-300">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div>
              <div className="relative">
                <img
                  alt=""
                  className="w-full rounded-lg border border-gray-300"
                  src={editedProduct?.photoUrl}
                />
              </div>
            </div>

            <div className="mx-8 pt-5 md:pt-0">
              <h1 className="text-lg mb-6 font-bold text-gray-800 dark:text-gray-200">
                <span className="text-lg mb-2 font-semibold text-gray-600">
                  Name:
                </span>{" "}
                {isEditing ? (
                  <Input
                    className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 text-gray-700"
                    name="productName"
                    placeholder="Product Name"
                    value={editedProduct?.productName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    {editedProduct?.productName}
                  </span>
                )}
              </h1>
              <h1 className="mb-4 text-lg text-gray-800 dark:text-gray-300">
                <span className="mb-2 text-lg text-gray-600">Category:</span>{" "}
                {isEditing ? (
                  <Input
                    className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 text-gray-700"
                    name="category"
                    placeholder="Product Category"
                    value={editedProduct?.category}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-base text-gray-800 dark:text-gray-300">
                    {editedProduct?.category}
                  </span>
                )}
              </h1>
              <p className="mb-4 text-lg text-gray-800 dark:text-gray-300">
                <span className="mb-2 text-lg text-gray-600">Description:</span>{" "}
                {isEditing ? (
                  <Textarea
                    className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 text-gray-700"
                    rows="2"
                    name="description"
                    placeholder="Short Description"
                    value={editedProduct?.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-base text-gray-800 dark:text-gray-300">
                    {editedProduct?.description}
                  </span>
                )}
              </p>

              <h4 className="mb-4 text-lg text-gray-800 dark:text-gray-300">
                <span className="mb-2 text-lg text-gray-600">Price:</span>{" "}
                {isEditing ? (
                  <Input
                    className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 text-gray-700"
                    name="price"
                    placeholder="Product Price"
                    value={editedProduct?.price}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-base text-gray-800 dark:text-gray-300">
                    {editedProduct?.price}
                  </span>
                )}
              </h4>
              <p className="text-lg text-gray-900 dark:text-gray-400">
                <span className="mb-2 text-lg text-gray-600">
                  Product Quantity:
                </span>{" "}
                {isEditing ? (
                  <Input
                    className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 text-gray-700"
                    name="availableQty"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="Quantity"
                    value={editedProduct?.availableQty}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-base text-gray-800 dark:text-gray-300">
                    {editedProduct?.availableQty}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div>
            {isEditing ? (
              <Button
                className="bg-red-700 text-white hover:bg-red-500 mt-4 border "
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                className="bg-red-700 text-white hover:bg-red-500 mt-4 border "
                onClick={toggleEditMode}
              >
                Edit Product
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditProduct;
