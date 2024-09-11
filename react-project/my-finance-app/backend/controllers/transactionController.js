const Transaction = require('../models/Transaction'); // ייבוא המודל

// פונקציה ליצירת תנועה חדשה
exports.createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body); // יצירת תנועה חדשה מהגוף של הבקשה
    await transaction.save(); // שמירה למסד הנתונים
    res.status(201).json(transaction); // החזרת התגובה עם הסטטוס 201 ונתוני התנועה
  } catch (error) {
    res.status(400).json({ message: error.message }); // טיפול בשגיאות
  }
};

// פונקציה לקבלת כל התנועות
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find(); // חיפוש כל התנועות במסד הנתונים
    res.status(200).json(transactions); // החזרת התגובה עם הסטטוס 200 ונתוני התנועות
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאות
  }
};

// פונקציה לעדכון תנועה קיימת
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }); // עדכון התנועה
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' }); // טיפול במקרה שהתנועה לא נמצאה
    res.status(200).json(transaction); // החזרת התגובה עם הסטטוס 200 ונתוני התנועה המעודכנת
  } catch (error) {
    res.status(400).json({ message: error.message }); // טיפול בשגיאות
  }
};

// פונקציה למחיקת תנועה
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id); // מחיקת התנועה
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' }); // טיפול במקרה שהתנועה לא נמצאה
    res.status(200).json({ message: 'Transaction deleted' }); // החזרת התגובה עם הסטטוס 200 וודאות שהתנועה נמחקה
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאות
  }
};
