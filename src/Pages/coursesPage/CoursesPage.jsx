
import { useState } from 'react';
import '../coursesPage/CoursesPage.css';
import NavbarCourses from './NavbarCourses';
import { useSearch } from '../../Pages/coursesContext';
import { Link, useNavigate } from 'react-router-dom';
import pattern from "../img/pattern.png"
import { cards } from '../coursPage/CardsInfo';
import { UserInformation } from '../../Information/User';


const CoursesPage=()=>{

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedType, setSelectedType] = useState("All");

    const getTeacherName = (teacherId) => {
        const teacher = UserInformation.find(u => u.id === teacherId && u.type === "Teacher");
        return teacher ? teacher.name : "نامشخص";
    };

    const filters = ["جدید ترین", "پر بازدید ترین", "ارزان ترین", "گران ترین"];

 
      
      const { searchTerm } = useSearch("");
    
      
      const rows = Math.ceil((cards.length / 3)+1);
      
      
      const filterBar = [
        {id: 1, Major: "همه دوره ها", icon: "fa-solid fa-book mr-1", type: "All"},
        {id: 2, Major: "برنامه نویسی", icon: "fa-solid fa-laptop-code", type: "Programming"},
        {id: 3, Major: "مهندسی کامپیوتر", icon: "fa-solid fa-computer", type: "Computer"},
        {id: 4, Major: "مهندسی برق", icon: "fa-solid fa-charging-station", type: "Electric"},
        {id: 5, Major: "مهندسی عمران", icon: "fa-solid fa-tools", type: "Civil"},
        {id: 6, Major: "مهندسی مکانیک", icon: "fa-solid fa-gears", type: "Mechanical"},
      ];
      
        
        const filteredCards = cards.filter(card => {
            const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === "All" || card.type === selectedType;

            const teacher = UserInformation.find(u => u.id === card.teacherId);
            const isTeacher = teacher && teacher.type === "Teacher";

            return matchesSearch && matchesType && isTeacher;
        });
        const [isMenuOpen, setIsMenuOpen] = useState(false); 
        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };
    return(
        <div className="w-[100%] bg-[#eef3f9]">

            
           <NavbarCourses/>

           <div className="absolute top-18 left-0 w-full z-0 pointer-events-none">
                        {Array.from({ length: rows }).map((_, index) => (
                        <img
                        key={index}
                        src={pattern}
                        alt=""
                        className="absolute w-full opacity-9"
                        style={{ top: `${index * 250}px` }} // فاصله بین ردیف‌ها، قابل تنظیم
                        />
                        ))}
            </div>


              {/* ************************************************ */}


            <div className="Courses px-[50px] pt-[115px] pb-[30px] z-10">
              <ul className="filter flex flex-row-reverse items-start gap-[20px] border-b border-[#888] pb-[10px]">
                  {filters.map((label, index) => (
                  <li key={index}>
                      <a href="#" onClick={(e) => {e.preventDefault();setActiveIndex(index);}}
                          className={`text-[#222] font-[1] text-[19px] border-b-2 pb-[5px] transition-all duration-300 ${
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
            <div className="flex flex-row-reverse justify-between items-start w-[100%] px-[20px]">

                <div className={`transition-all duration-700 ease-in-out relative mt-[20px] bg-[#3073c1] mr-[30px] rounded-[10px] h-[100vh] ${isMenuOpen ? "w-[35%]" : "w-[7%]"}`}>
                    <div className="absolute top-4 left-2 flex items-center justify-center">
                        {isMenuOpen ?(
                            <i className="fa-solid fa-xmark text-[24px] text-[snow] cursor-pointer" onClick={toggleMenu}></i>
                            
                        ) :(
                            <i className="fa-solid fa-bars text-[22px] text-[snow] cursor-pointer" onClick={toggleMenu}></i>

                        )}
                    </div>
                    
                        <ul className="flex flex-col gap-3 py-[20px] w-full max-h-[80vh] overflow-y-auto mt-[30px]">
                            {filterBar.map((Element)=>(
                                <li key={Element.id} onClick={() => setSelectedType(Element.type)} className={`flex gap-10 items-center justify-end cursor-pointer rounded-r-[10px] h-[40px] w-[97%] px-[20px] mr-[2px] transition-all duration-500 ease-in-out ${selectedType === Element.type ? "bg-[#eef3f9]" : "bg-[#3073c1]"}`}>
                                {isMenuOpen &&(
                                    <p className={`text-[#3073c1] text-[19px] ${selectedType === Element.type ? "text-[#3073c1]" : "text-[#eef3f9]"}`}>{Element.Major}</p>
                                    )}
                                    <i className={`${Element.icon} text-[20px] ${selectedType === Element.type ? "text-[#3073c1]" : "text-[#eef3f9]"}`}></i>                            
                                </li>
                            ))}
                        </ul>

                </div>

                {/* *********Cards********* */}

                <div dir='rtl' className={`transition-all duration-700 ease-in-out grid ${isMenuOpen ? "w-[60%] grid-cols-2" : "w-[87%] grid-cols-3"} justify-center items-center gap-6 `}>
                    {filteredCards.length === 0 ? (
                        <p className="text-end text-[#3073c1] text-[25px] w-full mt-[20px]">هیچ دوره‌ای یافت نشد.</p>
                    ) : (
                        filteredCards.map((card) => (
                        <div key={card.id} className="flex flex-col gap-[5px] p-1 bg-[snow] rounded-[10px] mt-[20px] ">
                            <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-[8px]" />
                            <div className="px-[8px] flex flex-col gap-[5px] p-1">
                                <h3 className="text-[18px] text-[#222] font-bold mt-2 font-[1]">{card.title}</h3>
                                <p className="text-[15px] font-[1]">مدرس: {getTeacherName(card.teacherId)}</p>
                                <div className="flex justify-between items-center">
                                <p className="text-[#3073c1] font-semibold ">{card.price}</p>
                                <Link to={`/CoursPage/${card.id}`} className="bg-[#3073c1] text-[snow] py-[3px] px-[10px] rounded-[3px]">مشاهده</Link>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
               </div>

            </div>
        </div>
        
    )
}
export default CoursesPage;