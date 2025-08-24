import { useState } from "react";





const VideosManagement=()=>{

    const [requestsData, setRequestsData] = useState([
        {name: "علی",title:"حلقه ها در جاوا اسکریپت"},
        {name: "ممد",title:"تعریف متغییر ها"},
        {name: "امیر",title:"آموزش متد ها"},
    ]);

      


    return(
        
        <div className="w-full min-h-screen flex justify-start sm:justify-center items-start mt-15 ml-5 sm:ml-0">
            <ul
            dir="rtl"
            className="w-[85%] sm:w-[80%] flex flex-col justify-center items-center gap-5"
            >
                {requestsData.map((item, index) => (
                    <li
                    key={index}
                    className={`flex justify-between items-center text-[16px] sm:text-[18px] border border-[#1E3A8A] rounded-[5px] py-2 px-3 w-full sm:w-[95%]
                    )}`}
                    >
                        <p className="text-[#1E3A8A]">ویدیوی <span className="text-green-700">{item.title}</span> از {item.name} آپلود شد</p>
                        <div className="flex gap-5 justify-center items-center">
                            <p className="text-[#1E3A8A] border border-[#1E3A8A] rounded-[5px] px-3 cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-xl">مشاهده</p>
                        </div>
                    </li>
                ))}
            </ul>
      </div>
    )
}


export default VideosManagement;