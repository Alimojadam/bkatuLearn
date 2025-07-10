import { Link } from "react-router-dom";
import { cards } from "../coursPage/CardsInfo";






const MyCourses=()=>{

    return(
        <div className="flex justify-center mr-[50px] items-center w-[90%] bg-transparent">
            <ul className="w-full flex flex-col gap-5 pb-[15px]">
                {cards.map((card)=>(
                    <li className="flex flex-row-reverse justify-end items-center w-full h-[200px] border-2 border-[#3073c1] rounded-[10px]">
                        <div className="border-l-2 border-[#3073c1] h-full w-[42%] rounded-r-[10px]">
                            <img src={card.image} className="w-full h-full object-cover rounded-r-[8px]" alt="" />
                        </div>
                        <div className="h-full w-[58%] flex flex-col justify-start items-end">
                            <div className="flex flex-row-reverse w-full gap-3 justify-start h-[50%] items-center mr-[10px]">
                                <i className="fas fa-book text-[20px] text-[#3073c1]"></i>
                                <p className="text-[20px] text-[#3073c1]">{card.title}</p>
                            </div>
                            <div className="w-full border-b-2 border-[#3073c1]"></div>
                            <div className="flex flex-row-reverse w-full px-[10px] justify-between h-[49%] items-center">
                                <div className=" flex flex-row-reverse items-center justify-center gap-3">
                                    <i className="fas fa-user-tie text-[20px] text-[#3073c1]"></i>
                                    <p className="text-[20px] text-[#3073c1] text-center">{card.teacher}</p>
                                </div>
                                <Link to={`/CoursPage/${card.id}`} className="border rounded-[5px] px-[6px] py-[2px] text-[17px] text-[#3073c1] text-center hover:shadow-md transition-all duration-400">مشاهده</Link>
                            </div>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    )
}
export default MyCourses;