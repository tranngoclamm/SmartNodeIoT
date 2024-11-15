const db = require('../config/firebaseConfig');
const jwt = require('jsonwebtoken');

const projectAuthMiddleware = async (req, res, next) => {
  const { auth_token } = req.headers;
  if (!auth_token) return res.status(401).json({ message: 'No auth_token provided' });

  try {
    const decoded = jwt.verify(auth_token, 'your_project_secret_key'); // Xác thực auth_token
    const projectSnapshot = await db.ref(`projects/${decoded.projectId}`).once('value');
    if (!projectSnapshot.exists()) {
      return res.status(404).json({ message: 'Invalid project' });
    }

    req.project = projectSnapshot.val(); // Gắn thông tin project vào req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid auth_token', error: error.message });
  }
};

module.exports = projectAuthMiddleware;
