import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../context/AxiosInstance";

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post("/login", loginForm);
            const { access_token, user } = response.data;

            if (access_token && user) {
                localStorage.setItem("token", access_token);
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/dashboard";
            } else {
                setError("Login failed: Invalid response from server.");
            }
        } catch (err) {
           // console.log(err);
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <div className="Login">
                <form className="Login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    {error && <div className="Form-error">{error}</div>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
        </div>
    )
}