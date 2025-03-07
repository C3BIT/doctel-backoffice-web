import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './layout/Layout';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import OtpVerify from './pages/auth/OtpVerify';
import Home from './pages/Home/Home';
const App = () => {
  return (
    <Box className="App">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Box>
  );
};
export default App;