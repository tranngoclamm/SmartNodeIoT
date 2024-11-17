const Project = require('../models/projectModel');

const projectController = {
  // Tạo mới một project
  async createProject(req, res) {
    try {
      const { projectName, description } = req.body;
      const userId = req.user.userId; // Lấy userId từ middleware xác thực

      const project = await Project.createProject({ projectName, description, createdBy: userId });

      res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
  },
    // Chỉnh sửa thông tin dự án
  async editProject(req, res) {
    try {
      const { projectId } = req.params;
      const updates = req.body;
      const userId = req.user.userId;

      const updatedProject = await Project.editProject(projectId, updates, userId);

      res.status(200).json({ message: 'Project updated successfully', updatedProject });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  // Xóa một project
  async deleteProject(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.userId;

      await Project.deleteProject(projectId, userId);
      res.status(200).json({ message: 'Project deleted successfully', projectId });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  // Lấy thông tin một project
  async getProjectById(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.userId;

      const project = await Project.getProjectById(projectId, userId);

      res.status(200).json(project);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  // Lấy danh sách tất cả các projects
  async getAllProjects(req, res) {
    console.log('Controller getAllProjects is called');
    try {
      const userId = req.user.userId;
      console.log(userId)
      const projects = await Project.getAllProjects(userId);

      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve projects', error: error.message });
    }
  },

  // Thêm thành viên vào project
  async addMember(req, res) {
    try {
      const { projectId, memberId, role } = req.body;
      const userId = req.user.userId;

      const members = await Project.addMember(projectId, userId, memberId, role);

      res.status(200).json({ message: 'Member added successfully', members });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  // Xóa một thành viên khỏi project
  async removeMember(req, res) {
    try {
      const { projectId, memberId } = req.body;
      const userId = req.user.userId;

      const members = await Project.removeMember(projectId, userId, memberId);

      res.status(200).json({ message: 'Member removed successfully', members });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  // Cập nhật vai trò của một thành viên
  async updateRole(req, res) {
    try {
      const { projectId, memberId, newRole } = req.body;
      const userId = req.user.userId;

      const updatedMember = await Project.updateRole(projectId, userId, memberId, newRole);

      res.status(200).json({ message: 'Role updated successfully', updatedMember });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },
    // Thêm datastream
  async addDatastream(req, res) {
    try {
      const { projectId, name, type, pin, description } = req.body;
      const userId = req.user.userId;

      const datastream = await Project.addDatastream(projectId, userId, { name, type, pin, description });

      res.status(201).json({ message: 'Datastream added successfully', datastream });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Lấy tất cả datastreams
  async getDatastreamsByProjectId(req, res) {
    try {
      const { projectId } = req.params;
      const userId = req.user.userId;

      const datastreams = await Project.getDatastreamsByProjectId(projectId, userId);

      res.status(200).json(datastreams);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  // Xóa datastream
  async deleteDatastream(req, res) {
    try {
      const { projectId, datastreamId } = req.body;
      const userId = req.user.userId;

      const result = await Project.deleteDatastream(projectId, userId, datastreamId);

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }, 
    // Lấy datastreams của một project cho thành viên
  async getDatastreamsForMember(req, res) {
    try {
      const { projectId } = req.params; // Lấy projectId từ URL
      const userId = req.user.userId;  // Lấy userId từ JWT

      const datastreams = await Project.getDatastreamsForMember(projectId, userId);

      res.status(200).json(datastreams);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },
  // Xử lý dữ liệu từ ESP32
  async handleEsp32Data(req, res) {
    try {
      const { authToken, pin, value } = req.body;

      const result = await Project.handleEsp32Data(authToken, pin, value);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

    // Lấy trạng thái của các datastream là device
  async getDeviceStatuses(req, res) {
    try {
      const { authToken } = req.query; // Arduino gửi authToken qua query

      const devices = await Project.getDeviceStatuses(authToken);

      res.status(200).json(devices);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

    // Cập nhật trạng thái thiết bị
  async updateDeviceState(req, res) {
    try {
      const { authToken, pin, value } = req.body;

      const result = await Project.updateDeviceState(authToken, pin, value);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = projectController;
