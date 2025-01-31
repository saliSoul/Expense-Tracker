import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // Ensure cookies contain the JWT
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Attach the user to the request
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized - Token Expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default protectRoute;
