import React, { useState } from "react";
import { teachers } from "../../Pages/teachers/TeacherInfo";
import student from "../../Pages/img/userIMG.jpg";
import { useUser } from "../../Pages/coursesContext";
import RequestsComponent from "../myRequestsComponent/RequestsComponent";
import EditProfile from "../EditProfile/EditProfile";
import RequestToAddCourse from "../Request to Add a New Course/RequestToAddCourse";
import { useNavigate } from "react-router-dom";

const TeacherHomePage = () => {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState("dashboard");

  const navigate=useNavigate();
  const handleNavigate=(e,id)=>{
    e.preventDefault();
    navigate(`/CoursPage/${id}`)
  }
  if (!user) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-[#3073c1] text-xl">
        در حال بارگذاری اطلاعات مدرس...
      </div>
    );
  }
 
  const teacher = user;
  const teacherCourses = teachers.find((t) => t.id === teacher.id)?.courses || [];

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-b bg-[#eef3f9] flex flex-col items-center gap-6" dir="rtl">
      <h1 className="text-4xl font-extrabold text-[#2c5282] mb-4">پنل مدرس</h1>

      {/* کارت اطلاعات مدرس */}
      <div className="w-5xl bg-[snow] p-6 rounded-3xl shadow-lg border border-[#2c5282] flex flex-col md:flex-row gap-6 items-start justify-center">
        <img
          src={student || "/default-profile.png"}
          alt="teacher"
          className="w-36 h-36 rounded-full object-cover border-4 border-[#2c5282]"
        />

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-semibold text-[#2c5282]">{teacher.name}</h2>
          <p className="text-gray-700 mt-1">رشته : <span className="font-medium">{teacher.study}</span></p>
          <p className="text-gray-700">دانشگاه : <span className="font-medium">{teacher.university}</span></p>
          <p className="text-gray-700">ایمیل : <span className="font-medium">{teacher.email}</span></p>
          {teacher.aboutTeacher && (
            <p className="text-gray-600 text-justify mt-3 bg-[#f7fafc] p-3 rounded-lg shadow-inner">
              درباره مدرس : {teacher.aboutTeacher}
            </p>
          )}
        </div>
      </div>

      {/* تب‌ها */}
      <div className="w-5xl bg-white rounded-3xl shadow-md flex overflow-hidden border border-[#2c5282]">
        {[
          { id: "dashboard", label: "دوره‌های من" },
          { id: "addCourse", label: "درخواست افزودن دوره جدید" },
          { id: "editProfile", label: "ویرایش پروفایل" },
          { id: "requests", label: "درخواست‌های من" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex-1 py-4 cursor-pointer text-center font-semibold transition-colors duration-300 ${
              activeSection === tab.id
                ? "bg-[#2c5282] text-white shadow-inner"
                : "bg-transparent text-[#2c5282] hover:bg-[#cbd5e0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای بخش‌ها */}
      <div className="w-5xl bg-[snow] rounded-3xl shadow-lg p-6 mt-4">
        {activeSection === "dashboard" && (
          <>
            {teacherCourses.length === 0 ? (
              <p className="text-gray-500 text-center text-lg mt-10">هنوز دوره‌ای اضافه نکرده‌اید.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {teacherCourses.map((course, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border border-[#2c5282] rounded-xl p-5 shadow hover:shadow-lg transition-shadow bg-[#f9fafb]"
                  >
                    <h4 className="text-xl font-semibold text-[#2c5282]">{course.title}</h4>
                    <button
                      className="flex items-center gap-2 border border-[#2c5282] rounded-[5px] px-[8px] py-[3px] cursor-[pointer] text-[#2c5282] hover:text-[#1a365d] transition-colors font-medium"
                      title="ویرایش دوره"
                      onClick={(e) => handleNavigate(e, course.id)}
                    >
                      <i className="fas fa-edit"></i>
                      <p className="">مشاهده و ویرایش</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeSection === "requests" && <RequestsComponent />}
        {activeSection === "addCourse" && <RequestToAddCourse />}
        {activeSection === "editProfile" && <EditProfile />}
      </div>
    </div>
  );
};

export default TeacherHomePage;
