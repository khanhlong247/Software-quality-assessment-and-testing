import { useState, useEffect } from "react";
import SemesterForm from "./SemesterForm";
import SemesterList from "./SemesterList";
import { getAllSemesters } from "../../services/semesterService";

export default function SemesterPage() {
  const [selected, setSelected] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(Date.now());
  const [forbidden, setForbidden] = useState(false);

  const reload = () => setReloadFlag(Date.now());
  useEffect(() => {
    getAllSemesters()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setFaculties(res.responseObject || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching semesters:", error);
        if (
          error.response &&
          (error.response.status === 403 || error.response.status === 401)
        ) {
          setForbidden(true);
        }
      });
  }, []);
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
        <h1 className="text-xl font-bold mb-4">Quản lý Học kỳ</h1>
        <SemesterForm
          selected={selected}
          setSelected={setSelected}
          reload={reload}
        />
        <SemesterList
          setSelected={setSelected}
          reloadFlag={reloadFlag}
          reload={reload}
        />
      </div>
    );
  }
}
