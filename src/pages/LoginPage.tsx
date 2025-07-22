import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data);
            navigate("/lobby");
        } catch (err: any) {
            setError("Login failed: " + err.response?.data?.message || err.message);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                username,
                password,
            });

            localStorage.setItem("token", response.data);
            navigate("/lobby");
        } catch (err: any) {
            setError("Register failed: " + err.response?.data?.message || err.message);
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
