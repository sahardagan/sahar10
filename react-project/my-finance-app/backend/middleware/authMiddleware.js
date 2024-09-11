const jwt = require('jsonwebtoken');

// Middleware לאימות משתמשים באמצעות JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // קבלת הטוקן מהכותרת של הבקשה
  if (!token) return res.status(401).json({ message: 'No token provided' }); // טיפול במקרה שאין טוקן

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // אימות הטוקן
    if (err) return res.status(401).json({ message: 'Invalid token' }); // טיפול במקרה של טוקן לא תקין
    req.user = decoded; // שמירה בפרטי המשתמש שנפלטו מהטוקן
    next(); // מעבר לפונקציה הבאה ב-Middleware
  });
};

module.exports = authMiddleware; // ייצוא ה-Middleware לשימוש בקבצים אחרים
