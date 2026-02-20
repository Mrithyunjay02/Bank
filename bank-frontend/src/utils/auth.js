import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const decodeToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const isTokenExpired = () => {
    const decoded = decodeToken();
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
};
