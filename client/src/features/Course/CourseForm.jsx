import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../../services/courseService";

export default function CourseForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    name: "",
    credit: "",
    coefficient: "",
    total_hour: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      credit: Number(form.credit),
      coefficient: Number(form.coefficient),
      total_hour: Number(form.total_hour),
    };

    try {
      if (selected) {
        await updateCourse(selected.id, payload);
      } else {
        await createCourse(payload);
      }

      setForm({ name: "", credit: "", coefficient: "", total_hour: "" });
      setSelected(null);
      window.location.reload();
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Bạn không có quyền thực hiện thao tác này.");
      } else {
        console.error("Lỗi:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tên học phần"
      />
      <input
        name="credit"
        value={form.credit}
        onChange={handleChange}
        placeholder="Số tín chỉ"
      />
      <input
        name="coefficient"
        value={form.coefficient}
        onChange={handleChange}
        placeholder="Hệ số tín chỉ"
      />
      <input
        name="total_hour"
        value={form.total_hour}
        onChange={handleChange}
        placeholder="Tổng số giờ"
      />
      <button type="submit">{selected ? "Cập nhật" : "Thêm mới"}</button>
    </form>
  );
}
