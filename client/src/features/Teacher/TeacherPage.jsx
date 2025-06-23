import { useState, useEffect } from "react";
import TeacherForm from "./TeacherForm";
import TeacherList from "./TeacherList";
import { getAllTeachers } from "../../services/teacherService";

export default function TeacherPage() {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(Date.now());
  const [selected, setSelected] = useState(null);
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const reload = () => setReloadFlag(Date.now());

  useEffect(() => {
    setIsLoading(true);
    getAllTeachers()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setCourses(res.responseObject || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
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

  const handleEdit = (teacher) => {
    setEditData(teacher);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  const handleAddNew = () => {
    setEditData(null);
    setShowForm(true);
  };
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
        <h1 className="function-title">Quản lý Giảng viên</h1>

        <button
          className="bg-green-600 text-white px-3 py-1 rounded mb-4 hover:bg-green-700"
          onClick={handleAddNew}
        >
          + Thêm giảng viên
        </button>

        {showForm && (
          <TeacherForm
            onClose={handleCloseForm}
            reload={reload}
            editData={editData}
          />
        )}

        <TeacherList reloadFlag={reloadFlag} onEdit={handleEdit} />
      </div>
    );
  }
}
