import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleAuthSuccess = (token: string) => {
        const decoded = jwtDecode(token);
        const usernameFromToken = decoded.sub || decoded.username || "unknown";

        auth.login(token, { username: usernameFromToken });
        navigate("/lobby");
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            handleAuthSuccess(response.data);
        } catch (err: any) {
            setError("Login failed: " + (err.response?.data?.message || err.message));
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                username,
                password,
            });

            handleAuthSuccess(response.data);
        } catch (err: any) {
            setError("Register failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Login / Register</h2>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br/>
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
