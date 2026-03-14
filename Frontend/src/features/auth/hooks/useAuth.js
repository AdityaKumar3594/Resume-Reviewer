import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,logout } from "../services/auth.api.js";
export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        } catch (error) {
            console.error("Registration failed:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        }
        catch (error) {
            console.error("Logout failed:", error);
        }

        finally {
            setLoading(false);

        }
    };


    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
    };
};


