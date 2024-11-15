const bcrypt = require('bcrypt');
const db = require('../config/firebaseConfig');

const User = {
  async createUser(data) {
    const newUserRef = db.ref('users').push();
    await newUserRef.set({
      fullName: data.fullName,
      email: data.email,
      role: data.role || 'user',
      password: data.password, // Đảm bảo bạn đã mã hóa mật khẩu trước khi lưu
      createdAt: new Date().toISOString()
    });
    return newUserRef.key;
  },

  async getUserByEmail(email) {
    const snapshot = await db.ref('users').orderByChild('email').equalTo(email).once('value');
    if (!snapshot.exists()) return null;
    const userId = Object.keys(snapshot.val())[0];
    return { userId, ...snapshot.val()[userId] };
  }
};

module.exports = User;
