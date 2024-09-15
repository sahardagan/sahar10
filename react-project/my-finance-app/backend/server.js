const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// הגדרת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
