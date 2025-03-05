import { useEffect, useRef, useState } from "react";
import logo from '../../assets/logo.png';
import '../Login/auth.css';

const OtpVerify = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(59);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const handleChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== "" && index < 3) {
                inputRefs[index + 1].current.focus();
            }
        }
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
        setIsInputDisabled(true);
        console.log("OTP submitted:", otp.join(""));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
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

                {/* OTP Input */}
                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-4 text-start">
                        Please enter the OTP sent to{" "}
                        <span className="text-[#0052A8]">+8801710575743</span>
                    </p>

                    <div className="flex justify-between mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                className="w-16 h-12 border border-gray-300 rounded text-center text-lg focus:border-blue-300 focus:outline-none text-gray-900"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isInputDisabled}
                            />
                        ))}
                    </div>
                    <button
                        className="w-full bg-[#0052A8] text-white py-3 rounded font-medium"
                        onClick={handleVerify}
                        disabled={isInputDisabled}
                    >
                        Verify
                    </button>
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