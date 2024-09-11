const express = require('express'); // ייבוא מודול Express לצורך יצירת נתיבי API
const router = express.Router(); // יצירת אובייקט router כדי להגדיר נתיבים עבור API
const Transaction = require('../models/Transaction'); // ייבוא המודל Transaction לשימוש בנתיבים

// הוספת תנועה חדשה
router.post('/transactions', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body); // יצירת אובייקט חדש של Transaction מהגוף של הבקשה
    await newTransaction.save(); // שמירה למסד הנתונים
    res.status(201).json(newTransaction); // החזרת התגובה עם קוד מצב 201 (נוצר) והאובייקט החדש שנשמר
  } catch (error) {
    res.status(400).json({ error: error.message }); // טיפול בשגיאות והחזרת התגובה עם קוד מצב 400 (בקשה רעה) ותיאור השגיאה
  }
});

// קבלת כל התנועות
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find(); // חיפוש וקבלת כל התנועות במסד הנתונים
    res.status(200).json(transactions); // החזרת התגובה עם קוד מצב 200 (סביר) והרשימה של התנועות
  } catch (error) {
    res.status(400).json({ error: error.message }); // טיפול בשגיאות והחזרת התגובה עם קוד מצב 400 ותיאור השגיאה
  }
});

// עריכת תנועה קיימת
router.put('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }); // חיפוש ועריכת התנועה לפי מזהה
    res.status(200).json(transaction); // החזרת התגובה עם קוד מצב 200 והרשימה המעודכנת
  } catch (error) {
    res.status(400).json({ error: error.message }); // טיפול בשגיאות והחזרת התגובה עם קוד מצב 400 ותיאור השגיאה
  }
});

// מחיקת תנועה
router.delete('/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id); // מחיקת התנועה לפי מזהה
    res.status(204).end(); // החזרת התגובה עם קוד מצב 204 (לא תוכן) כדי לציין שהמחיקה הצליחה
  } catch (error) {
    res.status(400).json({ error: error.message }); // טיפול בשגיאות והחזרת התגובה עם קוד מצב 400 ותיאור השגיאה
  }
});

module.exports = router; // ייצוא ה-router לשימוש בקבצים אחרים


// Edit transaction
router.put('/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;