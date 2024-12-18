const Project = require('../models/projectModel');
const db = require('../config/firebaseConfig');

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

    // Lấy tất cả project mà người dùng đã tạo hoặc là thành viên
  async getUserProjects(req, res) {
    try {
      userId = req.user.userId;

      // Lấy danh sách project từ model
      const projects = await Project.getUserProjects(userId);

      if (projects.length === 0) {
        return res.status(404).json({ message: 'No projects found lmao' });
      }

      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve projects', error: err.message });
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
      const { projectId, name, type, pin, description, lastValue, mode, unit, sensorId } = req.body;
      const userId = req.user.userId;

      let datastreamData = { name, type, pin, description, lastValue, mode, unit };

      if (type === 'device') {
        // Chỉ giữ lại những trường cần thiết cho loại device
        
        delete datastreamData.unit; // Loại bỏ unit
        delete datastreamData.mode; // Loại bỏ mode
        delete datastreamData.lowThreshold; // Loại bỏ lowThreshold
        delete datastreamData.highThreshold; // Loại bỏ highThreshold
        if (sensorId) {
          datastreamData.sensorId = sensorId;
        }
      }
      
      // Gọi hàm addDatastream với dữ liệu đã xử lý
      const datastream = await Project.addDatastream(projectId, userId, datastreamData);

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
  async getProjectHistories(req, res) {
    try {
      const { projectId, date, historyType } = req.query;
  
      const projectSnapshot = await db.ref('projects').once('value');
      if (!projectSnapshot.exists()) {
        return res.status(404).json({ message: 'No projects found.' });
      }
      const projects = projectSnapshot.val();
  
      const historySnapshot = await db.ref('sensor_histories').once('value');
      const sensorHistories = historySnapshot.exists() ? historySnapshot.val() : {};
  
      let filteredProjects = projects;
      if (projectId) {
        if (!projects[projectId]) {
          return res.status(404).json({ message: `Project with ID ${projectId} not found.` });
        }
        filteredProjects = { [projectId]: projects[projectId] };
      }
      
      let combinedData = [];
      Object.keys(filteredProjects).forEach((id) => {
        const project = filteredProjects[id];
        const projectHistory = sensorHistories[id] || {}; // lấy lịch sử cảm biến từ sensor_histories
        const datastreams = project.datastreams || {};
  
        let filteredHistory = null;
  
        // Cập nhật cách lấy pin từ sensor_histories và enrich lại lịch sử
        const enrichHistory = (history, type) => {
          if (!history) return null;
  
          const enriched = {};
          for (const pinnumber in history) {
            enriched[pinnumber] = {};
            if (history[pinnumber][type]) {
              const data = history[pinnumber][type];
              enriched[pinnumber][type] = data;
            }
          }
          return enriched;
        };
  
        if (projectHistory) {
          console.log('projectHistory: ',projectHistory)
          if (historyType === 'long_term') {
            filteredHistory = {
              long_term: date
                ? { [date]: enrichHistory(projectHistory, 'long_term') }
                : enrichHistory(projectHistory, 'long_term'),
            };
          } else if (historyType === 'short_term') {
            filteredHistory = {
              short_term: date
                ? { [date]: enrichHistory(projectHistory, 'short_term') }
                : enrichHistory(projectHistory, 'short_term'),
            };
          } else {
            filteredHistory = {
              long_term: enrichHistory(projectHistory, 'long_term'),
              short_term: enrichHistory(projectHistory, 'short_term'),
            };
          }
        }
  
        // Kiểm tra nếu cả long_term và short_term đều rỗng thì không thêm project vào kết quả
        if (filteredHistory && (
          Object.keys(filteredHistory.long_term || {}).length > 0 ||
          Object.keys(filteredHistory.short_term || {}).length > 0
        )) {
          combinedData.push({
            projectId: id,
            projectName: project.projectName,
            description: project.description,
            highThreshold: project.highThreshold,
            datastreams: project.datastreams,
            history: filteredHistory,
          });
        }
      });
  
      if (combinedData.length === 0) {
        return res.status(404).json({ message: 'No project histories found.' });
      }
  
      res.status(200).json({ message: 'Data retrieved successfully', data: combinedData });
    } catch (error) {
      console.error('Error retrieving project histories:', error.message);
      res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
    }
  }
  
  
  
  
  
  
  
  
  
};

module.exports = projectController;
