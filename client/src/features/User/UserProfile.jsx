import { useEffect, useState } from "react";
import { getInformation, updateUser } from "../../services/userService";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ full_name: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getInformation()
      .then((res) => {
        const response = res.data;

        if (response.success) {
          const data = response.responseObject;
          setUser(data);
          setForm({
            full_name: data.full_name || "",
            phone: data.phone || "",
          });
          setErrors(null);
        } else {
          console.error("API Error:", response.message);
          setErrors(response.message);
        }
      })
      .catch((err) => {
        console.error("Network/HTTP Error:", err);

        if (err.response && err.response.data) {
          const errorResponse = err.response.data;
          setErrors(errorResponse.message || "Có lỗi xảy ra");
        } else {
          setErrors("Không thể kết nối đến server");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors) setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setErrors(null);

    try {
      const response = await updateUser(user.id, form);
      const result = response.data;

      if (result.success) {
        alert("Cập nhật thành công!");
        setUser({ ...user, ...form });
      } else {
        setErrors(result.message);
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      
      if (err.response && err.response.data) {
        const errorResponse = err.response.data;
        setErrors(errorResponse.message || "Có lỗi xảy ra khi cập nhật");
      } else {
        setErrors("Không thể kết nối đến server");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="profile-loading">Đang tải thông tin...</div>;

  if (errors && !user)
    return (
      <div className="profile-error">
        <h3>Có lỗi xảy ra</h3>
        <p>{errors}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );

  if (!user)
    return (
      <div className="profile-error">Không tìm thấy thông tin người dùng.</div>
    );

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      
      {errors && (
        <div className="error-message">
          {errors}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Email</label>
          <input value={user.email} disabled className="disabled-input" />
        </div>

        <div>
          <label>Họ tên</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Số điện thoại</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={updating}>
          {updating ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}