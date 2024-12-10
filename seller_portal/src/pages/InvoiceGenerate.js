import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import axios from "../axios/axios";
import { Card, CardBody, Button, Table } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";

const headingStyle = "text-3xl font-semibold mb-4 text-center text-red-700";
const sectionTitleStyle = "text-lg font-semibold mt-4 mb-2";
const contentStyle = "text-gray-700 mb-2";
const buttonStyle = "mt-6 bg-red-700 text-white hover:bg-red-500";

const GenerateInvoice = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [exporterDetails, setExporterDetails] = useState({});
  const [consumerDetails, setConsumerDetails] = useState({});
  const [invoiceDetails, setInvoiceDetails] = useState({
    date: new Date().toLocaleDateString(),
  });

  const fetchData = async () => {
    try {
      const invoiceDetailsResponse = await axios.get(
        `/exporter/getInvoiceDetails/${id}`
      );

      toast.success(invoiceDetailsResponse.data.message);

      const { order, exporter } = invoiceDetailsResponse.data.data;
      setOrder(order);
      setExporterDetails({
        exporterName: exporter.companyName,
        exporterAddress: exporter.address,
        exporteremailID: exporter.email,
        exporterno: exporter.phoneNumber,
      });
      setConsumerDetails({
        consumerName: order.orderedBy,
        consumerPhone: order.phoneNumber,
        consumerAddress: order.address,
        consumerPincode: order.pincode,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message);
    }
  };

  const exportToPDF = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.internal.scaleFactor = 1;
      pdf.addImage(
        canvas.toDataURL("image/png", 1.0),
        "PNG",
        0,
        0,
        canvas.width,
        canvas.height
      );
      pdf.save(`invoice-${order._id}.pdf`);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card className="mt-4 mb-4 shadow-md">
        <CardBody>
          <div id="invoiceCapture" className="border p-4">
            <h1 className={headingStyle}>Commercial Invoice </h1>
            <p className="text-gray-700 mb-2 font-semibold">
              Invoice Number: {order._id}
            </p>
            <p className="text-gray-700 mb-2 font-semibold">
              Date: {invoiceDetails.date}
            </p>

            <div className="border p-4 mt-4">
              <h2 className={sectionTitleStyle}>Exporter Details:</h2>
              <p className={contentStyle}>
                Name: {exporterDetails.exporterName}
              </p>
              <p className={contentStyle}>
                Address: {exporterDetails.exporterAddress}
              </p>
              <p className={contentStyle}>
                Email ID: {exporterDetails.exporteremailID}
              </p>
              <p className={contentStyle}>
                Phone: {exporterDetails.exporterno}
              </p>
            </div>

            <div className="border p-4 mt-4">
              <h2 className={sectionTitleStyle}>Consumer Details:</h2>
              <p className={contentStyle}>
                Name: {consumerDetails.consumerName}
              </p>
              <p className={contentStyle}>
                Phone: {consumerDetails.consumerPhone}
              </p>
              <p className={contentStyle}>
                Address: {consumerDetails.consumerAddress}
              </p>
              <p className={contentStyle}>
                Pincode: {consumerDetails.consumerPincode}
              </p>
            </div>

            <h2 className={sectionTitleStyle}>Product Details:</h2>
            <div className="flex mx-auto w-full border p-4">
              <Table className="w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Sr. No.</th>
                    <th className="border p-2">Product ID</th>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">1</td>
                    <td className="border p-2">{order.productId}</td>
                    <td className="border p-2">{order.productName}</td>
                    <td className="border p-2">{order.qty}</td>
                    <td className="border p-2">${order.price}</td>
                  </tr>
                  {/* Add more rows if needed */}
                </tbody>
              </Table>
            </div>

            <div className="text-right font-semibold mt-4 flex justify-between mr-4">
              <p className={contentStyle}>
                Total Amount: ${order.qty * order.price}
              </p>
            </div>
          </div>

          <Button onClick={exportToPDF} className={buttonStyle}>
            <BiCloudDownload /> Download PDF
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default GenerateInvoice;
