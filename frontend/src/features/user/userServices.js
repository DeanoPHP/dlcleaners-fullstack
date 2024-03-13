import axios from 'axios';

// Assuming your proxy is set up to redirect requests to http://localhost:8080
const API_URL = '/api/v1/users';

// register user
const register = async (userData) => {
    // Use the relative URL path which will be resolved by the proxy in your development environment
    const response = await axios.post(API_URL, userData);
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = async (user) => localStorage.removeItem('user')

const userService = {
    register,
    getUsers,
    login,
    logout
};

export default userService;
