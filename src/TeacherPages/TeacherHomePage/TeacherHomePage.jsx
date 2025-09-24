import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../Pages/coursesContext";
import RequestsComponent from "../myRequestsComponent/RequestsComponent";
import EditProfile from "../EditProfile/EditProfile";
import RequestToAddCourse from "../Request to Add a New Course/RequestToAddCourse";
import TeacherPanel from "../TeacherPanel/TeacherPanel";
import TeacherCourses from "../TeacherCourses/TeacherCourses";
import {Navigate, useNavigate } from "react-router-dom";
const MOBILE_BREAKPOINT = 768;

const TeacherHomePage = () => {
  const { user } = useUser();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  const [activeSection, setActiveSection] = useState(isMobile ? "profile" : "dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollPosRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile((prev) => {
        if (prev !== nowMobile) {
          if (nowMobile) {
            setActiveSection((prevSection) => (prevSection ? prevSection : "profile"));
          } else {
            setIsMenuOpen(false);
            setActiveSection((prevSection) => (prevSection ? prevSection : "dashboard"));
          }
          return nowMobile;
        }
        return prev; 
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return; 

    if (isMenuOpen) {
      scrollPosRef.current = window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      const scrollY = top ? -parseInt(top, 10) : scrollPosRef.current;
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen, isMobile]);

  if (!user) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-[#3073c1] text-xl">
        در حال بارگذاری اطلاعات مدرس...
      </div>
    );
  }


  const tabs = [
    ...(isMobile ? [{ id: "profile", label: "پروفایل مدرس", mobileOnly: true, icon: "fas fa-user" }] : []),
    { id: "dashboard", label: "دوره‌های من", icon: "fas fa-graduation-cap" },
    { id: "addCourse", label: "افزودن دوره جدید", icon: "fas fa-plus-circle" },
    { id: "editProfile", label: "ویرایش پروفایل", icon: "fas fa-edit" },
    { id: "requests", label: "درخواست‌های من", icon: "fas fa-inbox" },
    { id: "Logout", label: "خروج", icon: "fas fa-sign-out-alt" },
  ];
  

  return (
    <div
      className="min-h-screen w-full p-6 bg-gradient-to-b from-white to-[#eef3f9] flex flex-col items-center gap-6"
      dir="rtl"
    >
      <div className="hidden sm:block w-full max-w-5xl">
        <TeacherPanel />
      </div>


      {isMobile && (
        <button
          onClick={() => setIsMenuOpen((s) => !s)}
          className={`z-50 fixed top-3 right-3 sm:hidden ${ isMenuOpen ? "hidden" : "block"}`}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
        >
          <i className={`fas fa-bars text-[#2c5282] text-xl`}></i>
          {/* <i className={`fas ${isMenuOpen ? "" : ""} text-xl`}></i> */}
        </button>
      )}
      <nav
        className={`fixed top-0 right-0 h-full sm:mt-10 sm:t-0 z-40 sm:static sm:h-auto sm:w-full sm:rounded-3xl
          bg-white  shadow-md transform transition-transform duration-300
          ${isMobile ? "w-64" : "w-full max-w-5xl"}
          ${isMobile ? (isMenuOpen ? "translate-x-0" : "translate-x-full") : "translate-x-0"}
          rounded-l-xl sm:rounded-3xl overflow-hidden`}
        aria-hidden={!isMenuOpen && isMobile}
      >
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            className={`z-50 fixed left-3 top-3 sm:hidden ${ isMenuOpen ? "block" : "hidden"}`}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          >
            <i className={`fas fa-times text-[#2c5282] z-100 text-xl`}></i>
          </button>
        )}
        <div className="flex flex-col sm:flex-row min-h-screen mt-10 sm:mt-0 sm:min-h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "Logout") {
                  navigate("/UserAccount"); // یا هر آدرسی که میخوای
                  return;
                }
                setActiveSection(tab.id);
                if (isMobile) setIsMenuOpen(false);
              }}
              className={`flex flex-col gap-5 sm:flex-1 py-4 text-start pr-4 sm:pr-0 sm:text-center font-semibold transition-colors duration-200 cursor-pointer
                ${activeSection === tab.id ? "bg-[#2c5282] text-white shadow-inner" : "text-[#2c5282] hover:bg-[#cbd5e0]"}
                ${tab.mobileOnly ? "block sm:hidden" : ""}`}
            >
              <div className={`flex ${!isMobile && "justify-center"} items-center gap-5`}>
                {isMobile && (<i className={`${tab.icon} text-lg`}></i>)}
                <p>{tab.label}</p>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* محتوای اصلی */}
      <main className={`w-full max-w-5xl mt-4 ${isMobile ? "px-2" : "px-0"}`}>
        {activeSection === "profile" && <TeacherPanel />}
        {activeSection === "dashboard" && <TeacherCourses />}
        {activeSection === "requests" && <RequestsComponent />}
        {activeSection === "addCourse" && <RequestToAddCourse />}
        {activeSection === "editProfile" && <EditProfile />}
      </main>
    </div>
  );
};

export default TeacherHomePage;
