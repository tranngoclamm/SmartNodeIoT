import axios from 'axios';

const API_URL = 'http://172.20.10.13:8000/api'; // Đường dẫn API backend của bạn

// Hàm đăng ký người dùng
// export const registerUser = (userData) => {
//   return axios.post(`${API_URL}/auth/register`, userData);
// };

// Hàm đăng ký người dùng
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData, {
    headers: {
      'Content-Type': 'application/json',
  }}
  )
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
};


// // Hàm đăng nhập người dùng
// export const loginUser = (data) => {
//   return axios.post(`${API_URL}/auth/login`, data, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// Hàm thêm project
export const createProject = (formData, token) => {
  return axios.post(`http://172.20.10.13:8000/api/projects`, formData, {
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

// Hàm lấy lịch sử project
export const getProjectHistories = (query) => {
  return axios.get(`${API_URL}/projects/histories`, {
    params: { projectId: query.projectId, date: query.date, historyType: query.historyType}
  });
};