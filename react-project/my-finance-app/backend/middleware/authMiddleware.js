const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // השתמש במפתח סודי חזק וייחודי

// פונקציית Middleware לאימות טוקן JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};


module.exports = authenticateToken;
