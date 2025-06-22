import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./app.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />

      <div className="layout">
        <div className="sidebar">
          <Sidebar />
        </div>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
