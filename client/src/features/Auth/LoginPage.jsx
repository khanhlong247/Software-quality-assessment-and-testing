import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import "./auth.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login(form.email, form.password);
      const { success, message, responseObject } = res.data;

      if (!success) {
        setError(message || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("token", responseObject);
      navigate("/faculties");
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || "Lỗi mạng hoặc máy chủ không phản hồi");
    }
  };

  return (
    <div className="wrap-login">
      <form onSubmit={handleSubmit}>
        <h1>Đăng nhập</h1>

        {error && <div class="error">{error}</div>}
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <Link to="/">Quay lại</Link>
          <button type="submit">Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
