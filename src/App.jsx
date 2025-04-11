import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Layout from './layout/Layout';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import OtpVerify from './pages/auth/OtpVerify';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';
import Home from './pages/Home/Home';

import Profile from './pages/profile/Profile';
import LabReport from './pages/LabReport/LabReport';
import PrescriptionReport from './pages/PrescriptionReport/PrescriptionReport';
import ProfileUpdate from './pages/update/ProfileUpdate';
import PrescriptionFormContent from './pages/CreatePrescription/PrescriptionFormContent'
const App = () => {
  return (
    <Box className="App">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}/>
            {/* <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/profile" element={<DoctorProfile />} />
              <Route path="/doctor/profile" element={<Profile />} />
              <Route path="/lab/report" element={<LabReport />} />
              <Route path="/prescription/list" element={<PrescriptionReport/>} />
              <Route path="/update/profile" element={<ProfileUpdate/>} />
              <Route path="/create/call" element={<PrescriptionFormContent/>} />
            </Route> */}
          </Route>
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<OtpVerify />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Box>
  );
};

export default App;