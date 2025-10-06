import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../coursesContext";
// import { cards } from "../coursPage/CardsInfo";






const MyCourses=()=>{

    // const {user} = useUser();
    

    const [savedCourseIds, setSavedCourseIds] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/user/course/saved`,
              { withCredentials: true } // اگر کوکی یا session استفاده می‌کنید
            );
            if (response.status === 200 && response.data) {
              setSavedCourseIds(
                response.data.map(course => ({
                  image: course.thumbnailURL,
                  id: course._id,
                  title: course.title,
                  teacher: course.publisher.name,
                }))
              );
            }
          } catch (err) {
            console.error("Error fetching course:", err);
          }
        };
      
        fetchCourses();
      }, []);
      

    
    return(
        <div className="flex justify-center sm:mr-[50px] items-center w-full sm:w-[90%] bg-transparent">
            <ul className="w-full justify-start items-start flex flex-col gap-5 pb-[15px]">
                {savedCourseIds.map((card)=>(
                    <li className="flex flex-row-reverse justify-end items-center w-full h-[140px] sm:h-[200px] border-2 border-[#3073c1] rounded-[10px]">
                        <div className="border-l-2 border-[#3073c1] h-full w-[42%] rounded-r-[10px]">
                            <img src={card.image} className="w-full h-full object-cover rounded-r-[8px]" alt="" />
                        </div>
                        <div className="h-full w-[58%] flex flex-col justify-start items-end">
                            <div className="flex flex-row-reverse w-full gap-2 sm:gap-3 justify-start h-[50%] items-center mr-[10px]">
                                <i className="fas fa-book text-[18px] sm:text-[20px] text-[#3073c1]"></i>
                                <p className="text-[16px] sm:text-[20px] text-[#3073c1]">{card.title}</p>
                            </div>
                            <div className="w-full border-b-2 border-[#3073c1]"></div>
                            <div className="flex flex-row-reverse w-full px-[10px] justify-between h-[49%] items-center">
                                <div className=" flex flex-row-reverse items-center justify-center gap-2 sm:gap-3">
                                    <i className="fas fa-user-tie text-[18px] sm:text-[20px] text-[#3073c1]"></i>
                                    <p className="text-[16px] sm:text-[20px] text-[#3073c1] text-center">{card.teacher}</p>
                                </div>
                                <Link to={`/CoursPage/${card.id}`} className="border rounded-[5px] sm:px-[6px] px-[4px] py-[2px] text-[17px] text-[#3073c1] text-center hover:shadow-md transition-all duration-400">مشاهده</Link>
                            </div>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    )
}
export default MyCourses;