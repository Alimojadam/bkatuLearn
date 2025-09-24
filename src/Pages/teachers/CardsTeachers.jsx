import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../coursesContext";
import { teachers } from "./TeacherInfo";




const CardsTeachers=(props)=>{

    const {user}=useUser()

    const isAdmin = user && user.type === "Admin";

    
        

    
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/all-teachers`
        );
        if (response.status === 200 || response.status === 201) {
          setTeachers(
            response.data.teachers.map((t) => ({
              image: t.profilePic,
              NomberOFactiveCourses: t.coursesCount,
              name: t.name,
              study: t.study,
              id: t._id,
              activeCourses: t.activeCourses || "", // اگر بک‌اند داره
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

    const {
        filteredTeachers,
        handleDeleteTeacher,
        showModal,
        teacherToConvert,
        setShowModal,
        setTeacherToConvert,
        handleConvertToUser,
    }=props

    return(
        <div className="w-full flex justify-center items-center sm:transition-all sm:duration-700 sm:ease-in-out">
            <ul dir="rtl" className={`w-full grid grid-cols-1 justify-center items-center gap-10 sm:gap-[50px]
                ${isAdmin ? "sm:grid-cols-2 pt-[120px] sm:pt-0 mr-5" : "sm:grid-cols-3 pt-[120px]"}
            `}>
                {teachers.map((teacher,index)=>(

                <li key={index} className="flex w-[350px] h-[150px] bg-[#eef3f9] justify-between items-center relative border border-[#3073c1] rounded-r-[20px]">
                    <div className=" flex item-center justify-center items-center h-full border-l border-[#3073c1] w-[30%]">
                        <div className="w-[90px] h-full">
                            <img src={teacher.image} class="w-full h-full object-cover " alt=""/>   
                        </div>
                    </div>
                    <div className="w-[70%] h-full flex flex-col justify-center items-between mb-[5px] gap-[5px]">
                        <div className="w-full flex flex-col h-[65%] justify-center items-between gap-4 px-2 ">
                            <div className="w-full flex justify-between items-center">
                                <h4 className="w-[80%] text-[#3073c1] text-start text-[19px] mt-[5px]">{teacher.name}</h4>
                                {isAdmin &&(
                                    <div className="w-[20%] flex flex-row-reverse gap-4">
                                        <i title="حذف مدرس" onClick={()=>{handleDeleteTeacher(teacher)}} className="fas fa-trash cursor-pointer text-[18px] text-red-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"></i>
                                        <i title="ارتباط با مدرس" className="fas fa-comment cursor-pointer text-[18px] text-[#3073c1] transition-all duration-300 hover:scale-110 hover:shadow-xl"></i>
                                    </div>
                                )}
                            </div>
                            <p className="text-start text-[#3073c1] text-[16px]">رشته تحصیلی : {teacher.study}</p>
                        </div>
                        <div className="w-full border-b border-[#3073c1]"></div>
                        <div className="w-full h-[35%] flex justify-between items-center px-3 ">
                            <pre dir='rtl' className="text-start text-[#3073c1] text-[15px] flex">دوره فعال : {teacher.NomberOFactiveCourses} </pre>
                            <Link to={`/AboutTeacher/${teacher.id}`} className="text-[#3073c1] border border-[#3073c1] px-2 rounded-[5px] text-end text-[17px] pb-[2px] hover:scale-105 hover:shadow-md transition-all duration-300 transform">مشاهده</Link>
                        </div>
                    </div>
                </li>

                ))}
            </ul>

            
            {/* Modal */}
            {showModal && teacherToConvert && (
               <div
               className={`fixed inset-0 flex justify-center items-center z-50 
                           bg-black/40 backdrop-blur-sm transition-opacity duration-300
                           ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
             >
               <div
                 dir='rtl'
                 className={`bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md
                             transform transition-all duration-300
                             ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
               >
                        <h2 className="text-lg font-bold mb-4">آیا مطمئن هستید؟</h2>
                        <p className="mb-4">
                            با حذف این استاد {teacherToConvert.name} به کاربر عادی تبدیل خواهد شد.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => { setShowModal(false); setTeacherToConvert(null); }}
                                className="px-4 py-2 bg-gray-300 rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
                            >
                                لغو
                            </button>
                            <button
                                onClick={handleConvertToUser(teacherToConvert.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
                            >
                                تایید
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardsTeachers;