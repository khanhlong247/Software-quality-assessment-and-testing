import { useEffect, useState } from "react";
import { createFaculty, updateFaculty } from "../../services/facultyService";

export default function FacultyForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    full_name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await updateFaculty(selected.id, form);
      } else {
        await createFaculty(form);
      }
      setForm({ full_name: "", short_name: "", description: "" });
      setSelected(null);
      window.location.reload();
    } catch (err) {
      console.error("Lỗi khi gửi:", err);
    }
  };

return (
  <form onSubmit={handleSubmit} className="form-container">
    <input
      name="full_name"
      value={form.full_name}
      onChange={handleChange}
      placeholder="Tên khoa"
    />
    <input
      name="short_name"
      value={form.short_name}
      onChange={handleChange}
      placeholder="Tên viết tắt"
    />
    <input
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Mô tả"
    />
    <button type="submit">
      {selected ? "Cập nhật" : "Thêm mới"}
    </button>
  </form>
);
}
