import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

class AuthService {
  async generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  async registerUser(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const user = await userRepository.create({ name, email, password });

    const token = await this.generateToken(user);

    return { token, user };
  }

  async loginUser({ email, password }) {
    if (!email || !password) throw new Error('Email and password required');

    const user = await userRepository.findByEmailAndValidatePassword(email, password);

    if (!user) throw new Error('Invalid credentials');

    const token = await this.generateToken(user);

    return { token, user };
  }
}

export default new AuthService();