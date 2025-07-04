const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🔴 Log the decoded token to make sure it contains role
        console.log("Decoded JWT payload:", decoded);

        req.user = decoded.user; // ✅ THIS is the key line
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;

