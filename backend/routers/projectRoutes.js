const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const projectMiddleware = require('../middlewares/projectAuthMiddleware')

const router = express.Router();
// Tạo mới một project được sử dụng ở fe
router.post('/projects', authMiddleware, projectController.createProject);

// Chỉnh sửa project
router.put('/:projectId', authMiddleware, projectController.editProject);

// Xóa project
router.delete('/:projectId', authMiddleware, projectController.deleteProject);

// Lấy thông tin project theo projectID 
router.get('/:projectId', authMiddleware, projectController.getProjectById);

// Route: Lấy tất cả các project mà người dùng đã tạo hoặc là thành viên
router.get('/projects/list', authMiddleware, projectController.getUserProjects);

// Thêm thành viên vào project
router.post('/add-member', authMiddleware, projectController.addMember);

// Xóa một thành viên khỏi project
router.post('/remove-member', authMiddleware, projectController.removeMember);

// Cập nhật vai trò của một thành viên
router.put('/update-role', authMiddleware, projectController.updateRole);

// Thêm datastream
router.post('/datastreams/add', authMiddleware, projectController.addDatastream);

// Lấy tất cả datastreams của một project
router.get('/datastreams/:projectId', authMiddleware, projectController.getDatastreamsByProjectId);

// Xóa datastream
router.post('/datastreams/delete', authMiddleware, projectController.deleteDatastream);

// Lấy datastreams của một project cho thành viên bị trùng lặp chưa sửa 
router.get('/datastreams/member/:projectId', projectController.getDatastreamsForMember);




// Route xử lý dữ liệu từ ESP32
router.post('/datastreams/esp32', projectMiddleware, projectController.handleEsp32Data);
// Route lấy trạng thái device
router.get('/datastreams/device-statuses', projectController.getDeviceStatuses);
// Cập nhật trạng thái thiết bị
router.post('/datastreams/device/update', projectController.updateDeviceState);

module.exports = router;
