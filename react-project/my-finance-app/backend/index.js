const express = require('express'); // ייבוא מודול Express לצורך יצירת השרת
const app = express(); // יצירת מופע של Express
const port = process.env.PORT || 5000; // קביעת הפורט לשימוש בשרת (פורט 5000 כברירת מחדל אם לא מוגדר בפייל .env)

// הגדרת middleware
app.use(express.json()); // Middleware לקריאת גוף הבקשה כ-json

// חיבור ל-MongoDB
require('dotenv').config(); // טעינת משתני סביבה מקובץ .env
const connectDB = require('./config/db'); // ייבוא פונקציית החיבור למסד נתונים
connectDB(); // קריאה לפונקציה לחיבור למסד הנתונים

// הגדרת הנתיבים
const transactionRoutes = require('./routes/transactionRoutes'); // ייבוא נתיבי ה-API עבור התנועות
app.use('/api', transactionRoutes); // הגדרת הנתיב '/api' כדי להשתמש בנתיבי ה-API שהוגדרו ב-router של התנועות

// התחלת השרת
app.listen(port, () => { // האזנה לפורט שהוגדר והפעלת השרת
  console.log(`Server running on port ${port}`); // הודעת הצלחה שהשרת פועל
});
