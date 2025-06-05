import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/loginPage/Login"; 
import SignUp from "./Pages/loginPage/SignUp"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/SignUpPage" element={< SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
