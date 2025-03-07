import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-[#375560] ">
           <div className='flex items-center justify-between w-full text-white max-w-5xl xl:max-w-7xl mx-auto py-4 px-4 md:px-0'>
           <div>
                <p>© {currentYear} || All rights reserved by MyDoc</p>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors">
                    <FaFacebook size={18} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                    <FaTwitter size={18} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                    <FaYoutube size={18} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                    <FaLinkedin size={18} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                    <FaWhatsapp size={18} />
                </a>
            </div>
           </div>
        </footer>
    );
};
export default Footer;