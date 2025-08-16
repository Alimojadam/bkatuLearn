import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Pages/coursesContext";
import Admin from "../../Pages/img/userIMG.jpg";
import CoursesManagement from "../CoursesManagement/CoursesManagement";
import TeachersManagement from "../TeachersManagement/TeachersManagement";


const AdminPanel = () => {

  const{setUser}=useUser();
  const navigate = useNavigate();

  const NavList = [
    { id: "courses", label: "مدیریت دوره‌ها", iconClass: "fa-solid fa-book" },
    { id: "teachers", label: "مدیریت مدرس‌ها", iconClass: "fa-solid fa-chalkboard-teacher" },
    { id: "videos", label: "مدیریت ویدیوها", iconClass: "fa-solid fa-video" },
    { id: "video-metadata", label: "ویرایش و تایید ویدیوها", iconClass: "fa-solid fa-pen-to-square" },
    { id: "users", label: "مدیریت کاربران", iconClass: "fa-solid fa-users" },
    { id: "user-roles", label: "نقش کاربران", iconClass: "fa-solid fa-user-shield" },
    { id: "reset-password", label: "ریست پسورد کاربران", iconClass: "fa-solid fa-key" },
    { id: "moderation", label: "رسیدگی به گزارش‌ها و شکایات", iconClass: "fa-solid fa-flag" },
    { id: "categories", label: "مدیریت دسته‌بندی‌ها", iconClass: "fa-solid fa-folder-tree" },
    { id: "tags", label: "مدیریت تگ‌ها", iconClass: "fa-solid fa-tags" },
    { id: "notifications", label: "پیام‌ها و اعلان‌ها", iconClass: "fa-solid fa-bell" },
    { id: "analytics", label: "آمار و فعالیت کاربران", iconClass: "fa-solid fa-chart-line" },
    { id: "storage", label: "فایل‌ها و فضای ذخیره‌سازی", iconClass: "fa-solid fa-database" },
    { id: "security", label: "امنیت و کنترل دسترسی", iconClass: "fa-solid fa-shield-halved" },
    { id: "profile", label: "پروفایل و تنظیمات", iconClass: "fa-solid fa-user-cog" },
  ];
  
  const LogOut = { id: "logout", label: "خروج", iconClass: "fa-solid fa-right-from-bracket" };
  const [activeItem, setActiveItem] = useState("courses");
  const [isOpen, setIsOpen] = useState(false);


  const Logout = () => {
    setUser(null);
    navigate("/");
  };
  
  return (
    <>
      {/* open Button*/}
      {!isOpen && (
        <button
          className="sm:hidden fixed top-4 right-4 z-50 p-2 text-[#1E3A8A] rounded-md"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      )}

      <div className="w-full relative flex flex-row-reverse justify-between gap-10 h-full bg-[#eef3f9] overflow-hidden">
        {/* Sidebar */}
        <div
          className={` fixed
            top-0 right-0 h-full bg-[#1E3A8A] flex flex-col gap-4 pb-5
            w-[85%]
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            sm:static sm:translate-x-0 sm:w-[30%] overflow-y-auto
            z-40
          `}
        >
          {/* close button */}
          {isOpen && (
            <div className="flex justify-start p-4 sm:hidden">
              <button
                className="p-2 text-white rounded-md"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
          )}

          {/* Admin Info */}
          <div className="mr-[40px] mt-[20px] flex flex-row-reverse justify-start items-center gap-8">
            <div className="w-[100px] h-[100px] rounded-[50%]">
              <img
                src={Admin}
                alt=""
                className="w-full h-full rounded-full border border-[#eef3f9]"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-[20px] text-[snow]">علی مجدم</p>
              <div className="border-b w-[120%] border-[#eef3f9]"></div>
              <p className="text-[18px] text-[snow]">Admin</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center">
            <div className="border-b w-[90%] border-[#eef3f9]"></div>
          </div>

          {/* Menu List */}
          <div className="w-full">
            <ul className="flex w-[97%] flex-col gap-3 justify-center items-end">
              {NavList.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex flex-row-reverse items-center gap-5 p-2 rounded-r-md cursor-pointer transition-all
                    ${
                      activeItem === item.id
                        ? "bg-[snow] text-[#1E3A8A]"
                        : "text-[#eef3f9] hover:bg-[#eef3f9] hover:text-[#1E3A8A]"
                    }`}
                >
                  <i className={`${item.iconClass} text-[18px]`}></i>
                  <span className="text-[19px]">{item.label}</span>
                </li>
              ))}

              {/* Divider */}
              <div className="w-full flex items-center justify-center my-2">
                <div className="border-b w-[90%] border-[#eef3f9]"></div>
              </div>

              {/* Log out item */}
              <li
                onClick={() => {
                  setActiveItem(LogOut.id);
                  Logout();
                  setIsOpen(false);
                }}
                className={`w-full flex flex-row-reverse items-center gap-5 p-2 rounded-r-md cursor-pointer transition-all
                  ${
                    activeItem === LogOut.id
                      ? "bg-[snow] text-[#1E3A8A]"
                      : "text-[#eef3f9] hover:bg-[#eef3f9] hover:text-[#1E3A8A]"
                  }`}
              >
                <i className={`${LogOut.iconClass} text-lg text-[18px]`}></i>
                <span className="text-[18px]">{LogOut.label}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full sm:w-[70%] flex justify-center items-start bg-[#eef3f9] transition-all duration-300">
          {activeItem==="courses" && <CoursesManagement/>}
          {activeItem==="teachers" && <TeachersManagement/>}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
