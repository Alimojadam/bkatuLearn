import React, { useEffect, useState } from "react";
import { useUser } from "../../Pages/coursesContext";
import RequestsComponent from "../myRequestsComponent/RequestsComponent";
import EditProfile from "../EditProfile/EditProfile";
import RequestToAddCourse from "../Request to Add a New Course/RequestToAddCourse";
import TeacherPanel from "../TeacherPanel/TeacherPanel";
import TeacherCourses from "../TeacherCourses/TeacherCourses";

const TeacherHomePage = () => {
  const { user } = useUser();

  // state برای ذخیره عرض پنجره
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const [activeSection, setActiveSection] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? "profile" : "dashboard"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth < 768) {
        setActiveSection("profile");
      } else {
        setActiveSection("dashboard");
      }
    }

    window.addEventListener("resize", handleResize);

    // اجرای اولیه برای مقداردهی صحیح
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-[#3073c1] text-xl">
        در حال بارگذاری اطلاعات مدرس...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full p-6 bg-gradient-to-b bg-[#eef3f9] flex flex-col justify-center items-center gap-6 ${
        isMenuOpen ? "overflow-hidden" : "overflow-auto"
      }`}
      dir="rtl"
    >
      <div className="hidden sm:block">
        <TeacherPanel />
      </div>

      {/* تب‌ها */}
      <div
        className={`${
          isMenuOpen ? "w-[70%]" : "w-0"
        } absolute top-0 right-0 sm:relative flex flex-col justify-center sm:w-5xl rounded-l-xl sm:rounded-3xl bg-white border border-[#2c5282] transition-all duration-300`}
      >
        {/* دکمه موبایل برای باز/بستن منو (فقط در موبایل نمایش داده میشه) */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden z-50">
          <i
            className={`fas ${
              isMenuOpen
                ? "fa-times absolute text-[#2c5282] left-3 top-3"
                : "fa-bars fixed text-[#2c5282] top-4 right-4"
            } text-xl`}
          ></i>
        </button>
        <div
          className={`min-h-screen sm:min-h-full sm:w-full sm:mt-0 mt-10 sm:rounded-3xl shadow-md flex flex-col sm:flex-row overflow-hidden`}
        >
          {[
            { id: "profile", label: "پروفایل مدرس", mobileOnly: true },
            { id: "dashboard", label: "دوره‌های من" },
            { id: "addCourse", label: "درخواست افزودن دوره جدید" },
            { id: "editProfile", label: "ویرایش پروفایل" },
            { id: "requests", label: "درخواست‌های من" },
            { id: "Logout", label: "خروج" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`sm:block flex-1 sm:py-4 cursor-pointer text-center font-semibold transition-colors duration-300
                ${tab.mobileOnly ? "block sm:hidden" : ""}
                ${
                  activeSection === tab.id
                    ? "bg-[#2c5282] text-white shadow-inner"
                    : "bg-transparent text-[#2c5282] hover:bg-[#cbd5e0]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* محتوای بخش‌ها */}
      <div className={`sm:block ${windowWidth < 768 ? "w-full min-h-screen mt-2" : "w-5xl"}`}>
        {activeSection === "profile" && <TeacherPanel />}
        {activeSection === "dashboard" && <TeacherCourses />}
        {activeSection === "requests" && <RequestsComponent />}
        {activeSection === "addCourse" && <RequestToAddCourse />}
        {activeSection === "editProfile" && <EditProfile />}
      </div>
    </div>
  );
};

export default TeacherHomePage;
