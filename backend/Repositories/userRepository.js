import User from "../models/User.js";
import BonusTransaction from "../models/BonusTransaction.js";

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async findByEmailAndValidatePassword(email, password) {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return null;

    return user;
  }

  async findById(id) {
    return User.findById(id).select('-password');
  }

  async findUserById(userId) {
    return await User.findById(userId);
  };

  async updateUserById(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  };

  async getUserBonusTransactions(userId) {
    return await BonusTransaction.find({ user: userId })
      .populate("bookingId", "date time section")
      .sort({ date: -1 });
  };
}

export default new UserRepository();
