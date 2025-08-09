import { useEffect, useState } from "react";
import logo from "../../img/logo_header.png";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.querySelector(".dark-mod").classList.add("active");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector(".dark-mod").classList.remove("active");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="flex flex-row sm:flex-row header justify-start gap-10 items-center p-4 shadow-md bg-white fixed top-0 left-0 right-0 z-10">
      <div className="flex w-full sm:w-auto ml-0 sm:ml-10 items-center gap-2 justify-start sm:justify-start mb-2 sm:mb-0">
        <button
          className="p-2 rounded-full bgColor-header-btn transition flex items-center justify-center w-10 h-10"
          onClick={() => setDarkMode(!darkMode)}
        >
          <span
            className={`text-xl dark-mod ${
              darkMode ? "text-yellow-400" : "text-blue-600"
            }`}
          >
            {darkMode ? "🌙" : "☀️"}
          </span>
        </button>
        <div className="h-10 header-logo">
          <div className="logo">
            <img src={logo} alt="لوگو" className="h-10 w-auto" />
          </div>
        </div>
      </div>

      {/* button */}
      <button
        className="sm:hidden p-2 text-gray-700 ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/*  open menue */}
      <nav
        className={`sm:flex ${
          menuOpen ? "block" : "hidden"
        } absolute top-full justify-end items-start right-0 mt-2 bg-white shadow-md rounded-md w-48 origin-top-right flex-col flex z-20 sm:static sm:w-auto sm:mt-0 sm:bg-transparent sm:shadow-none sm:rounded-none sm:flex-row sm:relative`}
      >
        <a
          href="#"
          className="w-full text-end hover:text-blue-600 list-font whitespace-nowrap p-3 border-b sm:border-none border-gray-200 last:border-b-0"
          onClick={() => setMenuOpen(false)}
        >
          درباره ما
        </a>
        <a
          href="#"
          className="w-full text-end hover:text-blue-600 list-font whitespace-nowrap p-3 border-b sm:border-none border-gray-200 last:border-b-0"
          onClick={() => setMenuOpen(false)}
        >
          اساتید
        </a>
        <a
          href="#"
          className="w-full text-end hover:text-blue-600 list-font whitespace-nowrap p-3 border-b sm:border-none border-gray-200 last:border-b-0"
          onClick={() => setMenuOpen(false)}
        >
          دوره‌های آموزشی
        </a>
      </nav>
    </header>
  );
};

export default NavBar;
