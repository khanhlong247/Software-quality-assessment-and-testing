
# Hệ thống tính tiền lương giảng viên

Ứng dụng web đơn giản hỗ trợ tính và thống kê tiền lương giảng viên và quản lý hệ thống trường học như: Khoa, Giảng viên, Bằng cấp, Học phần, Học kỳ, Lớp học phần,...

## 🛠️ Công nghệ sử dụng

### Client
- **React** + **Vite**
- **Axios**
- **CSS**
- **React Router**

### Server
- **Express.js** 
- **JWT Authentication**
- **RESTful API**

---

## 📦 Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/khanhlong247/Software-quality-assessment-and-testing.git
cd Software-quality-assessment-and-testing
````

### 2. Cài đặt dependencies cho client và server

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

---

## ▶️ Chạy ứng dụng (cần chạy 2 terminal song song)

### Chạy client (frontend)

```bash
cd client
npm run dev
```

Sau khi chạy, client sẽ chạy ở địa chỉ: `http://localhost:5173`

### Chạy server (backend)

```bash
cd server
npm run start:dev
```

Mặc định backend chạy ở `http://localhost:8080`, có thể truy cập trực tiếp để xem danh sách API thông qua Swagger UI.

---

## 📁 Cấu trúc thư mục (client)

```bash
src/
├── components/
├── features/
│   └── Feature/
│       ├── FeatureXPage.jsx
│       ├── FeatureXForm.jsx
│       └── FeatureXList.jsx
├── services/
├── App.jsx
├── main.jsx
```
## 📁 Cấu trúc thư mục (server)
