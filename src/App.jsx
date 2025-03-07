import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './layout/Layout';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import OtpVerify from './pages/auth/OtpVerify';
import Home from './pages/Home/Home';
const App = () => {
<<<<<<< HEAD
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
=======
    return (
        <div className='app'>
            <Router>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify-otp" element={<OtpVerify />} />
                    <Route path="*" element={<Layout><NotFound /></Layout>} />
                </Routes>
            </Router>
        </div>
    );
>>>>>>> ce7037a7e28dd4f0da06e60e08876644fd9eb0b7
};
export default App;