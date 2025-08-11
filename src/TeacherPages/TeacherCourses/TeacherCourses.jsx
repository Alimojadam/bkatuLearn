import { useNavigate } from "react-router-dom";
import { useUser } from "../../Pages/coursesContext";
import { teachers } from "../../Pages/teachers/TeacherInfo";


const TeacherCourses=()=>{

    const { user } = useUser();

    const teacher = user;
    const teacherCourses = teachers.find((t) => t.id === teacher.id)?.courses || [];

    const navigate=useNavigate();
  const handleNavigate=(e,id)=>{
    e.preventDefault();
    navigate(`/CoursPage/${id}`)
  }

    return(
        <div className="w-full sm:w-5xl bg-[snow] rounded-3xl shadow-lg p-4 sm:p-6 mt-4">
            {teacherCourses.length === 0 ? (
              <p className="text-gray-500 text-center text-lg mt-10">هنوز دوره‌ای اضافه نکرده‌اید.</p>
            ) : (
              <ul className="w-full flex flex-col gap-4 justify-center items-start">
                {teacherCourses.map((course, index) => (
                  <li
                    key={index}
                    className="w-full flex justify-between items-center border border-[#2c5282] rounded-xl p-3 sm:p-5 shadow hover:shadow-lg transition-shadow bg-[#f9fafb]"
                  >
                    <h4 className="text-[15px] sm:text-xl font-semibold text-[#2c5282]">{course.title}</h4>
                    <button
                      className="text-[16px] flex items-center gap-2 border border-[#2c5282] rounded-[5px] px-[5px] sm:px-[8px] py-[3px] cursor-[pointer] text-[#2c5282] hover:text-[#1a365d] transition-colors font-medium"
                      title="ویرایش دوره"
                      onClick={(e) => handleNavigate(e, course.id)}
                    >
                      <i className="fas fa-edit"></i>
                      <p className="hidden sm:block">مشاهده و ویرایش</p>
                      <p className="sm:hidden">ویرایش</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
        </div>
    )
}

export default TeacherCourses;