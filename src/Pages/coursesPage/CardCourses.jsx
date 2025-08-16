import { Link } from "react-router-dom";




const CardCourses=(props)=>{

    const {
        isMenuOpen,
        filteredCards,
        getTeacherName,
        isAdmin,
        confirmDeleteCourse,
        showModal,
        selectedCourse,
        setShowModal,
        setCourseToDeleteId,
        handleDeleteCourse,
    } = props


    return(
        <div className={`w-full min-h-screen sm:transition-all sm:duration-700 sm:ease-in-out grid grid-dir justify-center items-start grid-cols-1 
                        ${isAdmin ? "mx-5 sm:mx-0" : "mx-0"}
                        ${isAdmin || isMenuOpen ? "sm:grid-cols-2" : "sm:grid-cols-3"}
                        ${isMenuOpen ? "sm:w-[95%]" : "sm:w-[100%]"} gap-6 `}>
                    {filteredCards.length === 0 ? (
                        <p className="text-center text-[#3073c1] text-[25px] w-[350px] mt-[20px]">هیچ دوره‌ای یافت نشد</p>
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
    )
}

export default CardCourses;