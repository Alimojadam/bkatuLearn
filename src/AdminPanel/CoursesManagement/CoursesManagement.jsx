import { useState } from 'react';
import '../../Pages/coursesPage/CoursesPage.css';
import { useSearch, useUser } from '../../Pages/coursesContext';
import { Link } from 'react-router-dom';
import { cards } from '../../Pages/coursPage/CardsInfo';
import { UserInformation } from '../../Information/User';
import logo from '../../Pages/img/logo_header.png';
import CardCourses from '../../Pages/coursesPage/CardCourses';

const CoursesManagement = () => {
    const [cardsinfo, setCardsinfo] = useState(cards);
    const [selectedType, setSelectedType] = useState("All");
    const { user } = useUser();
    const isAdmin = user && user.type === "Admin";
    const [showModal, setShowModal] = useState(false);
    const [courseToDeleteId, setCourseToDeleteId] = useState(null);

    const { searchTerm, setSearchTerm } = useSearch();

    const getTeacherName = (teacherId) => {
        const teacher = UserInformation.find(u => u.id === teacherId && u.type === "Teacher");
        return teacher ? teacher.name : "نامشخص";
    };

    const filteredCards = cardsinfo.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "All" || card.type === selectedType;
        const teacher = UserInformation.find(u => u.id === card.teacherId);
        const isTeacher = teacher && teacher.type === "Teacher";
        return matchesSearch && matchesType && isTeacher;
    });

    const handleDeleteCourse = () => {
        if (courseToDeleteId != null) {
            setCardsinfo(prev => prev.filter(c => c.id !== courseToDeleteId));
            setCourseToDeleteId(null);
            setShowModal(false);
        }
    };

    const confirmDeleteCourse = (card) => {
        setCourseToDeleteId(card.id);
        setShowModal(true);
    };

    const selectedCourse = cardsinfo.find(c => c.id === courseToDeleteId);

    return (
        <div className="w-full relative min-h-screen sm:flex sm:justify-center sm:items-center">
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

            {/* کارت ها */}
            <div className="w-full mt-20">
                <CardCourses
                    filteredCards={filteredCards}
                    getTeacherName={getTeacherName}
                    isAdmin={isAdmin}
                    confirmDeleteCourse={confirmDeleteCourse}
                    showModal={showModal}
                    selectedCourse={selectedCourse}
                    setShowModal={setShowModal}
                    setCourseToDeleteId={setCourseToDeleteId}
                    handleDeleteCourse={handleDeleteCourse}
                />
            </div>
        </div>
    );
};

export default CoursesManagement;
