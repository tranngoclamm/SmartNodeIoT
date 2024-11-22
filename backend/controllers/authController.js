// # Xử lý các API liên quan đến xác thực (login, register)

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
  async register(req, res) {
    try {
      const { email, password, fullName, role } = req.body;
  
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Mã hóa mật khẩu trước khi lưu
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Nếu email chưa tồn tại, tạo người dùng mới
      const userId = await User.createUser({
        email,
        fullName,
        role,
        password: hashedPassword // Lưu mật khẩu đã mã hóa
      });
  
      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.getUserByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.userId, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });
      const { password: _, ...userWithoutPassword } = user;
      res.json({ message: 'Login successful', token, user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  },

  // API tìm kiếm người dùng
  async findUser(req, res) {
    try {
      const { query } = req.body;

      if (!query || query.length < 3) { // Kiểm tra query hợp lệ
        return res.status(400).json({ message: 'Query must be at least 3 characters long' });
      }

      const users = await User.findUserByEmailOrUsername(query);

      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to find user', error: error.message });
    }
  }
};

module.exports = authController;
