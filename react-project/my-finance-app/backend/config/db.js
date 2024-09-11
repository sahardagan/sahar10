const mongoose = require('mongoose');
require('dotenv').config(); // טעינת משתני סביבה מקובץ .env

// פונקציה לחיבור למסד הנתונים
const connectDB = async () => {
  try {
    const dbURI = process.env.DB_URI; // שימוש במשתנה הסביבה
    await mongoose.connect(dbURI);
    console.log('MongoDB connected'); // הודעת הצלחה
  } catch (error) {
    console.error('MongoDB connection error:', error.message); // טיפול בשגיאות חיבור
    process.exit(1); // סיום התהליך במקרה של שגיאה
  }
};

module.exports = connectDB; // ייצוא הפונקציה לשימוש בקבצים אחרים
