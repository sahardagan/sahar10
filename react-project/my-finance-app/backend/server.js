const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // הוסף את הקו הזה
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // הוסף את ה-middleware של CORS

mongoose.connect('mongodb://localhost:27017/myfinanceapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // בדיקת קיום משתמש עם האימייל הזה
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    // יצירת משתמש חדש
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10), // הצפנת הסיסמה
    });

    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    // For simplicity, not generating a JWT in this example
    res.status(200).send('Login successful.');
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
