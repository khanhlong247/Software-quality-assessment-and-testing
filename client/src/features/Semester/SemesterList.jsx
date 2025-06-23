import { useEffect, useState } from "react";
import { getAllSemesters, deleteSemester } from "../../services/semesterService";

export default function SemesterList({ setSelected, reloadFlag, reload }) {
  const [semesters, setSemesters] = useState([]);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    
    if (typeof dateString === 'string' && dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    
    if (typeof dateString === 'string' && dateString.includes('-')) {
      return dateString;
    }
    
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await getAllSemesters();
        setSemesters(res.data.responseObject || []);
      } catch (err) {
        console.error("Lỗi lấy danh sách học kỳ:", err);
      }
    };

    fetchSemesters();
  }, [reloadFlag]);

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xoá học kỳ này không? Tất cả dữ liệu liên quan sẽ bị xoá.")) {
      try {
        await deleteSemester(id);
        reload();
      } catch (err) {
        alert("Lỗi xoá học kỳ");
      }
    }
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Tên</th>
          <th className="border p-2">Năm bắt đầu</th>
          <th className="border p-2">Từ ngày</th>
          <th className="border p-2">Đến ngày</th>
          <th className="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {semesters.map((s) => (
          <tr key={s.id}>
            <td className="border p-2">{s.id}</td>
            <td className="border p-2">{s.name}</td>
            <td className="border p-2">{s.start_year}</td>
            <td className="border p-2">{formatDateForDisplay(s.start_date)}</td>
            <td className="border p-2">{formatDateForDisplay(s.end_date)}</td>
            <td className="border p-2 space-x-2">
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded"
                onClick={() => setSelected(s)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(s.id)}
              >
                Xoá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}