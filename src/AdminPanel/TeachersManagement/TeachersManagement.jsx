import { Link } from "react-router-dom";
import { useSearch } from "../../Pages/coursesContext";
import { teachers } from "../../Pages/teachers/TeacherInfo"; 
import logo from '../../Pages/img/logo_header.png';
import CardsTeachers from "../../Pages/teachers/CardsTeachers";
import { useState } from "react";







const TeachersManagement=()=>{

    const { searchTerm, setSearchTerm } = useSearch();

    const [teachersList, setTeachersList] = useState(teachers); // همه کاربران و استادان


    const [showModal, setShowModal] = useState(false);
    const [teacherToConvert, setTeacherToConvert] = useState(null);
    

    // فیلتر کردن استادان با سرچ
    const filteredTeachers = teachersList
    .filter((teacher) => teacher.type === "Teacher")
    .filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // نمایش Modal تایید
    const handleShowModal = (teacher) => {
        setTeacherToConvert(teacher);
        setShowModal(true);
    };

    // تبدیل استاد به کاربر عادی
    const handleConvertToUser = () => {
        if (!teacherToConvert) return;
        const updatedTeachers = teachersList.map((t) =>
            t.id === teacherToConvert.id ? { ...t, type: "User" } : t
        );
        setTeachersList(updatedTeachers); // فقط state را آپدیت کنید، بدون filter
        setShowModal(false);
        setTeacherToConvert(null);
    };

    
    
    
    return(
        <div className="w-full relative min-h-screen sm:flex sm:justify-center sm:items-center ">
                {/* هدر */}
            <div className="fixed flex justify-center items-center top-0 w-full sm:w-[75%] h-[70px] bg-[snow] shadow-lg z-10">
                <ul className="w-[80%] sm:w-full flex flex-row-reverse justify-end sm:justify-center items-center sm:gap-10 sm:ml-2">
                    <li className="searchBar bg-[#ccc] sm:w-[450px] rounded-[30px] px-[8px] flex flex-row-reverse justify-end items-center">
                        <input
                            type="text"
                            placeholder="دنبال چی میگردی؟"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search"></i>
                    </li>
                    <li className='hidden sm:block'>
                        <div className="h-10 header-logo">
                            <div className="logo sm:min-w-[62px] sm:min-h-[39px]">
                                <img src={logo} alt="" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="w-[98%]">
                <CardsTeachers
                    filteredTeachers={filteredTeachers}
                    handleDeleteTeacher={handleShowModal}
                    showModal={showModal}
                    teacherToConvert={teacherToConvert}
                    setShowModal={setShowModal}
                    setTeacherToConvert={setTeacherToConvert}
                    handleConvertToUser={handleConvertToUser}
                />
            </div>

        </div>
    )
}

export default TeachersManagement;