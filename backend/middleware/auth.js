import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "No access provided! Please login again"
        });
    }


    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Use req instead of request
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Invalid access"
        });
    }
}

export default authMiddleware;
