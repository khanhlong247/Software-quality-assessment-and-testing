import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DegreePage from "./features/Degree/DegreePage";
import FacultyPage from "./features/Faculty/FacultyPage";
import LoginPage from "./features/Auth/LoginPage";
import TeacherPage from "./features/Teacher/TeacherPage";
import CoursePage from "./features/Course/CoursePage";
import SemesterPage from "./features/Semester/SemesterPage";
import ClassSectionPage from "./features/Class_Section/ClassSectionPage";
import UserProfile from "./features/User/UserProfile";
import ReportPage from "./features/Report/ReportPage";
import SystemPage from "./features/System/SystemPage";
import UserPage from "./features/User/UserPage";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "degrees", element: <DegreePage /> },
      { path: "faculties", element: <FacultyPage /> },
      { path: "teachers", element: <TeacherPage /> },
      { path: "courses", element: <CoursePage /> },
      { path: "semesters", element: <SemesterPage /> },
      { path: "class-sections", element: <ClassSectionPage /> },
      { path: "profile", element: <UserProfile /> },
      { path: "stats", element: <ReportPage /> },
      { path: "system", element: <SystemPage /> },
      { path: "users", element: <UserPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
