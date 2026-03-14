import React from "react";
import "../auth.form.scss";  
import { Link } from "react-router-dom";   
import { useAuth } from "../hooks/useAuth";                  
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {

    const {loading, handleLogin} = useAuth();
    const navigate=useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        await handleLogin({ email, password });
        navigate('/');
    }

    if (loading) {
        return (<main>
            <h1>Loading...</h1>
        </main> )   
    }

  return (
    <main>
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
            </div>
            <button className="button primary-button">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>


    </main>
    )
}

export default Login;