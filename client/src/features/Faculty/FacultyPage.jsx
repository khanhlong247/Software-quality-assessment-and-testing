import { useState, useEffect } from "react";
import FacultyForm from "./FacultyForm";
import FacultyList from "./FacultyList";
import { getAllFaculties } from "../../services/facultyService";

export default function FacultyPage() {
  const [selected, setSelected] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllFaculties()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setFaculties(res.responseObject || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
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
        <h1 className="text-xl font-bold mb-4">Quản lý Khoa</h1>
        <FacultyForm selected={selected} setSelected={setSelected} />
        <FacultyList setSelected={setSelected} />
      </div>
    );
  }
}
