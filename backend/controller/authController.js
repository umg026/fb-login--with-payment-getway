import bcrypt from 'bcryptjs';
import { genrateToken } from '../service/jwt.js';
import MySql from '../config/db.js';
import { STATUS } from '../constants/statusCode.js';
import axios from 'axios';


const handelUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(STATUS.NOT_FOUND).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(STATUS.NOT_FOUND).json({ message: 'passowrd must be 6 letter!' })
        }
        const [user] = await MySql.query(`SELECT * FROM users WHERE email = ?`, [email])
        console.log("user", user, "body", req.body);

        if (user.length > 0) return res.status(STATUS.NOT_FOUND).json({ message: 'Email already exists!' })

        const hashedPassword = await bcrypt.hash(password, 10);
        await MySql.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        return res.status(STATUS.CREATED).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(STATUS.SERVER_ERROR).json({ msg: "Internal server error" });
    }
}

const handelUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await MySql.query("SELECT * FROM users WHERE email = ?", [email]);

        if (!user.length) return res.status(STATUS.NOT_FOUND).json({ error: "Invalid credentials" });

        const isPasswordMatch = await bcrypt.compare(password, user[0].password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = genrateToken(user._id, res);

        return res.json({ ok: true, msg: "Login Success", token, user: user[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelFaceBookLogin = async (req, res) => {
    try {
        const { userID, accessToken } = req.body;

        // Fetch user data from Facebook Graph API
        const fbResponse = await axios.get(`https://graph.facebook.com/v19.0/${userID}`, {
            params: {
                fields: "id,name,email,picture",
                access_token: accessToken
            }
        });

        const fbData = fbResponse.data;
        if (!fbData || fbData.error) {
            return res.status(404).json({ error: "Invalid Facebook credentials" });
        }

        let userEmail = fbData.email || `${fbData.id}@facebook.com`;

        // console.log("Facebook Response:", fbData, "Generated Email:", userEmail);

        const [user] = await MySql.query("SELECT * FROM users WHERE email = ?", [userEmail]);

        let dbUser;
        if (user.length > 0) {
            dbUser = user[0];
        } else {
            await MySql.query(
                "INSERT INTO users (name, email, facebook_id, profile_pic) VALUES (?, ?, ?, ?)",
                [fbData.name, userEmail, fbData.id, fbData.picture?.data?.url || ""]
            );

            const [newUser] = await MySql.query("SELECT * FROM users WHERE email = ?", [userEmail]);
            dbUser = newUser[0];
        }

        const token = genrateToken(dbUser);
        return res.status(200).json({ success: true, msg: "Facebook login successful!", token, user: dbUser });

    } catch (error) {
        console.error("Facebook Login Error:", error.message);
        return res.status(500).json({ error: "Server error" });
    }
};

export { handelUserLogin, handelUserSignup, handelFaceBookLogin };
