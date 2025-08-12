import NavbarCourses from "../coursesPage/NavbarCourses";
import TeacherCard from "./teacherCard";
import pattern from "../img/pattern.png"

import { teachers } from "./TeacherInfo";
import { useSearch } from "../coursesContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { textContext } from "../HomePage/BodySection/context";
import Footer from "../aboutUs/Footer";







const Teachers=()=>{


    const rows = Math.ceil((teachers.length / 5)+1);


    const {bgColor}=useContext(textContext); 

    const { searchTerm } = useSearch();
    const filteredTeacher = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <div className="flex flex-col bg-[#eef3f9] pb-[20px] min-h-screen">
            <div className="">
                <NavbarCourses/>
            </div>

            {/* ************************************* */}

            <div className="flex flex-col justify-center items-center w-full">
                
                    <div className="absolute top-10 left-0 w-full z-0 pointer-events-none">
                        {Array.from({ length: rows }).map((_, index) => (
                        <img
                        key={index}
                        src={pattern}
                        alt=""
                        className="absolute w-full opacity-20"
                        style={{ top: `${index * 250}px` }}
                        />
                        ))}
                    </div>
                <div className="w-[85%] flex justify-center items-center pt-[120px]">
                    <ul dir="rtl" className="w-full grid grid-cols-1 justify-center items-center sm:grid-cols-3 gap-[50px]">
                        {filteredTeacher.map((teacher,index)=>(

                            <li key={index} className="flex w-[350px] h-[150px] bg-[#eef3f9] justify-between items-center relative border border-[#3073c1] rounded-r-[20px]">
                                <div className=" flex item-center justify-center items-center h-full border-l border-[#3073c1] w-[30%]">
                                    <div className="w-[90px] h-full">
                                        <img src={teacher.image} class="w-full h-full object-cover " alt=""/>   
                                    </div>
                                </div>
                                <div className="w-[70%] h-full flex flex-col justify-center items-between mb-[5px] gap-[5px]">
                                    <div className="w-full flex flex-col h-[65%] justify-center items-between gap-4 mr-2 ">
                                        <h4 className="text-[#3073c1] text-start text-[19px] mt-[5px] z-19">{teacher.name}</h4>
                                        <p className="text-start text-[#3073c1] text-[16px]">رشته تحصیلی : {teacher.study}</p>
                                    </div>
                                    <div className="w-full border-b border-[#3073c1]"></div>
                                    <div className="w-full h-[35%] flex justify-between items-center px-3 ">
                                        <pre dir='rtl' className="text-start text-[#3073c1] text-[15px] flex">{teacher.NomberOFactiveCourses} {teacher.activeCourses}</pre>
                                        <Link to={`/AboutTeacher/${teacher.id}`} className="text-[#3073c1] border border-[#3073c1] px-2 rounded-[5px] text-end text-[17px] pb-[2px] hover:scale-105 hover:shadow-md transition-all duration-300 transform">مشاهده</Link>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-8 sm:mt-auto">
                <div className="w-[90%] md:w-[80%] border-b-2 border-[#3073c1]"></div>
                <div className="w-full bg-transparent mb-0 pb-0">
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Teachers;