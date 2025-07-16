import React from "react";
import { teachers } from "../../Pages/teachers/TeacherInfo";
import student from "../../Pages/img/userIMG.jpg"
import { useUser } from "../../Pages/coursesContext";
import { useNavigate } from "react-router-dom";

const TeacherHomePage = () => {
  const {user}=useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-[#3073c1] text-xl">
        در حال بارگذاری اطلاعات مدرس...
      </div>
    );
  }
  
  const teacher = user; // مدرس لاگین کرده
  const teacherCourses = teachers.find(t => t.id === teacher.id)?.courses || [];


  const handleNavigate=(e)=>{
    e.preventDefault();
    navigate("/TeacherEditProfile")
    
  }

  return (
    <div className="w-full min-h-screen p-6 bg-[#eef3f9] flex flex-col items-center justify-center gap-6" dir="rtl">
      
      {/* عنوان */}
      <h1 className="text-3xl  text-[#3073c1]">پنل مدرس</h1>

      {/* کارت اطلاعات مدرس */}
      <div className="w-full max-w-4xl bg-transparent p-6 rounded-2xl shadow-md border border-[#3073c1] flex flex-col md:flex-row gap-6">
        <img
          src={student || "/default-profile.png"}
          alt="teacher"
          className="w-32 h-32 rounded-full object-cover border-2 border-[#3073c1]"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-[#333]">{teacher.name}</h2>
          <p className="text-gray-600 mt-2">رشته : {teacher.study}</p>
          <p className="text-gray-600">دانشگاه : {teacher.university}</p>
          <p className="text-gray-600">ایمیل : {teacher.email}</p>
          {teacher.aboutTeacher && (
            <p className="text-gray-600 text-justify mt-2">درباره مدرس : {teacher.aboutTeacher}</p>
          )}
        </div>
      </div>

      {/* آمار و عملیات سریع */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="bg-[#eef3f9] p-4 border border-[#3073c1] rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold text-[#3073c1]">تعداد دوره‌ها</h3>
          <p className="text-3xl mt-2">{teacherCourses.length}</p>
        </div>

        <button className="bg-[#3073c1] text-[snow] text-[20px] cursor-pointer rounded-xl p-4 shadow-md hover:bg-[#2558a0] transition">
          درخواست افزودن دوره جدید
        </button>

        <button onClick={handleNavigate} className="bg-[#3073c1] text-[snow] text-[20px] cursor-pointer rounded-xl p-4 shadow-md hover:bg-[#2558a0] transition">
          ویرایش پروفایل
        </button>
      </div>

      {/* لیست دوره‌ها */}
      <div className="w-[70%] flex flex-col mt-6">
        <h3 className="text-2xl font-semibold text-[#333] mb-4">دوره‌های من</h3>
        {teacherCourses.length === 0 ? (
          <p className="text-gray-500">هنوز دوره‌ای اضافه نکرده‌اید.</p>
        ) : (
          <ul className="w-full flex flex-col gap-4">
            {teacherCourses.map((course, index) => (
              <li key={index} className="w-full flex justify-between items-center bg-[snow] border border-[#3073c1] p-4 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-[#3073c1]">{course.title}</h4>
                {/* <p className="text-gray-600 mt-1">تعداد دانشجو: {course.students.length}</p> */}
                <div className="flex justify-center items-center gap-2 border border-[#3073c1] rounded-[5px] cursor-pointer px-[8px] py-[3px] text-[#3073c1] bg-transparent">
                  <p>ویرایش</p>
                  <i class="fas fa-edit"></i>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherHomePage;
