import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleCourses = [
  { id: 1, title: "React مقدماتی", price: 50000, teacher: "علی رضایی", teacherId: 10 },
  { id: 2, title: "Node.js پیشرفته", price: 75000, teacher: "مریم حسینی", teacherId: 11 },
];

const sampleTeachers = [
  { id: 10, name: "علی رضایی", study: "مهندسی کامپیوتر", email: "ali@example.com" },
  { id: 11, name: "مریم حسینی", study: "علوم کامپیوتر", email: "maryam@example.com" },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const navigate = useNavigate();

  const goToEditCourse = (id) => navigate(`/EditeCours/${id}`);
  const goToTeacherProfile = (id) => navigate(`/TeacherProfile/${id}`);

  const labelValueRow = "flex justify-between items-center mb-3";

  return (
    <div
      className="min-h-screen p-10 bg-gradient-to-tr from-[#dbe8fb] via-[#a9c7f8] to-[#7faaf7]"
      dir="rtl"
    >
      <h1 className="text-6xl font-extrabold text-gradient bg-gradient-to-r from-[#3073c1] via-[#3f7dd6] to-[#3073c1] bg-clip-text text-transparent mb-12 select-none drop-shadow-lg">
        پنل ادمین
      </h1>

      <div className="max-w-7xl mx-auto flex gap-10">
        {/* تب‌ها سمت راست */}
        <nav
          aria-label="ناوبری تب‌ها"
          className="flex flex-col gap-3 min-w-[240px] bg-white rounded-3xl shadow-xl border-4 border-[#3073c1] overflow-hidden"
          role="tablist"
          dir="rtl"
        >
          {[
            { id: "courses", label: "مدیریت دوره‌ها" },
            { id: "teachers", label: "مدیریت مدرس‌ها" },
            { id: "requests", label: "درخواست‌ها و پروفایل" },
            { id: "settings", label: "تنظیمات" },
            { id: "reports", label: "گزارش‌ها" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-5 px-8 text-right font-bold text-lg transition-all duration-400 border-b border-[#a6c3f4]
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#3073c1] via-[#3f7dd6] to-[#3073c1] text-white shadow-lg scale-105"
                    : "bg-white text-[#3073c1] hover:bg-[#c5d7f8] hover:text-[#1e5bbf]"
                }
                focus:outline-none rounded-tr-xl`}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* محتوای تب‌ها سمت چپ */}
        <main
          className="flex-1 bg-white rounded-3xl shadow-2xl p-10 min-h-[580px] border-4 border-[#3073c1]"
          role="tabpanel"
          aria-labelledby={activeTab}
          dir="rtl"
        >
          {activeTab === "courses" && (
            <>
              {sampleCourses.length === 0 ? (
                <p className="text-[#3073c1] text-center text-2xl mt-24 font-semibold select-none">
                  هیچ دوره‌ای ثبت نشده است.
                </p>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {sampleCourses.map((course) => (
                    <li
                      key={course.id}
                      className="flex flex-col justify-between bg-gradient-to-br from-[#e6f0ff] to-[#c3d7f9] border border-[#3073c1] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
                    >
                      <h4 className="text-3xl font-extrabold text-[#3073c1] mb-6 drop-shadow-md select-none">
                        {course.title}
                      </h4>

                      <div className={labelValueRow}>
                        <span className="text-[#3073c1] font-semibold w-32 text-right select-text">
                          مدرس:
                        </span>
                        <span className="text-[#1e5bbf] font-medium select-text">{course.teacher}</span>
                      </div>
                      <div className={labelValueRow}>
                        <span className="text-[#3073c1] font-semibold w-32 text-right select-text">
                          قیمت:
                        </span>
                        <span className="text-[#1e5bbf] font-medium select-text">
                          {course.price.toLocaleString()} تومان
                        </span>
                      </div>

                      <button
                        onClick={() => goToEditCourse(course.id)}
                        className="mt-8 self-start bg-gradient-to-r from-[#3073c1] via-[#3f7dd6] to-[#3073c1] text-white rounded-2xl px-8 py-4 font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-4"
                      >
                        <i className="fas fa-edit"></i> ویرایش دوره
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {activeTab === "teachers" && (
            <>
              {sampleTeachers.length === 0 ? (
                <p className="text-[#3073c1] text-center text-2xl mt-24 font-semibold select-none">
                  هیچ مدرس فعالی وجود ندارد.
                </p>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {sampleTeachers.map((teacher) => (
                    <li
                      key={teacher.id}
                      className="flex flex-col justify-between bg-gradient-to-tr from-[#c3d7f9] to-[#e6f0ff] border border-[#3073c1] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
                    >
                      <h4 className="text-3xl font-extrabold text-[#3073c1] mb-6 drop-shadow-sm select-none">
                        {teacher.name}
                      </h4>

                      <div className={labelValueRow}>
                        <span className="text-[#3073c1] font-semibold w-32 text-right select-text">رشته:</span>
                        <span className="text-[#1e5bbf] font-medium select-text">{teacher.study}</span>
                      </div>
                      <div className={labelValueRow}>
                        <span className="text-[#3073c1] font-semibold w-32 text-right select-text">ایمیل:</span>
                        <span className="text-[#1e5bbf] font-medium select-text">{teacher.email}</span>
                      </div>

                      <button
                        onClick={() => goToTeacherProfile(teacher.id)}
                        className="mt-8 self-start bg-gradient-to-r from-[#3073c1] via-[#3f7dd6] to-[#3073c1] text-white rounded-2xl px-8 py-4 font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-4"
                      >
                        <i className="fas fa-user"></i> نمایش پروفایل
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {activeTab === "requests" && (
            <div className="text-center text-[#3073c1] font-bold text-2xl mt-28 select-none">
              <p>بخش درخواست‌ها و مدیریت پروفایل‌ها اینجا نمایش داده می‌شود.</p>
              <p className="mt-4 text-[#4b7fc9] text-lg italic">
                به زودی امکانات بیشتر اضافه خواهد شد!
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="text-center text-[#3073c1] font-bold text-2xl mt-28 select-none">
              <p>بخش تنظیمات پنل ادمین اینجا قرار می‌گیرد.</p>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="text-center text-[#3073c1] font-bold text-2xl mt-28 select-none">
              <p>بخش گزارش‌ها و آمار به زودی اضافه خواهد شد.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
