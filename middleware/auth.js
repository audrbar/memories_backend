import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'test';

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No token provided' });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Malformed authorization header' });

        let decodedData;
        try {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id || decodedData?._id;
            return next();
        } catch (verifyErr) {
            // If verification fails, try decode as fallback for external providers (read-only)
            decodedData = jwt.decode(token);
            if (decodedData && decodedData.sub) {
                req.userId = decodedData.sub;
                return next();
            }
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

export default auth;