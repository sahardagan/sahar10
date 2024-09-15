const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Transaction = require('./models/Transaction');

// צור מופע של Express
const app = express();

// הגדרת Middleware
app.use(cors());
app.use(bodyParser.json());

// חיבור ל-MongoDB
mongoose.connect('mongodb://localhost:27017/my-finance-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// הגדרת מודל משתמשים
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// מפתח סודי עבור JWT
const secretKey = 'your-secret-key'; // השתמש במפתח סודי חזק וייחודי

// מסלול רישום משתמשים
app.post('/api/users/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // לבדוק אם המשתמש קיים כבר
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // צור משתמש חדש ושמור בבסיס הנתונים
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// מסלול כניסת משתמשים
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    // יצירת טוקן JWT
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Middleware לאימות טוקן JWT
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

// מסלול לקבלת עסקאות של משתמש מסוים
app.get('/api/transactions', authenticateToken, async (req, res) => {
  const userId = req.user.id; // קבלת userId מהטוקן

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// מסלול להוספת עסקה חדשה
app.post('/api/transactions', authenticateToken, async (req, res) => {
  const { type, amount, description } = req.body;
  const userId = req.user.id; // קבלת userId מהטוקן

  try {
    const newTransaction = new Transaction({ userId, type, amount, description });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// הגדרת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
