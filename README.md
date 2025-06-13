# Hướng dẫn cài đặt

## 1. Thiết lập môi trường ảo Python và cài đặt thư viện

- Bước 1: Cài virtualenv

```
pip install virtualenv
```

- Bước 2: Tạo môi trường ảo

```
python -m venv myenv
```

- Bước 3: Kích hoạt môi trường ảo

**Đối với Windows:**

```
myenv\Scripts\activate
```

**Đối với Linux/Ubuntu:**

```
myenv\bin\activate
```

#### Cài đặt thư viện

```
pip install -r requirements.txt
```

## 2. Thiết lập gRPC

```
python3 -m grpc_tools.protoc -I protos --python_out=. --grpc_python_out=. protos/imager.proto
```

## 3. Cài đặt ứng dụng Node.js

- Kiểm tra phiên bản node và npm

```
node -v
npm -v
```

- Khởi tạp Node.js

```
cd client_web
npm init -y
```

- Cài đặt express (framework web), multer (xử lý upload file), và axios (gửi HTTP request):

```
npm install express multer axios
```

## 4. Chạy hệ thống

### 1: Chạy service nhận diện hình ảnh

- Giả sử server nhận diện ảnh giao tiếp fastAPI qua port 8000 và giao tiếp gRPC qua các port 50051, 50052, 50053

```
python server_fastapi.py 8000 50051 50052 50053
```

### 2. Chạy service lưu trữ dữ liệu

- Giả sử service lưu trữ dữ liệu giao tiếp gRPC với server nhận diện ảnh qua các port 50051, 50052, 50053. Mỗi port sẽ chạy trên một command promt khác nhau

```
python saveimage_grpc.py 50051 50051 50052 50053
python saveimage_grpc.py 50052 50051 50052 50053
python saveimage_grpc.py 50053 50051 50052 50053
```

### 3. Chạy ứng dụng Node.js

- Thay API Key vừa tạo của **server_fastapi.py** vào trong file **app.js**

- Sau đó chạy lệnh:

```
cd client_web
node app.js
```

- Truy cập trang web bằng: [localhost:3000](http:/localhost:3000/)

- Chạy chương trình và xem kết quả trên log của **server_fastapi.py** và **saveimage_grpc.py**

### 4. Chạy service cập nhật bệnh mới

```
cd update_service
```

- Chạy server huấn luyện dữ liệu mới:

Gỉả sử server chạy trên port 8001

```
python update_disease.py --port 8001 --api_key <server_fastapi.py API Key>
```

- Chạy service upload dữ liệu mới:

Đưa file .zip chứa ảnh dữ liệu mới vào folder **update_service**

```
python upload_client.py 8001 <update_disease.py API Key>
```

- Sau khi cập nhật bệnh mới xong, thử lại với ứng dụng Node.js
