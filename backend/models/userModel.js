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
  },

  async findUserByEmailOrUsername(query) {
    const usersSnapshot = await db.ref('users').once('value');
    if (!usersSnapshot.exists()) return [];
  
    const matchedUsers = [];
  
    usersSnapshot.forEach((userSnapshot) => {
      const user = userSnapshot.val();
      // Kiểm tra nếu email hoặc fullName chứa query (không phân biệt chữ hoa/thường)
      if (
        (user.email && user.email.toLowerCase().includes(query.toLowerCase())) ||
        (user.fullName && user.fullName.toLowerCase().includes(query.toLowerCase()))
      ) {
        matchedUsers.push({ 
          userId: userSnapshot.key, 
          email: user.email,
          fullName: user.fullName
        });
      }
    });
  
    return matchedUsers; // Trả về danh sách các user khớp
  }
  
};

module.exports = User;
