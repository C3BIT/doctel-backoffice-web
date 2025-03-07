import { Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
const Navbar = () => {
    const [notificationCount] = useState(3);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());

    };
    return (
        <nav className=" bg-[#0052A8]">
            <div className='flex items-center justify-between w-full text-white max-w-5xl xl:max-w-7xl mx-auto py-4 px-4 md:px-0'>
                <div className="flex items-center">
                    <span className="text-xl font-bold">
                        <span className="text-white">D</span>
                        <span className="text-white">octor</span>
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="p-1 rounded-full hover:bg-blue-500 transition-colors">
                            <Bell size={20} />
                        </button>
                        {notificationCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {notificationCount}
                            </div>
                        )}
                    </div>
                    <button className="p-1 rounded-full hover:bg-blue-500 transition-colors" onClick={handleLogout}>
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;