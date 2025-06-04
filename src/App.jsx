import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/loginPage/Login";  // مطمئن شو حروف بزرگ‌کوچک درست است

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
