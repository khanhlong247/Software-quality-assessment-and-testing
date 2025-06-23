import { useState, useEffect } from "react";
import { createDegree, updateDegree } from "../../services/degreeService";

export default function DegreeForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    full_name: "",
    short_name: "",
    salary_grade: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({ full_name: "", short_name: "", salary_grade: "" });
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
      full_name: form.full_name,
      short_name: form.short_name,
      salary_grade: Number(form.salary_grade),
    };

    try {
      let response;
      if (selected) {
        response = await updateDegree(selected.id, payload);
      } else {
        response = await createDegree(payload);
      }

      const result = response.data;
      if (result.success) {
        setForm({ full_name: "", short_name: "", salary_grade: "" });
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
        setErrors(errorResponse.message || `Có lỗi xảy ra khi ${selected ? "cập nhật" : "tạo"} bằng cấp`);
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
        placeholder="Tên đầy đủ"
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
        name="salary_grade"
        type="number"
        value={form.salary_grade}
        onChange={handleChange}
        placeholder="Bậc lương"
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Đang xử lý..." : (selected ? "Cập nhật" : "Thêm mới")}
      </button>
    </form>
  );
}