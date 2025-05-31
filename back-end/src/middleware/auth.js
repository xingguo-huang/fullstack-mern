import admin from 'firebase-admin';

export const authenticateUser = async (req, res, next) => {
    try {
        const { authtoken } = req.headers;
        
        if (!authtoken) {
            return res.status(401).json({ error: 'No auth token provided' });
        }

        const user = await admin.auth().verifyIdToken(authtoken);
        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ error: 'Invalid auth token' });
    }
}; 