import jwt from "jsonwebtoken";
import { STATUS } from "../constants/statusCode.js";

 export const AuthCheck = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(STATUS.BAD_REQUEST).json({ msg: "Token is missing or invalid!" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ msg: "Token is invalid!" });

        const [user] = await MySql.query("SELECT id, name, email FROM users WHERE id = ?", [decoded.userId]);
        if (!user.length) {
            return res.status(STATUS.BAD_REQUEST).json({ msg: "User not found!" });
        }

        req.user = user[0];
        next();
    }
    catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ message: "Internal server error", error });
        console.log(error);
    }
}