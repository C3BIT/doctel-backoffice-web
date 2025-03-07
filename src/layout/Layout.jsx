import { Outlet } from 'react-router-dom'; // Import Outlet
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
};
export default Layout;