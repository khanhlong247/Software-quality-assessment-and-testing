import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { getAllUsers } from "../../services/userService";

export default function UserPage() {
  const [selected, setSelected] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const reload = () => setReloadTrigger((prev) => prev + 1);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
      .then((res) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setForbidden(true);
        } else if (res && res.success) {
          setUsers(res.responseObject || []);
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
        <h1 className="function-title">Quản lý Người dùng</h1>
        <UserForm
          selected={selected}
          setSelected={setSelected}
          reload={reload}
        />
        <UserList setSelected={setSelected} reloadTrigger={reloadTrigger} />
      </div>
    );
  }
}
