import { useEffect, useState } from "react";
import { getAllDegrees } from "../../services/degreeService";
import DegreeRow from "./DegreeRow";

export default function DegreeList({ setSelected }) {
  const [degrees, setDegrees] = useState([]);
  const [error, setError] = useState(null);
  
useEffect(() => {
  getAllDegrees().then((res) => {
    setDegrees(res.data.responseObject);
  });
}, []);


  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Tên đầy đủ</th>
          <th className="p-2 border">Tên viết tắt</th>
          <th className="p-2 border">Bậc lương</th>
          <th className="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {degrees.map((degree) => (
          <DegreeRow key={degree.id} degree={degree} setSelected={setSelected} />
        ))}
      </tbody>
    </table>
  );
}
