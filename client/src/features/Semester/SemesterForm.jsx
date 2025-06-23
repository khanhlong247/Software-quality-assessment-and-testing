import { useState, useEffect } from "react";
import { createSemester, updateSemester } from "../../services/semesterService";

export default function SemesterForm({ selected, setSelected, reload }) {
  const [form, setForm] = useState({
    name: "",
    start_year: "",
    start_date: "",
    end_date: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        start_year: selected.start_year,
        start_date: selected.start_date,
        end_date: selected.end_date,
      });
    } else {
      setForm({ name: "", start_year: "", start_date: "", end_date: "" });
    }
    setErrors([]);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

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
      console.error("Lỗi khi lưu học kỳ:", err);
      if (err.response?.status === 403) {
        setErrors([{ message: "Bạn không có quyền thực hiện thao tác này." }]);
      } else if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors([{ message: err.response.data.message }]);
      } else {
        setErrors([{ message: "Không thể lưu học kỳ. Vui lòng thử lại." }]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-message">{error.message}</p>
          ))}
        </div>
      )}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tên học kỳ"
        required
      />
      <input
        name="start_year"
        type="number"
        value={form.start_year}
        onChange={handleChange}
        placeholder="Năm bắt đầu"
        required
      />
      <input
        name="start_date"
        type="date"
        value={form.start_date}
        onChange={handleChange}
        required
      />
      <input
        name="end_date"
        type="date"
        value={form.end_date}
        onChange={handleChange}
        required
      />
      <button type="submit">{selected ? "Cập nhật" : "Thêm mới"}</button>
    </form>
  );
}