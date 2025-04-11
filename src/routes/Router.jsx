import { lazy } from 'react';
import AppLayout from '../layout/AppLayout';
import AuthLayout from '../layout/AuthLayout';
import DoctorProfile from '../pages/DoctorProfile/DoctorProfile';
import Profile from '../pages/profile/Profile';
import LabReport from '../pages/LabReport/LabReport';
import ProfileUpdate from '../pages/update/ProfileUpdate';
import PrescriptionFormContent from '../pages/CreatePrescription/PrescriptionFormContent';

const Dashboard = lazy(() => import('../pages/Home/Home'));

const Prescription = lazy(() => import('../pages/PrescriptionReport/PrescriptionReport'));
// const CallHistory = lazy(() => import('./pages/CallHistory'));
// const OnlineChat = lazy(() => import('./pages/OnlineChat'));
// const Withdraw = lazy(() => import('./pages/Withdraw'));
// const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const Login = lazy(() => import('../pages/Login/Login'));
const OtpVerify = lazy(() => import('../pages/auth/OtpVerify'));




const Router  = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/prescription/list',
        element: <Prescription />,
      },
    //   {
    //     path: 'call-history',
    //     element: <ProtectedRoute component={CallHistory} />,
    //   },
    //   {
    //     path: 'online-chat',
    //     element: <ProtectedRoute component={OnlineChat} />,
    //   },
    //   {
    //     path: 'withdraw',
    //     element: <ProtectedRoute component={Withdraw} />,
    //   },
    //   {
    //     path: 'settings',
    //     element: <ProtectedRoute component={Settings} />,
    //   },
      {
        path: 'profile',
        element: <DoctorProfile />,
      },
      {
        path: '/doctor/profile',
        element: <Profile />,
      },
      {
        path: '/lab/report',
        element: <LabReport />,
      },
      {
        path: '/update/profile',
        element: <ProfileUpdate />,
      },
      {
        path: '/create/call',
        element: <PrescriptionFormContent />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'verify-otp',
        element: <OtpVerify />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];


export default Router ;