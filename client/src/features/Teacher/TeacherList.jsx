import { useEffect, useState } from "react";
import { getAllTeachers, deleteTeacher } from "../../services/teacherService";

export default function TeacherList({ reloadFlag, onEdit }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllTeachers().then((res) => {
      setTeachers(res.data.responseObject);
    });
  }, [reloadFlag]);

  const handleDelete = async (id, teacherName) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa giảng viên "${teacherName}"?`)) {
      try {
        await deleteTeacher(id);
        // Reload lại danh sách sau khi xóa
        getAllTeachers().then((res) => {
          setTeachers(res.data.responseObject);
        });
      } catch (err) {
        console.error("Lỗi xóa giảng viên:", err);
        alert("Lỗi khi xóa giảng viên");
      }
    }
  };

  return (
    <table className="w-full border border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Tên giảng viên</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Số điện thoại</th>
          <th className="border p-2">Bằng cấp</th>
          <th className="border p-2">Khoa</th>
          <th className="border p-2">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t.id}>
            <td className="border p-2">{t.id}</td>
            <td className="border p-2">{t.full_name}</td>
            <td className="border p-2">{t.email}</td>
            <td className="border p-2">{t.phone ?? "chưa cập nhật"}</td>
            <td className="border p-2">{t.degree}</td>
            <td className="border p-2">{t.faculty}</td>
            <td className="border p-2">
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                  onClick={() => onEdit(t)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                  onClick={() => handleDelete(t.id, t.full_name)}
                >
                  Xóa
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}