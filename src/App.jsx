import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
            </Route>
          </Route>
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>

    </div>
  );
};
export default App;
