import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/userService";

export default function UserForm({ selected, setSelected, reload }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (selected) {
      setForm({
        full_name: selected.full_name || "",
        email: selected.email || "",
        password: "",
        role: selected.role || "",
        phone: selected.phone || "",
      });
    } else {
      setForm({ full_name: "", email: "", password: "", role: "", phone: "" });
    }
    setErrors(null);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    try {
      if (selected) {
        await updateUser(selected.id, {
          full_name: form.full_name,
          phone: form.phone,
        });
      } else {
        await createUser({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
      }
      reload();
      setForm({ full_name: "", email: "", password: "", role: "", phone: "" });
      setSelected(null);
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
      
      if (err.response && err.response.data) {
        const errorResponse = err.response.data;
        setErrors(errorResponse.message || `Có lỗi xảy ra khi ${selected ? "cập nhật" : "tạo"} người dùng`);
      } else {
        setErrors("Không thể kết nối đến server");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {errors && (
        <div className="error-message">
          {errors}
        </div>
      )}
      <div>
        <label htmlFor="full_name">Họ tên</label>
        <input
          id="full_name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Họ tên"
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Số điện thoại</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
        />
      </div>

      {!selected && (
        <>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div>
            <label htmlFor="role">Vai trò</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="student">Sinh viên</option>
              <option value="teacher">Giảng viên</option>
              <option value="moderator">Quản trị viên</option>
              <option value="admin">Quản trị hệ thống</option>
            </select>
          </div>
        </>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Đang xử lý..." : (selected ? "Cập nhật" : "Tạo mới")}
      </button>
    </form>
  );
}