import { useState, useEffect } from "react";
import { updateStatsMoney } from "../../services/systemService";
import { getAllFaculties } from "../../services/facultyService";

export default function SystemPage() {
  const [money, setMoney] = useState("");
  const [errors, setErrors] = useState(null);
  const [forbidden, setForbidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [faculties, setFaculties] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    try {
      await updateStatsMoney(money);
      setErrors(null);
      setMoney("");
    } catch (err) {
      console.error("Lỗi khi cập nhật số tiền:", err);
      if (err.response && err.response.data) {
        const errorResponse = err.response.data;
        setErrors(errorResponse.message || "Có lỗi xảy ra khi cập nhật số tiền");
      } else {
        setErrors("Không thể kết nối đến server");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllFaculties()
      .then((res) => {
        if (res && res.success) {
          setFaculties(res.responseObject || []);
          setErrors(null);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách khoa:", err);
        if (err.response && (err.response.status === 403 || err.response.status === 401)) {
          setForbidden(true);
        } else if (err.response && err.response.data) {
          const errorResponse = err.response.data;
          setErrors(errorResponse.message || "Có lỗi xảy ra khi lấy danh sách khoa");
        } else {
          setErrors("Không thể kết nối đến server");
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
  }

  return (
    <div className="p-4">
      <h1 className="function-title">Cập nhật tiền mỗi tín chỉ</h1>
      {errors && (
        <div className="error-message">
          {errors}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          placeholder="Nhập số tiền"
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Đang xử lý..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}