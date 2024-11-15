// Xử lý các API liên quan đến dự án và datastream
const Project = require('../models/projectModel');
const db = require('../config/firebaseConfig');


async function createProject(req, res) {
  const { projectName, description } = req.body;
  const createdBy = req.user.userId; // Lấy ID người tạo từ JWT

  try {
    // Tạo project và nhận thông tin trả về từ model
    const project = await Project.createProject({ projectName, description, createdBy });

    res.status(201).json({
      message: 'Project created successfully',
      project // Trả về toàn bộ thông tin project
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
}
  
  module.exports = {
    createProject,
  };
  