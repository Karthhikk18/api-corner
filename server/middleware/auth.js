import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided, authorization denied.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtSecret = process.env.JWT_SECRET || 'api_corner_secret_key';
    const decoded = jwt.verify(token, jwtSecret);
    
    // Attach user ID to request object
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error('JWT validation error:', err.message);
    res.status(401).json({ error: 'Token is invalid or has expired.' });
  }
};

export default authMiddleware;
