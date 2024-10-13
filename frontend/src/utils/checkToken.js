import * as jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true; // No token means it's expired

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime; // Check if the token is expired
    } catch (error) {
        console.error("Token decoding error:", error);
        return true; // If there's an error, treat it as expired
    }
};
