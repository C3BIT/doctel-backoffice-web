import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import '../Login/auth.css';
import { errorClean, createPatientLogin } from "../../redux/auth/authSlice";
import Loader from "../../components/loader/Loader";

const OtpVerify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(59);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isOtpIncomplete, setIsOtpIncomplete] = useState(false);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const phone = localStorage.getItem("phone");
    const { isAuthenticated, isLoading, error, errorMessage } = useSelector((state) => state.user);
    const handleChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== "" && index < 3) {
                inputRefs[index + 1].current.focus();
            }
        }
        setIsOtpIncomplete(false);
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);
        if (timer === 0) {
            setIsInputDisabled(true);
        }

        return () => clearInterval(interval);
    }, [timer]);
    const handleVerify = () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 4) {
            setIsOtpIncomplete(true);
            return;
        }
        const data = { phone, otp: otpCode };
        dispatch(createPatientLogin(data));
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(errorClean());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
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
                        OTP
                    </h2>
                    <h3 className="text-start font-semibold mb-2 premium-text">
                        Premium Telemedicine Platform
                    </h3>
                    <p className="text-start mb-8 videconsultation-text">
                        Video consultation 24 x 7
                    </p>
                </div>
                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-4 text-start">
                        Please enter the OTP sent to{" "}
                        <span className="text-[#0052A8]">+{phone}</span>
                    </p>
                    <div className="flex justify-between mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                className={`w-16 h-12 border rounded text-center text-lg focus:outline-none text-gray-900 
                                    ${error || isOtpIncomplete ? "border-red-500" : "border-gray-300 focus:border-blue-300"}
                                `}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isInputDisabled || isLoading}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleVerify}
                        disabled={isInputDisabled || isLoading}
                        className={`w-full py-3 rounded font-medium flex items-center justify-center bg-[#0052A8] text-white transition-all duration-200
                            ${isInputDisabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#003f7f] active:bg-[#002a5f] '}
                        `}
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </button>
                </div>
                <div className="h-6 mb-2">
                    {error && (
                        <p className="text-red-500 text-sm text-start">
                            {errorMessage}
                        </p>
                    )}
                    {isOtpIncomplete && ( // Show error message if OTP is incomplete
                        <p className="text-red-500 text-sm text-start">
                            Please enter all 4 digits of the OTP.
                        </p>
                    )}
                </div>
                <div className="text-center text-sm text-gray-500">
                    Did not receive OTP?{" "}
                    <span className="text-blue-600 font-medium">Retry</span> in {timer}{" "}
                    sec
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
export default OtpVerify;