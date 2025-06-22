import { useState, useEffect } from "react";
import { createSemester, updateSemester } from "../../services/semesterService";

export default function SemesterForm({ selected, setSelected, reload }) {
  const [form, setForm] = useState({
    name: "",
    start_year: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        start_year: selected.start_year,
        start_date: selected.start_date,
        end_date: selected.end_date,
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      start_year: Number(form.start_year),
      start_date: form.start_date,
      end_date: form.end_date,
    };
    try {
      if (selected) {
        await updateSemester(selected.id, payload);
      } else {
        await createSemester(payload);
      }
      setSelected(null);
      setForm({ name: "", start_year: "", start_date: "", end_date: "" });
      reload();
    } catch (err) {
      alert("Lỗi khi lưu học kỳ");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tên học kỳ"
      />
      <input
        name="start_year"
        type="number"
        value={form.start_year}
        onChange={handleChange}
        placeholder="Năm bắt đầu (VD: 2025)"
      />
      <input
        name="start_date"
        type="date"
        value={form.start_date}
        onChange={handleChange}
      />
      <input
        name="end_date"
        type="date"
        value={form.end_date}
        onChange={handleChange}
      />
      <button type="submit">{selected ? "Cập nhật" : "Thêm mới"}</button>
    </form>
  );
}
