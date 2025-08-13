// TeacherInfo.js
import student from "../../Pages/img/png.png";
import { cards } from "../coursPage/CardsInfo";
import { UserInformation } from "../../Information/User";
import axios from "axios";
import { useEffect } from "react";


  //   const [courses, setCourses] = useState([]); // برای ذخیره دوره‌ها
  //   const [users, setUsers] = useState([]); // برای ذخیره اطلاعات کاربران
  //   const [loading, setLoading] = useState(true); // برای نمایش وضعیت بارگذاری
  //   const [error, setError] = useState(null); // برای ذخیره خطاها

  //   // درخواست برای دریافت داده‌ها
  // useEffect(() => {
  //   // درخواست برای دریافت دوره‌ها
  //   const fetchCourses = async () => {
  //     try {
  //       const courseResponse = await axios.get('https://your-api-url.com/api/courses');
  //       setCourses(courseResponse.data); // ذخیره داده‌ها در وضعیت
  //     } catch (error) {
  //       setError('خطا در بارگذاری دوره‌ها');
  //     }
  //   };

  //   // درخواست برای دریافت اطلاعات کاربران
  //   const fetchUsers = async () => {
  //     try {
  //       const userResponse = await axios.get('https://your-api-url.com/api/users');
  //       setUsers(userResponse.data); // ذخیره داده‌ها در وضعیت
  //     } catch (error) {
  //       setError('خطا در بارگذاری اطلاعات کاربران');
  //     }
  //   };

  //   // اجرای درخواست‌ها
  //   fetchCourses();
  //   fetchUsers();
  //   setLoading(false); // وضعیت بارگذاری را به false تغییر می‌دهیم
  // }, []); // با بارگذاری کامپوننت اینبار اجرا می‌شود

export const teachers = UserInformation
  .filter(user => user.type === "Teacher")
  .map(teacher => {
    const teacherCourses = cards.filter(card => card.teacherId === teacher.id);
    return {
      ...teacher,
      image: student,
      activeCourses: "دوره فعال",
      aboutTeacher: "",
      NomberOFactiveCourses: teacherCourses.length.toString(),
      courses: teacherCourses,
    };
  });

// ذخیره در localStorage
localStorage.setItem("teachersData", JSON.stringify(teachers));

// صادر کردن برای استفاده در بقیه جاها
export const storedTeachers = teachers;
