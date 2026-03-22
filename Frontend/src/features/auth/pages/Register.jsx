import React,{useState}from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { loading, handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        await handleRegister({ username, email, password });
        navigate('/home');
    }

    if (loading) {
        return (<main>
            <h1>Loading...</h1>
        </main>)
    }
    
    return (

        <main>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        onChange={(e) => setUsername(e.target.value)}

                        type="text" id="username" name="username" placeholder="Enter username" required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" id="email" name="email" placeholder="Enter email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" id="password" name="password" placeholder="Enter password" required />
                </div>
                <button className="button primary-button">Register</button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </main>
    )
}

export default Register;
