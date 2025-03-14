import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import PropTypes from "prop-types";
import { persistor } from "../redux/store";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const reconnectInterval = useRef(null);
    const URL = import.meta.env.VITE_SOCKET_URL;


    const handleTokenExpiration = async () => {
        console.log("⏳ Token expired, logging out and purging persisted data...");
        
        if (socket) {
            socket.disconnect();
        }    
        setSocket(null);
        setIsConnected(false);
        clearInterval(reconnectInterval.current);
        dispatch(logout());
        
        await persistor.purge();
        window.location.reload();
    };

    const connectWebSocket = () => {
        if (!token) {
            console.log("⚠️ No token available, skipping WebSocket connection.");
            return;
        }

        if (socket) {
            socket.disconnect();
            clearInterval(reconnectInterval.current);
        }

        const newSocket = io(URL, {
            transports: ["websocket"],
            query: { token },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
        });

        newSocket.on("connect", () => {
            console.log("✅ WebSocket Connected:", newSocket.id);
            setIsConnected(true);
            clearInterval(reconnectInterval.current);
        });

        // newSocket.on("connect_error", (error) => {
        //     console.error("🔴 Connection Error:", error.message);
        //     if (error.message.includes("auth")) {
        //         handleTokenExpiration();
        //     }
        // });

        newSocket.on("disconnect", (reason) => {
            console.log("❌ WebSocket Disconnected:", reason);
            setIsConnected(false);
            attemptReconnect();
        });

        newSocket.on("error", (error) => {
            if (error.toString().toLowerCase().includes("auth") ||
                error.toString().toLowerCase().includes("token")) {
                handleTokenExpiration();
            }
        });

        newSocket.on("token_expired", () => {
            handleTokenExpiration();
        });

        newSocket.on("call:request", (data) => {
            console.log("📞 Incoming call from patient:", data);
            setIncomingCall(data);
        });

        newSocket.on("call:accept", (data) => {
            console.log("✅ Call accepted:", data);
        });

        newSocket.on("call:reject", (data) => {
            console.log("❌ Call rejected:", data);
            setIncomingCall(null);
        });

        newSocket.on("call:reassigned", (data) => {
            console.log("🔄 Call reassigned:", data);
            setIncomingCall(null);
        });

        setSocket(newSocket);
    };

    const attemptReconnect = () => {
        if (!isConnected && token) {
            reconnectInterval.current = setInterval(() => {
                console.log("♻️ Attempting WebSocket Reconnect...");
                connectWebSocket();
            }, 5000);
        }
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (socket) {
                console.log("🔴 Cleaning up WebSocket...");
                socket.disconnect();
                clearInterval(reconnectInterval.current);
            }
        };
    }, [token]);

    return (
        <WebSocketContext.Provider value={{ socket, isConnected, incomingCall, setIncomingCall }}>
            {children}
        </WebSocketContext.Provider>
    );
};

WebSocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};