import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DegreePage from "./features/Degree/DegreePage";
import FacultyPage from "./features/Faculty/FacultyPage";
import LoginPage from "./features/Auth/LoginPage";
import TeacherPage from "./features/Teacher/TeacherPage";
import CoursePage from "./features/Course/CoursePage";
import SemesterPage from "./features/Semester/SemesterPage";
import ClassSectionPage from "./features/Class_Section/ClassSectionPage";


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
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
