import { useState } from 'react';
import '../../Pages/coursesPage/CoursesPage.css';
import { useSearch, useUser } from '../../Pages/coursesContext';
import { Link } from 'react-router-dom';
import { cards } from '../../Pages/coursPage/CardsInfo';
import { UserInformation } from '../../Information/User';
import logo from '../../Pages/img/logo_header.png';

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
        <div className="w-full relative min-h-screen">
            {/* هدر */}
            <div className="fixed flex justify-center items-center top-0 w-full sm:w-[75%] h-[70px] bg-[snow] shadow-lg z-10">
                <ul className="w-[80%] sm:w-full flex flex-row-reverse justify-end items-center sm:gap-8 sm:ml-2">
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
            <div className="sm:transition-all sm:duration-700 ml-[1%] sm:ml-0 sm:ease-in-out grid grid-dir justify-start items-start grid-cols-1 md:grid-cols-2 pt-[80px]">
                {filteredCards.length === 0 ? (
                    <p className="text-center text-[#3073c1] text-[25px] w-full mt-[20px]">هیچ دوره‌ای یافت نشد</p>
                ) : (
                    filteredCards.map((card) => (
                        <div dir='rtl' key={card.id} className="w-[350px] flex flex-col gap-[5px] p-1 bg-[snow] rounded-[10px] mt-[20px]">
                            <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-[8px]" />
                            <div className="px-[8px] flex flex-col gap-[5px] p-1">
                                <h3 className="text-[18px] text-[#222] font-bold mt-2 font-[1]">{card.title}</h3>
                                <p className="text-[15px] font-[1]">مدرس: {getTeacherName(card.teacherId)}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-[#3073c1] font-semibold ">{card.price}</p>
                                    <div className="flex justify-center items-center gap-5">
                                        {isAdmin && (
                                            <i
                                                onClick={() => confirmDeleteCourse(card)}
                                                title='حذف دوره'
                                                className='fas fa-trash text-red-500 text-[18px] cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl'
                                            ></i>
                                        )}
                                        <Link to={`/CoursPage/${card.id}`} className="bg-[#3073c1] text-[snow] py-[3px] px-[10px] rounded-[3px]">مشاهده</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* مدال حذف */}
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
                    {selectedCourse && (
                        <p className="mb-4">
                            دوره {selectedCourse.title} از {getTeacherName(selectedCourse.teacherId)} به طور دائمی حذف خواهد شد.
                        </p>
                    )}
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => { setShowModal(false); setCourseToDeleteId(null); }}
                            className="px-4 py-2 bg-gray-300 rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        >
                            لغو
                        </button>
                        <button
                            onClick={handleDeleteCourse}
                            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        >
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesManagement;
