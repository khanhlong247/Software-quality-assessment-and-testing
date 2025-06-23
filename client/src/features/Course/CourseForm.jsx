import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../../services/courseService";

export default function CourseForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    name: "",
    credit: "",
    coefficient: "",
    total_hour: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({ name: "", credit: "", coefficient: "", total_hour: "" });
    }
    setErrors(null);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors) setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    const payload = {
      name: form.name,
      credit: Number(form.credit),
      coefficient: Number(form.coefficient),
      total_hour: Number(form.total_hour),
    };

    try {
      let response;
      if (selected) {
        response = await updateCourse(selected.id, payload);
      } else {
        response = await createCourse(payload);
      }

      const result = response.data;
      if (result.success) {
        setForm({ name: "", credit: "", coefficient: "", total_hour: "" });
        setSelected(null);
        window.location.reload();
      } else {
        setErrors(result.message);
      }
    } catch (err) {
      console.error("Lỗi:", err);

      if (err.response?.status === 403) {
        setErrors("Bạn không có quyền thực hiện thao tác này.");
      } else if (err.response && err.response.data) {
        const errorResponse = err.response.data;
        setErrors(errorResponse.message || `Có lỗi xảy ra khi ${selected ? "cập nhật" : "tạo"} học phần`);
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
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tên học phần"
        required
      />
      <input
        name="credit"
        type="number"
        value={form.credit}
        onChange={handleChange}
        placeholder="Số tín chỉ"
        required
      />
      <input
        name="coefficient"
        type="number"
        step="0.1"
        value={form.coefficient}
        onChange={handleChange}
        placeholder="Hệ số học phần"
        required
      />
      <input
        name="total_hour"
        type="number"
        value={form.total_hour}
        onChange={handleChange}
        placeholder="Tổng số giờ"
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Đang xử lý..." : (selected ? "Cập nhật" : "Thêm mới")}
      </button>
    </form>
  );
}