import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Đường dẫn API backend của bạn

// Hàm đăng ký người dùng
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

// Hàm đăng nhập người dùng
export const loginUser = (data) => {
  return axios.post(`${API_URL}/auth/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Hàm thêm project
export const createProject = (formData, token) => {
  return axios.post(`http://192.168.31.100:8000/api/projects`, formData, {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/json',
  });
};

// Hàm thêm datastream
export const createDatastream = (projectId, formData, token) => {
  return axios.post(`${API_URL}/projects/${projectId}/datastreams`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Hàm cập nhật datastream
export const updateDatastream = (projectId, datastreamId, formData, token) => {
  return axios.put(`${API_URL}/projects/${projectId}/datastreams/${datastreamId}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Hàm xóa datastream
export const deleteDatastream = (projectId, datastreamId, token) => {
  return axios.delete(`${API_URL}/projects/${projectId}/datastreams/${datastreamId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
