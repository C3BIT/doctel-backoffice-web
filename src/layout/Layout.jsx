import PropTypes from 'prop-types';
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Layout;
