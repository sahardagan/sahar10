const mongoose = require('mongoose');

// הגדרת סכימת משתמשים
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// יצירת מודל משתמשים מתוך הסכימה
const User = mongoose.model('User', UserSchema);

module.exports = User;
