import { useEffect, useState } from 'react';
import logo from '../../img/logo_header.png'

const NavBar=()=>{
    const [darkMode,setDarkMode]=useState(
        localStorage.getItem("theme") === "dark"
    )
    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
          document.querySelector('.dark-mod').classList.add("active")
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.querySelector('.dark-mod').classList.remove("active")
          localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return(
        <header className="flex header justify-between items-center p-4 shadow-md bg-white fixed top-0 z-1">
            <div className="flex ml-10 items-center gap-2">
                <button 
                className="p-2 rounded-full bgColor-header-btn transition flex items-center justify-center w-10 h-10"
                onClick={() => setDarkMode(!darkMode)}
                >
                <span className={`text-xl dark-mod active ${darkMode ? "text-yellow-400" : "text-blue-600"}`}>
                    {darkMode ? "🌙" : "☀️"}
                </span>
                </button>
                <div className="h-10 header-logo">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                </div>

                {/* <span className="text-lg text-gray uniName">دانشگاه صنعتی خاتم الانبیا بهبهان</span> */}
            </div>
            <nav className="flex gap-6 text-gray-700 mr-[60px]">
                <a href="#" className="hover:text-blue-600 list-font">درباره ما</a>
                <a href="#" className="hover:text-blue-600 list-font">اساتید</a>
                <a href="#" className="hover:text-blue-600 list-font">دوره‌های آموزشی</a>
            </nav>
        </header>
    )
}
export default NavBar;