
import { useEffect, useState } from 'react';
import '../coursesPage/CoursesPage.css';
import NavbarCourses from './NavbarCourses';
import { useSearch, useUser } from '../../Pages/coursesContext';
import { Link, useNavigate } from 'react-router-dom';
import pattern from "../img/pattern.png"
import { cards } from '../coursPage/CardsInfo';
import { UserInformation } from '../../Information/User';
import Footer from '../aboutUs/Footer';


const CoursesPage=()=>{

    const [cardsinfo, setCardsinfo] = useState(cards);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedType, setSelectedType] = useState("All");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {user}=useUser();
    const isAdmin = user && user.type === "Admin";
    const [showModal, setShowModal] = useState(false);
    const [courseToDeleteId, setCourseToDeleteId] = useState(null);

    // const [courses, setCourses] = useState([]); // برای ذخیره دوره‌ها
    // const [users, setUsers] = useState([]); // برای ذخیره اطلاعات کاربران
    // const [loading, setLoading] = useState(true); // برای نمایش وضعیت بارگذاری
    // const [error, setError] = useState(null); // برای ذخیره خطاها

//     // درخواست برای دریافت داده‌ها
//   useEffect(() => {
//     // درخواست برای دریافت دوره‌ها
//     const fetchCourses = async () => {
//       try {
//         const courseResponse = await axios.get('https://your-api-url.com/api/courses');
//         setCourses(courseResponse.data); // ذخیره داده‌ها در وضعیت
//       } catch (error) {
//         setError('خطا در بارگذاری دوره‌ها');
//       }
//     };

//     // درخواست برای دریافت اطلاعات کاربران
//     const fetchUsers = async () => {
//       try {
//         const userResponse = await axios.get('https://your-api-url.com/api/users');
//         setUsers(userResponse.data); // ذخیره داده‌ها در وضعیت
//       } catch (error) {
//         setError('خطا در بارگذاری اطلاعات کاربران');
//       }
//     };

