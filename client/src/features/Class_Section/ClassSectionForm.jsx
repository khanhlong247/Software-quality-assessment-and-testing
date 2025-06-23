import { useState, useEffect } from "react";
import {
  createClassSections,
  updateClassSection,
} from "../../services/classSectionService";
import { getAllCourses } from "../../services/courseService";
import { getAllSemesters } from "../../services/semesterService";
import { getAllTeachers } from "../../services/teacherService";

export default function ClassSectionForm({ selected, setSelected, reload }) {
  const [form, setForm] = useState({
    count: 1,
    name: "",
    total_students: "",
    course_id: "",
    semester_id: "",
    teacher_id: "",
  });
  const [errors, setErrors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllCourses().then((res) => setCourses(res.data.responseObject || []));
    getAllSemesters().then((res) =>
      setSemesters(res.data.responseObject || [])
    );
    getAllTeachers().then((res) => setTeachers(res.data.responseObject || []));
  }, []);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.full_name || "",
        total_students: selected.total_students || "",
        course_id: selected.course_id || "",
        semester_id: selected.semester_id || "",
        teacher_id: selected.teacher_id || "",
        count: 1,
      });
    } else {
      setForm({
        count: "",
        name: "",
        total_students: "",
        course_id: "",
        semester_id: "",
        teacher_id: "",
      });
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

    try {
      if (selected) {
        // UPDATE
        const payload = {
          full_name: String(form.name),
          total_students: parseInt(form.total_students),
          course_id: String(form.course_id),
          semester_id: String(form.semester_id),
          teacher_id: String(form.teacher_id),
        };
        await updateClassSection(Number(selected.id), payload);
      } else {
        // MULTI-CREATE
        const payload = {
          name: form.name,
          total_students: parseInt(form.total_students),
          course_id: String(form.course_id),
          semester_id: String(form.semester_id),
          count: parseInt(form.count),
        };
        await createClassSections(payload);
      }

      setForm({
        count: "",
        name: "",
        total_students: "",
        course_id: "",
        semester_id: "",
        teacher_id: "",
      });
      setSelected(null);
      reload();
    } catch (err) {
      console.error("Đã xảy ra lỗi:", err);
      if (err.response?.status === 403) {
        setErrors([{ message: "Bạn không có quyền thực hiện thao tác này." }]);
      } else if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors([{ message: err.response.data.message }]);
      } else {
        setErrors([{ message: "Không thể thực hiện thao tác. Vui lòng thử lại." }]);
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
      {!selected && (
        <>
          <input
            type="number"
            name="count"
            value={form.count}
            onChange={handleChange}
            placeholder="Số lớp cần tạo"
            required
          />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên lớp học phần"
            required
          />
        </>
      )}

      {selected && (
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên lớp học phần"
          required
        />
      )}

      <input
        type="number"
        name="total_students"
        value={form.total_students}
        onChange={handleChange}
        placeholder="Số lượng sinh viên"
        required
      />

      <select
        name="course_id"
        value={form.course_id}
        onChange={handleChange}
        required
      >
        <option value="">Chọn học phần</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        name="semester_id"
        value={form.semester_id}
        onChange={handleChange}
        required
      >
        <option value="">Chọn học kỳ</option>
        {semesters.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {selected && (
        <select
          name="teacher_id"
          value={form.teacher_id}
          onChange={handleChange}
          required
        >
          <option value="">Chọn giảng viên</option>
          {teachers.map((t) => (
            <option key={t.full_name} value={t.id}>
              {t.full_name}
            </option>
          ))}
        </select>
      )}

      <button type="submit">{selected ? "Cập nhật lớp" : "Tạo lớp học phần"}</button>
    </form>
  );
}