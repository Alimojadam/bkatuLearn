import { Link } from "react-router-dom";
import { useSearch } from "../../Pages/coursesContext";
import { teachers } from "../../Pages/teachers/TeacherInfo"; 
import logo from '../../Pages/img/logo_header.png';
import CardsTeachers from "../../Pages/teachers/CardsTeachers";
import { useState } from "react";
import axios from "axios";







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

    const handleShowModal = (teacher) => {
        setTeacherToConvert(teacher); // ذخیره استاد در state
        setShowModal(true);
      };

    // تبدیل استاد به کاربر عادی
    const handleConvertToUser = async () => {
        if (!teacherToConvert) return;
    
        const teacherId = teacherToConvert.id || teacherToConvert._id;
    
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/demote-teacher/${teacherId}`,
                {},
                { withCredentials: true }
            );
    
            if (response.status === 200 || response.status === 201) {
                alert("استاد به کاربر عادی تبدیل شد");
    
                // آپدیت state محلی
                const updatedTeachers = teachersList.map((t) =>
                    (t.id || t._id) === teacherId ? { ...t, type: "User" } : t
                );
                setTeachersList(updatedTeachers);
            }
        } catch (err) {
            console.error(err.response || err);
        } finally {
            setShowModal(false);
            setTeacherToConvert(null);
        }
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