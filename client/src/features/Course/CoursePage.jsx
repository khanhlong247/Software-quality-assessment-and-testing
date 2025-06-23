import CourseList from "./CourseList";
import CourseForm from "./CourseForm";
import { getAllCourses } from "../../services/courseService";
import { useState, useEffect } from "react";

export default function CoursePage() {
  const [selected, setSelected] = useState(null);
  const [course, setCourses] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getAllCourses()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setCourses(res.responseObject || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        if (
          error.response &&
          (error.response.status === 403 || error.response.status === 401)
        ) {
          setForbidden(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (forbidden) {
    return (
      <div className="forbidden-message">
        <div className="inner-content">
          Bạn không có quyền truy cập vào chức năng này
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Quản lý Học phần</h1>
        <CourseForm selected={selected} setSelected={setSelected} />
        <CourseList setSelected={setSelected} />
      </div>
    );
  }
}
