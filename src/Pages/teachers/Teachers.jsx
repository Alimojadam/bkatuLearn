import NavbarCourses from "../coursesPage/NavbarCourses";
import TeacherCard from "./teacherCard";
import pattern from "../img/pattern.png"

import { teachers } from "./TeacherInfo";
import { useSearch } from "../coursesContext";







const Teachers=()=>{


    const rows = Math.ceil((teachers.length / 5)+1);


    const { searchTerm } = useSearch();
    const filteredTeacher = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <div className="bg-[#eef3f9] pb-[20px] min-h-screen">
            <div className="">
                <NavbarCourses/>
            </div>

            {/* ************************************* */}

            <div className="relative flex flex-col justify-center items-center w-full">
                
                    <div className="absolute top-10 left-0 w-full z-0 pointer-events-none">
                        {Array.from({ length: rows }).map((_, index) => (
                        <img
                        key={index}
                        src={pattern}
                        alt=""
                        className="absolute w-full opacity-20"
                        style={{ top: `${index * 250}px` }} // فاصله بین ردیف‌ها، قابل تنظیم
                        />
                        ))}
                    </div>
                <div className="w-[80%] flex justify-center items-center pt-[120px]">
                    <ul dir="rtl" className="w-full grid grid-cols-2 sm:grid-cols-5 gap-[50px]">
                        <TeacherCard teachers={filteredTeacher}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Teachers;