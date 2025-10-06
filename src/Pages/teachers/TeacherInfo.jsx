// TeacherInfo.js
import student from "../../Pages/img/png.png";
import { cards } from "../coursPage/CardsInfo";
import { UserInformation } from "../../Information/User";
import axios from "axios";
import { useEffect } from "react";



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
