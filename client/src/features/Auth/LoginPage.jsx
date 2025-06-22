import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Đăng nhập</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Đăng nhập
      </button>
    </form>
  );
}
