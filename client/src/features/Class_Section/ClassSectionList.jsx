import { useEffect, useState } from "react";
import { getAllClassSections, deleteClassSection } from "../../services/classSectionService";

export default function ClassSectionList({ setSelected, reloadFlag, reload }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getAllClassSections().then((res) => {
      setSections(res.data.responseObject || []);
    });
  }, [reloadFlag]);

  const handleDelete = async (id) => {
    if (confirm("Xoá lớp học phần này?")) {
      await deleteClassSection(id);
      reload();
    }
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Tên lớp</th>
          <th className="border p-2">Số sinh viên</th>
          <th className="border p-2">Học phần</th>
          <th className="border p-2">Học kỳ</th>
          <th className="border p-2">Năm Học</th>
          <th className="border p-2">Giảng viên</th>
          <th className="border p-2">Hệ số lớp</th>
          <th className="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {sections.map((s) => (
          <tr key={s.id}>
            <td className="border p-2">{s.id}</td>
            <td className="border p-2">{s.full_name}</td>
            <td className="border p-2">{s.total_students}</td>
            <td className="border p-2">{s.course_id}</td>
            <td className="border p-2">{s.semester_id}</td>
            <td className="border p-2">{s.start_year}</td>
            <td className="border p-2">{s.teacher_id || "Chưa có"}</td>
            <td className="border p-2">{s.grade ?? "-"}</td>
            <td className="border p-2 space-x-2">
              <button onClick={() => setSelected(s)} className="bg-yellow-400 text-white px-2 py-1 rounded">
                Sửa
              </button>
              <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Xoá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
