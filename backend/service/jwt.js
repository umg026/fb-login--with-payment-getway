import jwt from 'jsonwebtoken';

export const genrateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token;
}