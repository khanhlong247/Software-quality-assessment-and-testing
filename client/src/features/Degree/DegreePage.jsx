import DegreeList from "./DegreeList";
import DegreeForm from "./DegreeForm";
import { getAllDegrees } from "../../services/degreeService";
import { useState, useEffect } from "react";

export default function DegreePage() {
  const [selected, setSelected] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllDegrees()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setFaculties(res.responseObject || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching degrees:", error);
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
        <h1 className="function-title">Quản lý Bằng cấp</h1>
        <DegreeForm selected={selected} setSelected={setSelected} />
        <DegreeList setSelected={setSelected} />
      </div>
    );
  }
}
