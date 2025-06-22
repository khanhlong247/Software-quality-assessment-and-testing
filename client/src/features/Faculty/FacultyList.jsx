import { useEffect, useState } from "react";
import { getAllFaculties } from "../../services/facultyService";
import FacultyRow from "./FacultyRow";

export default function FacultyList({ setSelected }) {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    getAllFaculties().then((res) => {
      setFaculties(res.data.responseObject);
    });
  }, []);

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Tên khoa</th>
          <th className="p-2 border">Tên viết tắt</th>
          <th className="p-2 border">Mô tả</th>
          <th className="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {faculties.map((faculty) => (
          <FacultyRow
            key={faculty.id}
            faculty={faculty}
            setSelected={setSelected}
          />
        ))}
      </tbody>
    </table>
  );
}
