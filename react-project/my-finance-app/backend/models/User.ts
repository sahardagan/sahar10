import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// הגדרת הסוג של הדוקומנט
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// הגדרת הסכימה
const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// הוספת middleware לפני שמירה כדי להצפין את הסיסמה
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

// יצירת המודל
const User = mongoose.model<IUser>("User", userSchema);

export default User;
