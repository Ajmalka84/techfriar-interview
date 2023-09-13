import Login from "./components/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import VehicleListManagement from "./components/VehicleListManagement";
import AddVehicle from "./components/AddVehicle";
import EditVehicle from "./components/EditVehicle";
function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="/admin/home" element={<VehicleListManagement />}/>
        <Route path="/admin/add-vehicle" element={<AddVehicle />}/>
        <Route path="/admin/edit-vehicle" element={<EditVehicle />}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
 