import "./App.scss";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Home from "./layout/Home";
import Login from "./layout/Login";

import DormitoryList from "./pages/DormitoryList";
import StudentList from "./pages/StudentList";
import Assets from "./pages/Assets";
import Repairs from "./pages/Repairs";
import Electricity from "./pages/Electricity";
import Visitors from "./pages/Visitors";
import ManagersSetting from "./pages/ManagersSetting";
import DormitoriesDis from "./pages/DormitoriesDis";
import Departments from "./pages/Departments";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} >
            <Route path="managers-setting" element={<ManagersSetting />} />
            <Route path="dormitory-list" element={<DormitoryList />} />
            <Route path="dormitory-dis" element={<DormitoriesDis />} />
            <Route path="student-list" element={<StudentList />} />
            <Route path="departments" element={<Departments />} />
            <Route path="assets" element={<Assets />} />
            <Route path="repairs" element={<Repairs />} />
            <Route path="electricity" element={<Electricity />} />
            <Route path="visitors" element={<Visitors />} />
          </Route>
          {/* Default router setting */}
          <Route index element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
