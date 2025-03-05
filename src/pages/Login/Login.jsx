import { useState } from 'react';
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { savePhone } from '../../redux/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (input.length <= 11) {
      setPhone(input);
    }
  };
  const handleLogin = () => {
    if (phone.length === 11) {
      dispatch(savePhone(phone));
      navigate('/otp');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-16">
          <img
            src={logo}
            alt="Doctor Logo"
            className="w-24 h-10"
          />
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
            disabled={phone.length !== 11}
            className={`w-full py-3 rounded font-medium flex items-center justify-center ${phone.length === 11
              ? 'bg-[#0052A8] text-white'
              : 'bg-gray-300 text-gray-500'
              }`}
          >
            Login Now
          </button>
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