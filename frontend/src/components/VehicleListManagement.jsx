import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextapi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VehicleListManagement() {
  const { auth, setauth } = useContext(AuthContext);
  const [vehicle, setvehicle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/get-vehicle", {
        headers: { Authorization: "Bearer " + auth.token },
      })
      .then((result) => {
        console.log(result.data);
        setvehicle([...vehicle, ...result.data]);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  console.log(vehicle);

  const addVehicle = () => {
    navigate("/admin/add-vehicle");
  };

  const handleEdit = () => {
    navigate("/admin/edit-vehicle");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center text-slate-700 mb-4">
        Vehicle List Management
      </h1>
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white font-bold rounded-lg p-2 px-4 border-2 border-gray-500"
          onClick={addVehicle}
        >
          Add Vehicle
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-red-200 rounded-lg">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Manufacturer</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-red-50 rounded-lg text-center">
            {vehicle?.map((v, index) => (
              <tr key={v._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{v.name}</td>
                <td className="px-4 py-2">
                  {v.images.map((imageRelativePath, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={`/uploads/${imageRelativePath}`} // Adjust the path as needed
                      alt={`Image ${imageIndex + 1}`}
                      width="100" // Adjust the width as needed
                    />
                  ))}
                </td>
                <td className="px-4 py-2">{v.manufacturer}</td>
                <td className="px-4 py-2">{v.model}</td>
                <td className="px-4 py-2">Rs {v.price}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-400 text-white font-semibold rounded-lg p-1 border-2 border-gray-500" onClick={handleEdit}>
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button className="bg-red-600 text-white font-semibold rounded-lg p-1 border-2 border-gray-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleListManagement;
