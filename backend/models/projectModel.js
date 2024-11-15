const db = require('../config/firebaseConfig');
const jwt = require('jsonwebtoken');

const Project = {
  async createProject(data) {
    const newProjectRef = db.ref('projects').push();
    const auth_token = jwt.sign({ projectId: newProjectRef.key }, 'your_project_secret_key'); // Tạo auth_token

    const projectData = {
      projectName: data.projectName,
      description: data.description,
      createdBy: data.createdBy,
      auth_token, // Thêm trường auth_token
      members: {
        [data.createdBy]: 'admin' // Người tạo là admin
      },
      createdAt: new Date().toISOString()
    };

    await newProjectRef.set(projectData);
    return { projectId: newProjectRef.key, ...projectData }; // Trả về toàn bộ thông tin project
  }
};

module.exports = Project;
