import NavbarCourses from "../coursesPage/NavbarCourses";
import pattern from "../img/pattern.png"

import { teachers } from "./TeacherInfo";
import { useSearch } from "../coursesContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { textContext } from "../HomePage/BodySection/context";
import Footer from "../aboutUs/Footer";
import CardsTeachers from "./CardsTeachers";







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
                <div className="w-[85%] flex justify-center items-start">
                    <CardsTeachers
                        filteredTeachers={filteredTeacher}
                    />
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