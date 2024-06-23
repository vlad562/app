import jwt from 'jsonwebtoken';
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            if (typeof decoded !== 'string') {
                req.userId = decoded._id;
                next();
            }
        }
        catch (error) {
            res.status(403).json({
                message: error,
            });
        }
    }
    else {
        res.status(403).json({
            message: 'нет доступа',
        });
    }
};
