import { deleteDegree } from "../../services/degreeService";

export default function DegreeRow({ degree, setSelected }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      await deleteDegree(degree.id);
      window.location.reload();
    }
  };

  return (
    <tr>
      <td className="border p-2">{degree.id}</td>
      <td className="border p-2">{degree.full_name}</td>
      <td className="border p-2">{degree.short_name}</td>
      <td className="border p-2">{degree.salary_grade}</td>
      <td className="border p-2 space-x-2">
        <button onClick={() => setSelected(degree)} className="bg-yellow-400 px-2 py-1 text-white rounded">Sửa</button>
        <button onClick={handleDelete} className="bg-red-500 px-2 py-1 text-white rounded">Xoá</button>
      </td>
    </tr>
  );
}
