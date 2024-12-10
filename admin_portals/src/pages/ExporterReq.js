import React, { useState , useEffect} from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink , useHistory} from "react-router-dom";
import { HomeIcon , EyeIcon} from "../icons";
import { Card, CardBody, Label, Select ,Input, Button, TableBody, TableContainer,
         Table, TableHeader, TableCell, TableRow, TableFooter, Pagination,} from "@windmill/react-ui";
import response from "../utils/demo/exporterData";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const totalResults = response.length;
  const history = useHistory();

  function onPageChange(p) {
    setPage(p);
  }

  const handleEyeIconClick = (exporter) => {
    // Use the exporter_id to construct the URL
    const url = `/app/addExporter/${exporter.exporter_id}`;
    // Navigate to the addExporter page
    history.push(url);
  };
  

  // on page change or sorting order change, load new sliced data
  useEffect(() => {
    let filteredData = [];

    filteredData = response;
    
    // Slice the data for the current page
    const slicedData = filteredData.slice((page - 1) * resultsPerPage, page * resultsPerPage);

    setData(slicedData);
  }, [page, resultsPerPage]);


  return (
    <div>
        <PageTitle>Registration Request</PageTitle>
        {/* Breadcum */}
        <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-red-600">
            <Icon className="w-5 h-5" aria-hidden="true" color="red-600" icon={HomeIcon} />
            <NavLink exact to="/app/dashboard" className="mx-2" >
                Dashboard
            </NavLink>
            </div>
            {">"}
            <NavLink exact to="/app/ExporterList" className="mx-2 text-red-600">
            Orders
            </NavLink>
            {">"}
            <p className="mx-2">Exporter List</p>
        </div>

        <Card className="mt-5 mb-5 shadow-md">
          <CardBody>
            {/* Content for the card body */}
            <p className="flex items-center  text-gray-700  mb-2 mt-2">To accept request click on EyeIcon</p>
          </CardBody>
        </Card>

        <span className="ml-1 mb-8 text-gray-700 font-semibold">Registration Request</span>
      <div  className="mt-4">
      
        {/* Table */}
        <TableContainer className="mb-8">
            
            
            <Table>
            <TableHeader>
                <tr>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Email ID</TableCell>
                <TableCell>Pincode</TableCell>
                <TableCell>Action</TableCell>
                </tr>
            </TableHeader>
            <TableBody>
                {data.map((exporter, i) => (
                <TableRow key={i}>
                    <TableCell>
                    <span className="text-sm">{exporter.exporter_id}</span>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center text-sm">
                        <div>
                        <p className="font-semibold">{exporter.exporter_name}</p>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <span className="text-sm">{exporter.exporter_mobileno}</span>
                    </TableCell>
                    <TableCell>
                    <span className="text-sm">{exporter.exporter_emailid}</span>
                    </TableCell>
                    <TableCell>
                    <span className="text-sm">{exporter.exporter_pincode}</span>
                    </TableCell>
                    <TableCell>
                    <div className="flex ml-2">
                        
                            <Button
                                icon={EyeIcon}
                                className="mr-3"
                                aria-label="Preview"
                                onClick={() => handleEyeIconClick(exporter)}
                            />
                        

                        </div>
                    </TableCell>

                </TableRow>
                ))}
            </TableBody>
            </Table>
            <TableFooter>
            <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
            />
            </TableFooter>
        </TableContainer>
      </div>  
      
    </div> 
  );
};

export default Orders;
