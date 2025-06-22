import { useEffect, useState } from "react";
import { getAllCourses } from "../../services/courseService";
import CourseRow from "./CourseRow";

export default function CourseList({ setSelected }) {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  
useEffect(() => {
  getAllCourses().then((res) => {
    setCourses(res.data.responseObject);
  });
}, []);


  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Tên học phần</th>
          <th className="p-2 border">Số tín chỉ</th>
          <th className="p-2 border">Hệ số tín chỉ</th>
          <th className="p-2 border">Tổng số giờ</th>
          <th className="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseRow key={course.id} course={course} setSelected={setSelected} />
        ))}
      </tbody>
    </table>
  );
}
