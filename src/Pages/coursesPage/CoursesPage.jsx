
import { useState } from 'react';
import '../coursesPage/CoursesPage.css';
import NavbarCourses from './NavbarCourses';
import Courses from '../img/Courses.jpg';
import { useSearch } from '../../Pages/coursesContext';
import { Link, useNavigate } from 'react-router-dom';
import { teachers } from '../teachers/TeacherInfo';


const CoursesPage=()=>{

    const [activeIndex, setActiveIndex] = useState(0);

    const filters = ["جدید ترین", "پر بازدید ترین", "ارزان ترین", "گران ترین"];

    const cards = [
        {
          id: 1,
          title: "آموزش جاوا اسکریپت",
          teacher: "علی رضایی",
          price: "490,000 تومان",
          image: Courses,
        },
        {
          id: 2,
          title: "آموزش ری‌اکت",
          teacher: "نگار محمدی",
          price: "690,000 تومان",
          image: Courses,
        },
        {
            id: 3,
            title: "آموزش ری‌اکت",
            teacher: "نگار محمدی",
            price: "690,000 تومان",
            image: Courses,
        },
        {
            id: 4,
            title: "آموزش ری‌اکت",
            teacher: "نگار محمدی",
            price: "690,000 تومان",
            image: Courses,
        },
      ];
      
      const { searchTerm } = useSearch("");
    
      const filteredCards = cards.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      );


    // const CoursPageNavigate = useNavigate();

    // const handleClickCoursPage=(e)=>{
    //     e.preventDefault();
    //     CoursPageNavigate('/CoursPage')
    // }
    return(
        <div className="w-[100%] bg-[#eef3f9]">

            
           <NavbarCourses/>


              {/* ************************************************ */}


              <div className="Courses px-[50px] pt-[115px] pb-[30px]">
              <ul className="filter flex flex-row-reverse items-start gap-[20px] border-b border-[#888] pb-[10px]">
                  {filters.map((label, index) => (
                  <li key={index}>
                      <a href="#" onClick={(e) => {e.preventDefault();setActiveIndex(index);}}
                          className={`text-[#222] font-[1] text-[18px] border-b-2 pb-[5px] transition-all duration-300 ${
                              activeIndex === index ? "border-[#3073c1]" : "border-transparent"
                          }`}
                >
                          {label}
                      </a>
                  </li>
                  ))}
              </ul>



            {/* *********Cards********* */}

            <div dir='rtl' className="w-[100%] grid grid-cols-3 justify-items-center gap-6">
                {filteredCards.map((card) => (
                <div key={card.id} className="flex flex-col gap-[5px] p-1 bg-[snow] rounded-[10px] mt-[30px] ">
                    <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-[8px]" />
                    <div className="px-[8px] flex flex-col gap-[5px] p-1">
                        <h3 className="text-[18px] text-[#222] font-bold mt-2 font-[1]">{card.title}</h3>
                        <p className="text-[15px] font-[1]">مدرس: {card.teacher}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-[#3073c1] font-semibold ">{card.price}</p>
                            <Link to={`/CoursPage/${card.id}`} className="bg-[#3073c1] text-[snow] py-[3px] px-[10px] rounded-[3px]">مشاهده</Link>
                        </div>
                    </div>
                </div>
                ))}
               </div>

            </div>
        </div>
        
    )
}
export default CoursesPage;