// import React, { useState, useEffect } from "react";
// import axios from "../axios/axios";
// import toast from "react-hot-toast";

// const OperationalCountries = () => {
//   const [operationalCountries, setOperationalCountries] = useState([]);

//   // Fetch operational countries from the server
//   const fetchOperationalCountries = async () => {
//     await axios
//       .get("/details/fetchOperationalCountries")
//       .then((res) => {
//         setOperationalCountries(res.data.data[0].operationalCountries);
//         toast(res.data.message);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         toast(error.response.data.message);
//       });
//   };

//   useEffect(() => {
//     fetchOperationalCountries();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Operational Countries</h1>
//       {/* {operationalCountries?.length === 0 ? (
//         <p>No operational countries available</p>
//       ) : (
//         <ul className="list-disc pl-4">
//           {operationalCountries?.map((country, index) => (
//             <li key={index} className="mb-2">
//               {country}
//             </li>
//           ))}
//         </ul>
//       )} */}

//       <ul className="list-disc pl-4">
//         {operationalCountries?.map((country, index) => (
//           <li key={index} className="mb-2">
//             {country}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OperationalCountries;

import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import toast from "react-hot-toast";

const OperationalCountries = () => {
  const [operationalCountries, setOperationalCountries] = useState([]);

  // Fetch operational countries from the server
  const fetchOperationalCountries = async () => {
    toast.loading("Fetching operational");
    try {
      const response = await axios.get("/details/fetchOperationalCountries");
      setOperationalCountries(response.data.data[0].operationalCountries);
      toast.remove();
      toast.success(response.data.message);
    } catch (error) {
      toast.remove();
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOperationalCountries();
  }, []);

  // Function to chunk array into smaller arrays
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Operational Countries</h1>
      <div className="flex flex-wrap">
        {chunkArray(operationalCountries, 3).map((chunk, index) => (
          <div key={index} className="w-full md:w-1/3 lg:w-1/4 mb-4">
            <ul className="list-disc pl-4">
              {chunk.map((country, innerIndex) => (
                <li key={innerIndex} className="mb-2">
                  {country}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationalCountries;
