import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <nav style={{
                width: "200px",
                background: "#333",
                color: "#fff",
                padding: "1rem"
            }}>
                <h3>MAHJONG</h3>
                <p>User: {user?.username}</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><button onClick={() => navigate("/lobby")}>Lobby</button></li>
                    <li><button onClick={() => navigate("/profile")}>Profile</button></li>
                    {/* Add more navigation links */}
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>

            {/* Main content */}
            <main style={{ flex: 1, padding: "1rem" }}>
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
