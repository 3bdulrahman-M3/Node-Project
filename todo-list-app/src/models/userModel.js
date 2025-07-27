const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: String,
  experienceYears: Number,
  address: String,
  level: String
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

class UserModel {
  static async create({ phone, password, displayName, experienceYears, address, level }) {
    const user = new User({ phone, password, displayName, experienceYears, address, level });
    return user.save();
  }

  static async findByPhone(phone) {
    return User.findOne({ phone });
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserModel;