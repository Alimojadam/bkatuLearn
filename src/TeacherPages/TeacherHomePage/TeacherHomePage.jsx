import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../Pages/coursesContext";
import RequestsComponent from "../myRequestsComponent/RequestsComponent";
import EditProfile from "../EditProfile/EditProfile";
import RequestToAddCourse from "../Request to Add a New Course/RequestToAddCourse";
import TeacherPanel from "../TeacherPanel/TeacherPanel";
import TeacherCourses from "../TeacherCourses/TeacherCourses";

const MOBILE_BREAKPOINT = 768;

const TeacherHomePage = () => {
  const { user } = useUser();

  // وضعیت موبایل (true اگر موبایل)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  // بخش فعال، مقدار پیش‌فرض بر اساس isMobile تعیین میشه
  const [activeSection, setActiveSection] = useState(isMobile ? "profile" : "dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // برای نگهداری موقعیت اسکرول قبل از قفل کردن
  const scrollPosRef = useRef(0);

  // resize handler: فقط وقتی که از یک وضعیت به وضعیت دیگر عبور کردیم isMobile رو آپدیت و نه همیشه
  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile((prev) => {
        if (prev !== nowMobile) {
          // تنها وقتی breakpoint عوض شده:
          // اگر الان موبایلیم و قبلاً دسکتاپ بود => انتخاب اولیه رو به profile بزن
          // اگر الان دسکتاپیم و قبلاً موبایل بود => انتخاب اولیه رو به dashboard بزن
          if (nowMobile) {
            setActiveSection((prevSection) => (prevSection ? prevSection : "profile"));
          } else {
            // وقتی میریم دسکتاپ منو موبایل رو ببند و پیش‌فرض دسکتاپ بذار
            setIsMenuOpen(false);
            setActiveSection((prevSection) => (prevSection ? prevSection : "dashboard"));
          }
          return nowMobile;
        }
        return prev; // هیچ تغییری نده
      });
    };

    window.addEventListener("resize", handleResize);
    // مقدار اولیه را هم هماهنگ می‌کنیم (در صورتی که window در دسترس باشه)
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // قفل اسکرول صفحه وقتی منو موبایل بازه، به طوری که موقعیت اسکرول حفظ بشه
  useEffect(() => {
    if (!isMobile) return; // فقط برای موبایل اعمال می‌کنیم

    if (isMenuOpen) {
      // ذخیره موقعیت فعلی
      scrollPosRef.current = window.pageYOffset || document.documentElement.scrollTop || 0;
      // قفل کردن صفحه و نگه داشتن موقعیت
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = "100%";
    } else {
      // بازگرداندن موقعیت اسکرول
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      const scrollY = top ? -parseInt(top, 10) : scrollPosRef.current;
      window.scrollTo(0, scrollY);
    }

    // cleanup هنگام unmount
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

  // لیست تب‌ها (پروفایل فقط در موبایل نشان داده میشه)
  const tabs = [
    ...(isMobile ? [{ id: "profile", label: "پروفایل مدرس", mobileOnly: true }] : []),
    { id: "dashboard", label: "دوره‌های من" },
    { id: "addCourse", label: "درخواست افزودن دوره جدید" },
    { id: "editProfile", label: "ویرایش پروفایل" },
    { id: "requests", label: "درخواست‌های من" },
    { id: "Logout", label: "خروج" },
  ];

  return (
    <div
      className="min-h-screen w-full p-6 bg-gradient-to-b from-white to-[#eef3f9] flex flex-col items-center gap-6"
      dir="rtl"
    >
      {/* در دسکتاپ همیشه پنل کناری نشون داده میشه */}
      <div className="hidden sm:block w-full max-w-5xl">
        <TeacherPanel />
      </div>

      {/* دکمه منو (فقط موبایل) */}
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen((s) => !s)}
          className="z-50 sm:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
        >
          <i className={`fas ${isMenuOpen ? "fa-times text-[#2c5282] fixed right-3 top-3 z-100" : "fa-bars fixed text-[#2c5282] top-3 right-3"} text-xl`}></i>
        </button>
      )}

      {/* منو — استفاده از transform برای اسلاید (اجتناب از تغییر width مستقیم) */}
      <nav
        className={`fixed top-0 right-0 h-full mt-10 sm:,t-0 z-40 sm:static sm:h-auto sm:w-full sm:rounded-3xl
          bg-white  shadow-md transform transition-transform duration-300
          ${isMobile ? "w-64" : "w-full max-w-5xl"}
          ${isMobile ? (isMenuOpen ? "translate-x-0" : "translate-x-full") : "translate-x-0"}
          rounded-l-xl sm:rounded-3xl overflow-hidden`}
        aria-hidden={!isMenuOpen && isMobile}
      >
        <div className="flex flex-col sm:flex-row min-h-screen sm:min-h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSection(tab.id);
                // در موبایل وقتی تب انتخاب شد منو رو ببند
                if (isMobile) setIsMenuOpen(false);
              }}
              className={`flex flex-col gap-5 sm:flex-1 py-4 text-start pr-4 sm:pr-0 sm:text-center font-semibold transition-colors duration-200 cursor-pointer
                ${activeSection === tab.id ? "bg-[#2c5282] text-white shadow-inner" : "text-[#2c5282] hover:bg-[#cbd5e0]"}
                ${tab.mobileOnly ? "block sm:hidden" : ""}`}
            >
              {tab.label}
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
