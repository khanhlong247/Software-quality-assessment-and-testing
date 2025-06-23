import { useState, useEffect } from "react";
import ClassSectionForm from "./ClassSectionForm";
import ClassSectionList from "./ClassSectionList";
import { getAllClassSections } from "../../services/classSectionService";

export default function ClassSectionPage() {
  const [selected, setSelected] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(Date.now());
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const reload = () => setReloadFlag(Date.now());
  useEffect(() => {
    setIsLoading(true);
    getAllClassSections()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setCourses(res.responseObject || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching class sections:", error);
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
        <h1 className="function-title">Quản lý Lớp học phần</h1>
        <ClassSectionForm
          selected={selected}
          setSelected={setSelected}
          reload={reload}
        />
        <ClassSectionList
          setSelected={setSelected}
          reloadFlag={reloadFlag}
          reload={reload}
        />
      </div>
    );
  }
}
