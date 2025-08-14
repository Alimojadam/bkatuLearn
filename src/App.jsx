// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/loginPage/Login";
import SignUp from "./Pages/loginPage/SignUp";
import CoursesPage from "./Pages/coursesPage/CoursesPage";
import CoursPage from "./Pages/coursPage/CoursPage";
import { SearchProvider, UserProvider, useUser } from "./Pages/coursesContext";
import Teachers from "./Pages/teachers/Teachers";
import AboutTeacher from "./Pages/aboutTeachers/AboutTeacher";
import AboutUs from "./Pages/aboutUs/AboutUs";
import UserAccount from "./Pages/UserAccount/UserAccount";
import TeacherHomePage from "./TeacherPages/TeacherHomePage/TeacherHomePage";
import EditeCours from "./TeacherPages/TeacherHomePage/EditeCours";
import AdminPanel from "./AdminPanel/AdminHomePage/AdminHomePage";

function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      {/* 🟢 Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/loginPage" element={<Login />} />
      <Route path="/SignUpPage" element={<SignUp />} />
      <Route path="/CoursesPage" element={<CoursesPage />} />
      <Route path="/CoursPage/:id" element={<CoursPage />} />
      <Route path="/Teachers" element={<Teachers />} />
      <Route path="/AboutTeacher/:id" element={<AboutTeacher />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/UserAccount" element={<UserAccount />} />

      {/* 🔵 Teacher-only Routes */}
      {user?.type === "Teacher" && (
        <>
          <Route path="/TeacherHomePage" element={<TeacherHomePage />} />
          <Route path="/EditeCours/:id" element={<EditeCours />} />
        </>
      )}

      {/*Admin-only Routes */}
      {user?.type === "Admin" && (
        <Route path="/AdminPanel" element={<AdminPanel />} />
      )}
    </Routes>
  );
}


function App() {
  return (
    <UserProvider>
      <SearchProvider>
        <BrowserRouter>
          <AppRoutes /> 
        </BrowserRouter>
      </SearchProvider>
    </UserProvider>
  );
}

export default App;
