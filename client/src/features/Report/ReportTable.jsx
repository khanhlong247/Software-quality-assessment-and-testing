export default function ReportTable({ level, data }) {
  const headers = {
    teacher: [
      { key: "teacher_id", label: "ID Giảng viên" },
      { key: "teacher_name", label: "Tên Giảng viên" },
      { key: "year", label: "Năm" },
      { key: "total_salary", label: "Tổng lương" },
      { key: "total_classes", label: "Tổng số lớp" }
    ],
    faculty: [
      { key: "faculty_id", label: "ID Khoa" },
      { key: "faculty_name", label: "Tên Khoa" },
      { key: "year", label: "Năm" },
      { key: "total_salary", label: "Tổng lương" },
      { key: "total_classes", label: "Tổng số lớp" }
    ],
    school: [
      { key: "year", label: "Năm" },
      { key: "total_salary", label: "Tổng lương" },
      { key: "total_classes", label: "Tổng số lớp" }
    ]
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(salary));
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          {headers[level].map((header) => (
            <th key={header.key} className="p-2 border">{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {headers[level].map((header) => (
                <td key={header.key} className="border p-2">
                  {header.key === "total_salary" ? formatSalary(item[header.key]) : item[header.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers[level].length} className="p-2 text-center">
              Không có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}