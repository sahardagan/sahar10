const mongoose = require('mongoose'); // ייבוא מודול Mongoose לחיבור ולניהול מסדי נתונים של MongoDB

// יצירת סכמת נתונים עבור תנועות כספיות
const transactionSchema = new mongoose.Schema({
  type: {
    type: String, // סוג התנועה (הוצאה או הכנסה)
    enum: ['income', 'expense'], // הרשימה המותרת של סוגים
    required: true // שדה חובה
  },
  amount: {
    type: Number, // סכום התנועה
    required: true // שדה חובה
  },
  description: {
    type: String // תיאור התנועה (אופציונלי)
  }
}, { timestamps: true }); // הוספת תאריכים של יצירה ועדכון אוטומטיים

// יצירת מודל על בסיס הסכימה שנוצרה
const Transaction = mongoose.model('Transaction', transactionSchema);

// ייצוא המודל לשימוש בקבצים אחרים
module.exports = Transaction;
