import { useEffect, useState } from "react";
import { createFaculty, updateFaculty } from "../../services/facultyService";

export default function FacultyForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    full_name: "",
    short_name: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({ full_name: "", short_name: "", description: "" });
    }
    setErrors(null);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors) setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    try {
      let response;
      if (selected) {
        response = await updateFaculty(selected.id, form);
      } else {
        response = await createFaculty(form);
      }

      const result = response.data;
      if (result.success) {
        setForm({ full_name: "", short_name: "", description: "" });
        setSelected(null);
        window.location.reload();
      } else {
        setErrors(result.message);
      }
    } catch (err) {
      console.error("Lỗi khi gửi:", err);
      
      if (err.response && err.response.data) {
        const errorResponse = err.response.data;
        setErrors(errorResponse.message || `Có lỗi xảy ra khi ${selected ? "cập nhật" : "tạo"} khoa`);
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

      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Tên khoa"
        required
      />
      <input
        name="short_name"
        value={form.short_name}
        onChange={handleChange}
        placeholder="Tên viết tắt"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Mô tả"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Đang xử lý..." : (selected ? "Cập nhật" : "Thêm mới")}
      </button>
    </form>
  );
}