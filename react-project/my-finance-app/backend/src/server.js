const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // ודא שהמודל שלך נמצא במיקום הנכון

const app = express();
app.use(express.json());

// הגדרת CORS
app.use(cors({
  origin: 'http://localhost:5173', // כתובת ה-Origin שלך
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// חיבור לבסיס נתונים
mongoose.connect('mongodb://localhost:27017/my-finance-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// מסלול רישום משתמשים
app.post('/api/users/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // לבדוק אם המשתמש קיים כבר
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // הצפן את הסיסמה
    const hashedPassword = await bcrypt.hash(password, 12);

    // צור משתמש חדש ושמור בבסיס הנתונים
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// הגדרת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
