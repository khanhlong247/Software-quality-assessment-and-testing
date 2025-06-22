import { useState, useEffect } from "react";
import { createDegree, updateDegree } from "../../services/degreeService";

export default function DegreeForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    full_name: "",
    short_name: "",
    salary_grade: "",
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
      full_name: form.full_name,
      short_name: form.short_name,
      salary_grade: Number(form.salary_grade),
    };

    try {
      if (selected) {
        await updateDegree(selected.id, payload);
      } else {
        await createDegree(payload);
      }

      setForm({ full_name: "", short_name: "", salary_grade: "" });
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
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Tên đầy đủ"
      />
      <input
        name="short_name"
        value={form.short_name}
        onChange={handleChange}
        placeholder="Tên viết tắt"
      />
      <input
        name="salary_grade"
        value={form.salary_grade}
        onChange={handleChange}
        placeholder="Bậc lương"
      />
      <button type="submit">{selected ? "Cập nhật" : "Thêm mới"}</button>
    </form>
  );
}
