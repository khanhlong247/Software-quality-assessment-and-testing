import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      setUser(decoded);
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-mode");
      setIsLightMode(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const newIsLightMode = !isLightMode;
    setIsLightMode(newIsLightMode);

    if (newIsLightMode) {
      html.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="header">
      <div className="header-title">🎓 Dashboard</div>

      <div className="header-user">
        <div className="header-user-info">
          <Link to="/profile">
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="avatar"
              className="header-avatar cursor-pointer"
              title="Xem hồ sơ"
            />
          </Link>
          <span className="header-username">
            {user?.full_name || "Chưa đăng nhập"}
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="header-theme-toggle"
          title={
            isLightMode ? "Chuyển sang Dark Mode" : "Chuyển sang Light Mode"
          }
        >
          {isLightMode ? "🌙" : "🌞"}
        </button>

        <button
          onClick={handleLogout}
          className={user?.full_name ? "header-logout" : "header-login"}
        >
          {user?.full_name ? "Đăng xuất" : "Đăng nhập"}
        </button>
      </div>
    </header>
  );
}
