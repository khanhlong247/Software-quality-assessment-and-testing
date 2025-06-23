import { useState, useEffect } from "react";
import ReportTable from "./ReportTable";
import { getReport } from "../../services/reportService";

export default function ReportPage() {
  const [level, setLevel] = useState("teacher");
  const [year, setYear] = useState("2025");
  const [orderBy, setOrderBy] = useState("total_salary");
  const [orderDir, setOrderDir] = useState("desc");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forbidden, setForbidden] = useState(false);

  const orderByOptions = {
    teacher: [
      "teacher_id",
      "teacher_name",
      "year",
      "total_salary",
      "total_classes",
    ],
    faculty: [
      "faculty_id",
      "faculty_name",
      "year",
      "total_salary",
      "total_classes",
    ],
    school: ["year", "total_salary", "total_classes"],
  };

  useEffect(() => {
    fetchReport();
  }, [level, year, orderBy, orderDir]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getReport(level, year, orderBy, orderDir);
      if (response.data.success) {
        setReportData(response.data.responseObject);
      } else {
        setError(response.data.message || "Không thể lấy dữ liệu báo cáo");
      }
    } catch (err) {
      console.error("Lỗi khi lấy báo cáo:", err);
      if (
        err.response &&
        (err.response.status === 403 || err.response.status === 401)
      ) {
        setForbidden(true);
      } else {
        setError(err.response?.data?.message || "Không thể kết nối đến server");
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
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
      <h1 className="text-xl font-bold mb-4">Báo cáo thống kê</h1>
      <div className="query-wrap-report">
        <div className="query-select">
          <div>
            <label className="mr-2">Cấp độ:</label>
            <select
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setOrderBy(orderByOptions[e.target.value][0]);
              }}
              className="border p-2 rounded"
            >
              <option value="teacher">Giảng viên</option>
              <option value="faculty">Khoa</option>
              <option value="school">Trường</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Năm:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 rounded w-24"
              min="2000"
              max="2100"
            />
          </div>
          <div>
            <label className="mr-2">Sắp xếp theo:</label>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="border p-2 rounded"
            >
              {orderByOptions[level].map((option) => (
                <option key={option} value={option}>
                  {option.replace("_", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2">Thứ tự:</label>
            <select
              value={orderDir}
              onChange={(e) => setOrderDir(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="desc">Giảm dần</option>
              <option value="asc">Tăng dần</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ReportTable level={level} data={reportData} />
      )}
    </div>
  );
}
