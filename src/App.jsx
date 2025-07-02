import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/loginPage/Login"; 
import SignUp from "./Pages/loginPage/SignUp"; 
import CoursesPage from "./Pages/coursesPage/CoursesPage";
import CoursPage from "./Pages/coursPage/CoursPage";
import { SearchProvider } from "./Pages/coursesContext";
import Teachers from "./Pages/teachers/Teachers";
import AboutTeacher from "./Pages/aboutTeachers/AboutTeacher"

function App() {
  return (
    <SearchProvider>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/loginPage" element={<Login />} />
           <Route path="/SignUpPage" element={< SignUp/>} />
           <Route path="/CoursesPage" element={< CoursesPage/>} />
           <Route path="/CoursPage/:id" element={< CoursPage/>} />
           <Route path="/Teachers" element={< Teachers/>} />
           <Route path="/AboutTeacher" element={< AboutTeacher/>} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
