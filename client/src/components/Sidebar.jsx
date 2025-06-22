import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="main-sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li className="sidebar-nav-item">
            <NavLink
              to="/faculties"
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quản lý Khoa
            </NavLink>
          </li>
          <li className="sidebar-nav-item">
            <NavLink
              to="/degrees"
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quản lý Bằng cấp
            </NavLink>
          </li>
          <li className="sidebar-nav-item">
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quản lý Giảng viên
            </NavLink>
          </li>
          <li className="sidebar-nav-item">
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quản lý Học phần
            </NavLink>
          </li>
          <li className="sidebar-nav-item">
            <NavLink
              to="/semesters"
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quản lý Học kỳ
            </NavLink>
          </li>
          <li className="sidebar-nav-item">
            <NavLink
              to="/class-sections"
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quản lý Lớp học phần
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
