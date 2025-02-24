import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
const Home = React.lazy(() => import('../pages/Home/Home'));
const Login = React.lazy(() => import('../pages/Login/Login'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));
const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  </Suspense>
);
export default AppRoutes;
