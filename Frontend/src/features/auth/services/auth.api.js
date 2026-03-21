import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth`,
    withCredentials: true
});

export async function register({ username, email, password }) {
    try {
        const res = await api.post('/register', {
            username,
            email,
            password
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const res = await api.post('/login', {
            email,
            password
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function logout() {
    try {
        const res = await api.get('/logout');
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getMe() {
    try {
        const res = await api.get('/get-me');
        return res.data;
    } catch (err) {
        if (err.response?.status === 401) {
            return null;
        }
        throw err;
    }
}