//     // اجرای درخواست‌ها
//     fetchCourses();
//     fetchUsers();
//     setLoading(false); // وضعیت بارگذاری را به false تغییر می‌دهیم
//   }, []); // با بارگذاری کامپوننت اینبار اجرا می‌شود

    const getTeacherName = (teacherId) => {
        const teacher = UserInformation.find(u => u.id === teacherId && u.type === "Teacher");
        return teacher ? teacher.name : "نامشخص";
    };

    const filters = ["جدید ترین", "پر بازدید ترین", "ارزان ترین", "گران ترین"];

 
      
      const { searchTerm } = useSearch("");
    
      
      const rows = Math.ceil((cardsinfo.length / 3)+1);
      
      
      const filterBar = [
        {id: 1, Major: "همه دوره ها", icon: "fa-solid fa-book mr-1", type: "All"},
        {id: 2, Major: "برنامه نویسی", icon: "fa-solid fa-laptop-code", type: "Programming"},
        {id: 3, Major: "مهندسی کامپیوتر", icon: "fa-solid fa-computer", type: "Computer"},
        {id: 4, Major: "مهندسی برق", icon: "fa-solid fa-charging-station", type: "Electric"},
        {id: 5, Major: "مهندسی عمران", icon: "fa-solid fa-tools", type: "Civil"},
        {id: 6, Major: "مهندسی مکانیک", icon: "fa-solid fa-gears", type: "Mechanical"},
      ];
      
        
        const filteredCards = cardsinfo.filter(card => {
            const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === "All" || card.type === selectedType;

            const teacher = UserInformation.find(u => u.id === card.teacherId);
            const isTeacher = teacher && teacher.type === "Teacher";

            return matchesSearch && matchesType && isTeacher;
        });
        const [isMenuOpen, setIsMenuOpen] = useState(false); 
        useEffect(() => {
            const handleResize = () => {
              setIsMobile(window.innerWidth < 768);
            };
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
          }, []);
        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };
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
    return(
        <div className="relative w-full pb-[40px] sm:pb-0 bg-[#eef3f9] min-h-screen">

            
           <NavbarCourses/>

           <div className="absolute top-18 left-0 w-full z-0 pointer-events-none">
                        {Array.from({ length: rows }).map((_, index) => (
                        <img
                        key={index}
                        src={pattern}
                        alt=""
                        className="absolute w-full opacity-9"
                        style={{ top: `${index * 250}px` }}
                        />
                        ))}
            </div>


              {/* ************************************************ */}


            <div className="Courses px-[30px] pt-[115px] pb-[30px] z-10">
              <ul className="filter flex flex-row-reverse items-start gap-[20px] border-b border-[#888] pb-[10px]">
                  {filters.map((label, index) => (
                  <li key={index}>
                      <a href="#" onClick={(e) => {e.preventDefault();setActiveIndex(index);}}
                          className={`text-[#222] font-[1] text-[15px] sm:text-[19px] border-b-2 pb-[5px] transition-all duration-300 ${
                              activeIndex === index ? "border-[#3073c1]" : "border-transparent"
                          }`}
                >
                          {label}
                      </a>
                  </li>
                  ))}
              </ul>
            </div>

            {/* ******************************************************* */}
            <div className="sm:relative flex flex-row-reverse sm:justify-center gap-6 items-start w-[100%] pl-[20px]">

                <div
                    className={`transition-all duration-700 ease-in-out
                        ${isMenuOpen ? "w-[75%] sm:w-[29%]" : "w-0 sm:w-[7%]"}
                        fixed sm:relative sm:mt-[20px] sm:mr-[30px]
                        top-[72px] sm:top-0 right-0
                        bg-[#3073c1] rounded-l-[10px] sm:rounded-[10px] h-screen`}
                    >
                    <div className="sm:absolute sm:top-3 sm:left-2 flex items-start justify-start">
                        {isMenuOpen ? (
                        <i
                            className="fa-solid fa-xmark absolute top-3 left-2 sm:static text-[24px] text-[snow] cursor-pointer"
                            onClick={toggleMenu}
                        ></i>
                        ) : (
                        <i
                            className="fa-solid fa-bars text-[22px] fixed right-3 top-[84px] sm:static text-[#3073c1] sm:text-[snow] cursor-pointer"
                            onClick={toggleMenu}
                        ></i>
                        )}
                    </div>

                    <ul className="flex flex-col gap-3 py-[20px] w-full max-h-[80vh] overflow-y-auto mt-[30px]">
                        {filterBar.map((Element) => (
                        <li
                            key={Element.id}
                            onClick={() => {
                            setSelectedType(Element.type);
                            if (isMobile) toggleMenu();
                            }}
                            className={`flex gap-10 items-center justify-end cursor-pointer rounded-r-[10px] h-[40px] w-[97%] px-[20px] mr-[2px] transition-all duration-500 ease-in-out
                            ${
                                selectedType === Element.type
                                ? "bg-[#eef3f9]"
                                : "bg-[#3073c1]"
                            }`}
                        >
                            {isMenuOpen && (
                            <p
                                className={`text-[19px] ${
                                selectedType === Element.type
                                    ? "text-[#3073c1]"
                                    : "text-[#eef3f9]"
                                }`}
                            >
                                {Element.Major}
                            </p>
                            )}
                            <i
                            className={`${Element.icon} text-[20px] ${
                                selectedType === Element.type
                                ? "text-[#3073c1]"
                                : "text-[#eef3f9]"
                            }`}
                            ></i>
                        </li>
                        ))}
                    </ul>
                </div>


                {/* *********Cards********* */}

                <div className={`w-full min-h-screen sm:transition-all sm:duration-700 ml-[1%] sm:ml-0 sm:ease-in-out grid grid-dir justify-center items-start grid-cols-1 ${isMenuOpen ? " sm:w-[70%] sm:grid-cols-2" : "sm:w-[100%] sm:grid-cols-3"} gap-6 `}>
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

            </div>

            <div className="w-full flex flex-col justify-center items-center mt-5">
                <div className="w-[90%] md:w-[80%] border-b-2 border-[#3073c1]"></div>
                <div className="w-full bg-transparent mb-0 pb-0">
                    <Footer/>
                </div>
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
        
    )
}
export default CoursesPage;