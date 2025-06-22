import { useEffect, useState } from "react";
import { createTeacher, updateTeacher } from "../../services/teacherService";
import { getAllUsers } from "../../services/userService";
import { getAllFaculties } from "../../services/facultyService";
import { getAllDegrees } from "../../services/degreeService";

export default function TeacherForm({ onClose, reload, editData = null }) {
  const [form, setForm] = useState({
    user_id: "",
    faculty_id: "",
    degree_id: "",
  });

  const [users, setUsers] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degrees, setDegrees] = useState([]);

  const isEditMode = !!editData;

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data.responseObject));
    getAllFaculties().then((res) => setFaculties(res.data.responseObject));
    getAllDegrees().then((res) => setDegrees(res.data.responseObject));
  }, []);

  // Điền dữ liệu khi ở chế độ sửa
  useEffect(() => {
    if (editData) {
      setForm({
        user_id: editData.user_id || "",
        faculty_id: editData.faculty_id || "",
        degree_id: editData.degree_id || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateTeacher(editData.id, form);
      } else {
        await createTeacher(form);
      }
      reload();
      onClose();
    } catch (err) {
      console.error(`Lỗi ${isEditMode ? "cập nhật" : "tạo"} giảng viên:`, err);
      alert(`Lỗi khi ${isEditMode ? "cập nhật" : "tạo"} giảng viên`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{isEditMode ? "Sửa giảng viên" : "Thêm giảng viên mới"}</h2>

      <div>
        <label>Người dùng:</label>
        <select
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn người dùng --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.full_name || u.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Khoa:</label>
        <select
          name="faculty_id"
          value={form.faculty_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn khoa --</option>
          {faculties.map((f) => (
            <option key={f.id} value={f.id}>
              {f.full_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Bằng cấp:</label>
        <select
          name="degree_id"
          value={form.degree_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn bằng cấp --</option>
          {degrees.map((d) => (
            <option key={d.id} value={d.id}>
              {d.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex">
        <button type="submit">{isEditMode ? "Cập nhật" : "Lưu"}</button>
        <button type="button" onClick={onClose} className="bg-gray-400">
          Hủy
        </button>
      </div>
    </form>
  );
}
