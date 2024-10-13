# SmartNodeIoT

**SmartNodeIoT** là một nền tảng web miễn phí, thân thiện với người dùng, cho phép điều khiển các thiết bị IoT từ xa. Với giao tiếp WebSocket theo thời gian thực, SmartNodeIoT giúp việc theo dõi và quản lý các thiết bị thông minh trở nên dễ dàng và nhanh chóng. Nền tảng này cung cấp giao diện đáp ứng và kết nối an toàn cho nhiều thiết bị.

## Tính năng

- Điều khiển thiết bị IoT từ xa theo thời gian thực.
- Hỗ trợ nhiều người dùng và thiết bị cùng lúc.
- Giao diện thân thiện, dễ sử dụng.
- Kết nối an toàn và bảo mật

## Công nghệ sử dụng
- Frontend: Vue.js
- Backend: Node.js, WebSocket
- Cơ sở dữ liệu: MongoDB
  
## Yêu cầu hệ thống
Node.js (>= 14.x)

## Cài đặt và chạy dự án

### 1. Clone repository từ GitHub
   ```bash
   git clone https://github.com/tranngoclamm/SmartNodeIoT.git

   cd SmartNodeIoT
   ```
### 2. Cài đặt các phụ thuộc
   #### Backend
   ```bash
   cd backend
   npm install
   ```
   #### Frontend
   ```bash
   cd ../frontend
   npm install
   ```
   
  #### Concurrently (chạy backend & frontend đồng thời)
   ```bash
    cd ..
    npm install
   ```

### 3. Chạy ứng dụng
  #### Backend
 Chạy backend server ở cổng 3000:
   ```bash
    cd backend
    npm run dev
   ```

  #### Frontend
Chạy frontend server ở cổng 8080:
   ```bash
    cd frontend
    npm run serve
   ```

  #### Chạy đồng thời backend & frontend (tại thư mục gốc)
   ```bash
    npm run dev
   ```
### 4. Truy cập ứng dụng
Mở trình duyệt và truy cập ứng dụng tại địa chỉ:
http://localhost:8080




