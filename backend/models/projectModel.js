const db = require('../config/firebaseConfig');
const jwt = require('jsonwebtoken');

const VALID_PINS = [
  "GPIO0", "GPIO1", "GPIO2", "GPIO3", "GPIO4", "GPIO5",
  "GPIO12", "GPIO13", "GPIO14", "GPIO15", "GPIO16", "GPIO17",
  "GPIO18", "GPIO19", "GPIO21", "GPIO22", "GPIO23", "GPIO25",
  "GPIO26", "GPIO27", "GPIO32", "GPIO33", "GPIO34", "GPIO35",
  "GPIO36", "GPIO39"
];


const Project = {
  // Tạo mới một project
  async createProject(data) {
    const newProjectRef = db.ref('projects').push();
    const auth_token = jwt.sign({ projectId: newProjectRef.key }, 'your_project_secret_key');

    const projectData = {
      projectName: data.projectName,
      description: data.description,
      createdBy: data.createdBy,
      auth_token, // Thêm auth token
      members: {
        [data.createdBy]: 'admin' // Người tạo là admin
      },
      datastreams: {}, // Khởi tạo datastream rỗng
      createdAt: new Date().toISOString()
    };

    await newProjectRef.set(projectData);
    return { projectId: newProjectRef.key, ...projectData };
  },

  // Chỉnh sửa thông tin dự án
  async editProject(projectId, updates, userId) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');
    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Kiểm tra quyền chỉnh sửa
    if (!(project.members[userId] === 'admin' || project.createdBy === userId)) {
      throw new Error('Permission denied');
    }

    await projectRef.update(updates);
    const updatedSnapshot = await projectRef.once('value');
    return updatedSnapshot.val();
  },

  // Xóa một project
  async deleteProject(projectId, userId) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');
    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Chỉ admin hoặc người tạo mới có quyền xóa
    if (project.createdBy !== userId && project.members[userId] !== 'admin') {
      throw new Error('Permission denied');
    }

    await projectRef.remove();
    return { projectId };
  },

  // Lấy thông tin project
  async getProjectById(projectId, userId) {
    const snapshot = await db.ref(`projects/${projectId}`).once('value');
    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Chỉ thành viên hoặc người tạo mới được truy cập
    if (!project.members[userId] && project.createdBy !== userId) {
      throw new Error('Permission denied');
    }

    return project;
  },

  // Lấy danh sách tất cả các projects
  async getAllProjects(userId) {
    const snapshot = await db.ref('projects').once('value');
    if (!snapshot.exists()) return [];

    const projects = [];
    snapshot.forEach((childSnapshot) => {
      const project = { projectId: childSnapshot.key, ...childSnapshot.val() };

      // Chỉ lấy các project mà người dùng là thành viên hoặc đã tạo
      if (project.members[userId] || project.createdBy === userId) {
        projects.push(project);
      }
    });

    return projects;
  },

  // Thêm thành viên vào project
  async addMember(projectId, userId, memberId, role = 'user') {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');

    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Kiểm tra quyền thêm thành viên
    if (!(project.members[userId] === 'admin' || project.createdBy === userId)) {
      throw new Error('Permission denied');
    }

    const memberRef = db.ref(`projects/${projectId}/members/${memberId}`);
    await memberRef.set(role);

    const updatedSnapshot = await db.ref(`projects/${projectId}/members`).once('value');
    return updatedSnapshot.val();
  },

  // Xóa một thành viên khỏi project
  async removeMember(projectId, userId, memberId) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');

    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Kiểm tra quyền xóa thành viên
    if (!(project.members[userId] === 'admin' || project.createdBy === userId)) {
      throw new Error('Permission denied');
    }

    if (memberId === project.createdBy) {
      throw new Error('Cannot remove project creator');
    }

    const memberRef = db.ref(`projects/${projectId}/members/${memberId}`);
    await memberRef.remove();

    const updatedSnapshot = await db.ref(`projects/${projectId}/members`).once('value');
    return updatedSnapshot.val();
  },

  // Cập nhật vai trò của một thành viên
  async updateRole(projectId, userId, memberId, newRole) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');

    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Kiểm tra quyền cập nhật vai trò
    if (!(project.members[userId] === 'admin' || project.createdBy === userId)) {
      throw new Error('Permission denied');
    }

    const memberRef = db.ref(`projects/${projectId}/members/${memberId}`);
    const memberSnapshot = await memberRef.once('value');

    if (!memberSnapshot.exists()) throw new Error('Member not found');
    if (memberId === project.createdBy) {
      throw new Error('Cannot change role of project creator');
    }

    await memberRef.set(newRole);
    return { memberId, newRole };
  },

  // Thêm mới datastream
  async addDatastream(projectId, userId, datastreamData) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');
    if (!snapshot.exists()) throw new Error('Project not found');
  
    const project = snapshot.val();
  
    // Kiểm tra quyền thêm datastream
    if (!(project.members[userId] === 'admin' || project.createdBy === userId)) {
      throw new Error('Permission denied. Only admins can add datastreams.');
    }
  
    // Kiểm tra pin có hợp lệ không
    if (!VALID_PINS.includes(datastreamData.pin)) {
      throw new Error(`Invalid pin: ${datastreamData.pin}. Allowed pins are: ${VALID_PINS.join(", ")}`);
    }
  
    // Kiểm tra pin có trùng lặp trong project không
    const datastreams = project.datastreams || {};
    for (const [datastreamId, datastream] of Object.entries(datastreams)) {
      if (datastream.pin === datastreamData.pin) {
        throw new Error(`Pin ${datastreamData.pin} is already in use by datastream: ${datastream.name}`);
      }
    }
  
    const newDatastreamRef = db.ref(`projects/${projectId}/datastreams`).push();
    const datastream = {
      ...datastreamData,
      createdAt: new Date().toISOString(),
      lastValue: datastreamData.type === 'sensor' ? null : 'OFF' // Cảm biến bắt đầu với null, thiết bị với trạng thái OFF
    };
  
    await newDatastreamRef.set(datastream);
    return { datastreamId: newDatastreamRef.key, ...datastream };
  },

  // Lấy tất cả datastreams
  async getDatastreamsByProjectId(projectId, userId) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');
    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Kiểm tra quyền xem datastreams
    if (!project.members[userId] && project.createdBy !== userId) {
      throw new Error('Permission denied. Only project members can view datastreams.');
    }

    const datastreamSnapshot = await db.ref(`projects/${projectId}/datastreams`).once('value');
    if (!datastreamSnapshot.exists()) return [];
    const datastreams = [];
    datastreamSnapshot.forEach((childSnapshot) => {
      datastreams.push({ datastreamId: childSnapshot.key, ...childSnapshot.val() });
    });
    return datastreams;
  },

  // Xóa datastream
  async deleteDatastream(projectId, userId, datastreamId) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');
    if (!snapshot.exists()) throw new Error('Project not found');

    const project = snapshot.val();

    // Kiểm tra quyền xóa datastream
    if (!(project.members[userId] === 'admin' || project.createdBy === userId)) {
      throw new Error('Permission denied. Only admins can delete datastreams.');
    }

    const datastreamRef = db.ref(`projects/${projectId}/datastreams/${datastreamId}`);
    await datastreamRef.remove();
    return { message: 'Datastream deleted successfully', datastreamId };
  },

  
  async getDatastreamsForMember(projectId, userId) {
    const projectRef = db.ref(`projects/${projectId}`);
    const snapshot = await projectRef.once('value');
  
    if (!snapshot.exists()) throw new Error('Project not found');
  
    const project = snapshot.val();
  
    // Kiểm tra quyền: chỉ thành viên hoặc người tạo mới được xem datastreams
    if (!project.members[userId] && project.createdBy !== userId) {
      throw new Error('Permission denied. Only members can view datastreams.');
    }
  
    const datastreamSnapshot = await db.ref(`projects/${projectId}/datastreams`).once('value');
    if (!datastreamSnapshot.exists()) return []; // Không có datastream nào
  
    const datastreams = [];
    datastreamSnapshot.forEach((childSnapshot) => {
      datastreams.push({ datastreamId: childSnapshot.key, ...childSnapshot.val() });
    });
  
    return datastreams;
  },


  // Xử lý dữ liệu từ ESP32
  async handleEsp32Data(authToken, pin, value) {
    const projectsSnapshot = await db.ref('projects').once('value');
    if (!projectsSnapshot.exists()) throw new Error('No projects found');

    let matchedProject = null;
    let matchedDatastreamId = null;

    projectsSnapshot.forEach((projectSnapshot) => {
      const project = projectSnapshot.val();
      if (project.auth_token === authToken) {
        matchedProject = { id: projectSnapshot.key, ...project };
      }
    });

    if (!matchedProject) throw new Error('Invalid auth token');

    const datastreams = matchedProject.datastreams || {};
    for (const [datastreamId, datastream] of Object.entries(datastreams)) {
      if (datastream.pin === pin) {
        matchedDatastreamId = datastreamId;
        break;
      }
    }

    if (!matchedDatastreamId) throw new Error(`No datastream found with pin: ${pin}`);

    const datastreamRef = db.ref(`projects/${matchedProject.id}/datastreams/${matchedDatastreamId}`);
    await datastreamRef.update({ lastValue: value });

    return {
      message: 'Data updated successfully',
      projectId: matchedProject.id,
      datastreamId: matchedDatastreamId,
      pin,
      value
    };
  },

  // Cập nhật trạng thái thiết bị
  async updateDeviceState(authToken, pin, value) {
    const projectsSnapshot = await db.ref('projects').once('value');
    if (!projectsSnapshot.exists()) throw new Error('No projects found');

    let matchedProject = null;
    let matchedDatastreamId = null;

    // Tìm project theo authToken
    projectsSnapshot.forEach((projectSnapshot) => {
      const project = projectSnapshot.val();
      if (project.auth_token === authToken) {
        matchedProject = { id: projectSnapshot.key, ...project };
      }
    });

    if (!matchedProject) throw new Error('Invalid auth token');

    // Tìm datastream trong project theo pin
    const datastreams = matchedProject.datastreams || {};
    for (const [datastreamId, datastream] of Object.entries(datastreams)) {
      if (datastream.pin === pin && datastream.type === 'device') {
        matchedDatastreamId = datastreamId;
        break;
      }
    }

    if (!matchedDatastreamId) throw new Error(`No device found with pin: ${pin}`);

    // Cập nhật trạng thái thiết bị
    const datastreamRef = db.ref(`projects/${matchedProject.id}/datastreams/${matchedDatastreamId}`);
    await datastreamRef.update({ lastValue: value });

    return {
      message: 'Device state updated successfully',
      projectId: matchedProject.id,
      datastreamId: matchedDatastreamId,
      pin,
      value
    };
  },

  async getDeviceStatuses(authToken) {
    const projectsSnapshot = await db.ref('projects').once('value');
    if (!projectsSnapshot.exists()) throw new Error('No projects found');
  
    let matchedProject = null;
  
    // Tìm project khớp với authToken
    projectsSnapshot.forEach((projectSnapshot) => {
      const project = projectSnapshot.val();
      if (project.auth_token === authToken) {
        matchedProject = { id: projectSnapshot.key, ...project };
      }
    });
  
    if (!matchedProject) {
      throw new Error('Invalid auth token');
    }
  
    // Lọc ra các datastreams là device
    const datastreams = matchedProject.datastreams || {};
    const devices = [];
    for (const [datastreamId, datastream] of Object.entries(datastreams)) {
      if (datastream.type === 'device') {
        devices.push({
          datastreamId,
          name: datastream.name,
          pin: datastream.pin,
          lastValue: datastream.lastValue // Trạng thái hiện tại
        });
      }
    }
  
    return devices;
  },
};

module.exports = Project;
