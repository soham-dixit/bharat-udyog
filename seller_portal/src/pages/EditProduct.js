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
  const [editedProduct, setEditedProduct] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    availableQty: '',
    photoUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/exporter/getProductDetails/${id}`);
        toast.success(response.data.message);
        setEditedProduct(response.data.product);
        
        // Fetch required documents based on product category
        if (response.data.product.category) {
          fetchRequiredDocuments(response.data.product.category);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch product details");
      }
    };

    fetchData();
  }, [id]);

  const fetchRequiredDocuments = async (category) => {
    try {
      setIsDocumentsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v4/utils/docs", 
        { category }
      );
      
      if (response.data.success && response.data.data) {
        // Updated to match the new payload structure
        setRequiredDocuments(response.data.data.documents);
      }
    } catch (error) {
      console.error("Error fetching required documents:", error);
      toast.error("Could not fetch required export documents");
    } finally {
      setIsDocumentsLoading(false);
    }
  };

  const updateDetails = async () => {
    try {
      const response = await axios.put(
        `/exporter/updateProductDetails/${id}`,
        editedProduct
      );
      toast.success(response.data.message);
      setEditedProduct(response.data.product);
      setIsEditing(false);
      history.push("/app/all-products");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update product");
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
                  alt="Product"
                  className="w-full rounded-lg border border-gray-300"
                  src={editedProduct?.photoUrl || '/default-product-image.png'}
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
                    value={editedProduct?.productName || ''}
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
                    value={editedProduct?.category || ''}
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
                    value={editedProduct?.description || ''}
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
                    value={editedProduct?.price || ''}
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
                    value={editedProduct?.availableQty || ''}
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

          {/* Required Export Documents Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Required Export Documents
            </h2>
            {isDocumentsLoading ? (
              <p className="text-gray-600">Loading required documents...</p>
            ) : requiredDocuments && requiredDocuments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requiredDocuments.map((doc, index) => (
                  <Card 
                    key={index} 
                    className="border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    <CardBody>
                      <h3 className="font-semibold text-gray-600 mb-2 text-lg">
                        {doc.documentName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {doc.description}
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">
                          <strong>Procurement:</strong> {doc.procurement}
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Regulatory Body:</strong> {doc.regulatoryBody}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No specific export documents found for this product category.
              </p>
            )}
          </div>

          <div className="mt-6">
            {isEditing ? (
              <Button
                className="bg-red-700 text-white hover:bg-red-500 mt-4 border"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                className="bg-red-700 text-white hover:bg-red-500 mt-4 border"
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