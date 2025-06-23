import { deleteCourse } from "../../services/courseService";

export default function CourseRow({ course, setSelected }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xoá học phần? Tất cả dữ liệu liên quan sẽ bị xoá.")) {
      await deleteCourse(course.id);
      window.location.reload();
    }
  };

  return (
    <tr>
      <td className="border p-2">{course.id}</td>
      <td className="border p-2">{course.name}</td>
      <td className="border p-2">{course.credit}</td>
      <td className="border p-2">{course.coefficient}</td>
      <td className="border p-2">{course.total_hour}</td>
      <td className="border p-2 space-x-2">
        <button onClick={() => setSelected(course)} className="bg-yellow-400 px-2 py-1 text-white rounded">Sửa</button>
        <button onClick={handleDelete} className="bg-red-500 px-2 py-1 text-white rounded">Xoá</button>
      </td>
    </tr>
  );
}
