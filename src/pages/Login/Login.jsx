import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { errorClean, savePhone, sendOtp } from '../../redux/auth/authSlice';
import './auth.css';
import Loader from '../../components/loader/Loader';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const { isLoading, success, error, errorMessage } = useSelector((state) => state.user);
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (input.length <= 11) {
      setPhone(input);
    }
  };
  const handleLogin = async () => {
    if (phone.length === 11) {
      dispatch(savePhone(phone));
      dispatch(sendOtp(phone));
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(errorClean());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (success) {
      navigate('/verify-otp');
    }
  }, [navigate, success, dispatch, error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Loader open={isLoading} />
      <div className="w-full max-w-md">
        <div className="mb-16">
          <img src={logo} alt="Doctor Logo" className="w-24 h-10" />
        </div>
        <div className="mb-6">
          <h2
            className="text-start border-b-2 inline-block pb-2 mb-4 login-text"
            style={{ borderColor: '#0052A8' }}
          >
            Login
          </h2>
          <h3 className="text-start font-semibold mb-2 premium-text">
            Premium Telemedicine Platform
          </h3>
          <p className="text-start mb-8 videconsultation-text">
            Video consultation 24 x 7
          </p>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4 text-start">
            Talk to a doctor, therapist or medical expert anywhere you are by phone or video.
          </p>
          <div className="mb-6">
            <input
              type="text"
              placeholder="017 x xxxxxxxx"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-3 py-3 border border-[#E0E0E0] rounded-lg text-[#34495E] placeholder-[#A0A0A0] bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading || phone.length !== 11}
            className={`w-full py-3 rounded font-medium flex items-center justify-center bg-[#0052A8] text-white transition-all duration-200
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#003f7f] active:bg-[#002a5f] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}
            `}
          >
            {isLoading ? 'Loading...' : 'Login Now'}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-start">
              {errorMessage}
            </p>
          )}
        </div>
        <div className='mt-12'>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="text-start">
            <p className="text-sm">
              <span className="text-blue-600">Learn more</span>
              <span className="text-gray-500"> about MyDoc</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;