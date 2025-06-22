import { deleteFaculty } from "../../services/facultyService";

export default function FacultyRow({ faculty, setSelected }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xoá khoa này?")) {
      await deleteFaculty(faculty.id);
      window.location.reload();
    }
  };

  return (
    <tr>
      <td className="border p-2">{faculty.id}</td>
      <td className="border p-2">{faculty.full_name}</td>
      <td className="border p-2">{faculty.short_name}</td>
      <td className="border p-2">{faculty.description}</td>
      <td className="border p-2 space-x-2">
        <button onClick={() => setSelected(faculty)} className="bg-yellow-400 px-2 py-1 text-white rounded">Sửa</button>
        <button onClick={handleDelete} className="bg-red-500 px-2 py-1 text-white rounded">Xoá</button>
      </td>
    </tr>
  );
}
